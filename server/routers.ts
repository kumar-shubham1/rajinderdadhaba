import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import * as db from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  menu: router({
    getByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(async ({ input }) => {
        return await db.getMenuItemsByCategory(input.category);
      }),
    getAll: publicProcedure.query(async () => {
      return await db.getAllMenuItems();
    }),
    getSignatureDishes: publicProcedure.query(async () => {
      return await db.getSignatureDishes();
    }),
  }),

  catering: router({
    submitBooking: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(10),
        eventDate: z.date(),
        eventType: z.string().min(1),
        guestCount: z.number().min(1),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const booking = await db.createCateringBooking({
          name: input.name,
          email: input.email,
          phone: input.phone,
          eventDate: input.eventDate,
          eventType: input.eventType,
          guestCount: input.guestCount,
          message: input.message,
        });
        
        // Send notification to owner
        await notifyOwner({
          title: "New Catering Booking Request",
          content: `${input.name} requested catering for ${input.eventType} on ${input.eventDate.toLocaleDateString()} for ${input.guestCount} guests. Email: ${input.email}, Phone: ${input.phone}`,
        });
        
        return booking;
      }),
  }),

  reviews: router({
    getApproved: publicProcedure.query(async () => {
      return await db.getApprovedReviews();
    }),
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        rating: z.number().min(1).max(5),
        comment: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        return await db.createReview({
          name: input.name,
          rating: input.rating,
          comment: input.comment,
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
