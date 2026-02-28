import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("catering.submitBooking", () => {
  it("should accept valid booking data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+919876543210",
      eventDate: new Date("2024-12-25"),
      eventType: "House Party",
      guestCount: 50,
      message: "Looking forward to the event!",
    };

    // This should not throw
    const result = await caller.catering.submitBooking(bookingData);
    expect(result).toBeDefined();
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      name: "John Doe",
      email: "invalid-email",
      phone: "+919876543210",
      eventDate: new Date("2024-12-25"),
      eventType: "House Party",
      guestCount: 50,
    };

    try {
      await caller.catering.submitBooking(bookingData as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject invalid guest count", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+919876543210",
      eventDate: new Date("2024-12-25"),
      eventType: "House Party",
      guestCount: 0,
    };

    try {
      await caller.catering.submitBooking(bookingData as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject short phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123",
      eventDate: new Date("2024-12-25"),
      eventType: "House Party",
      guestCount: 50,
    };

    try {
      await caller.catering.submitBooking(bookingData as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});

describe("reviews.submit", () => {
  it("should accept valid review data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const reviewData = {
      name: "Jane Smith",
      rating: 5,
      comment: "Amazing food and excellent service! Highly recommended.",
    };

    const result = await caller.reviews.submit(reviewData);
    expect(result).toBeDefined();
  });

  it("should reject rating outside 1-5 range", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const reviewData = {
      name: "Jane Smith",
      rating: 10,
      comment: "Amazing food and excellent service!",
    };

    try {
      await caller.reviews.submit(reviewData as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });

  it("should reject short comment", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const reviewData = {
      name: "Jane Smith",
      rating: 5,
      comment: "Good",
    };

    try {
      await caller.reviews.submit(reviewData as any);
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.code).toBe("BAD_REQUEST");
    }
  });
});

describe("menu.getByCategory", () => {
  it("should accept valid category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.menu.getByCategory({ category: "Starters" });
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return empty array for non-existent category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.menu.getByCategory({ category: "NonExistent" });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
