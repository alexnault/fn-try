/* eslint-disable @typescript-eslint/no-empty-function */
import { describe, it, expect, expectTypeOf } from "vitest";

import { tryFn } from "../src";
import {
  willThrowAsync,
  willThrow,
  sleep,
  willPassAsync,
  willPass,
} from "./utils";

describe("tryFn", () => {
  describe("try catch", () => {
    it("should have proper return types", () => {
      const result = tryFn(
        () => willPass("success"),
        () => "failed"
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should have both return types", () => {
      const result = tryFn(
        () => willPass("success"),
        () => 1
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string | number>();
    });

    it("should have both return types", () => {
      const result = tryFn(
        () => {},
        () => {}
      );
      expect(result).toBe(undefined);
      expectTypeOf(result).toEqualTypeOf<void>();
    });

    it("should return the function value on success", () => {
      const result = tryFn(
        () => willPass("success"),
        (error) => {
          throw error;
        }
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should return the catch value on error", () => {
      const result = tryFn(
        () => willThrow("success"),
        () => "fail"
      );
      expect(result).toBe("fail");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should return the undefined catch value on error", () => {
      const result = tryFn(
        () => willThrow("success"),
        () => {}
      );
      expect(result).toBe(undefined);
      expectTypeOf(result).toEqualTypeOf<string | void>();
    });

    it("should throw an error on error", () => {
      const wrapper = () =>
        tryFn(
          () => willThrow("success"),
          (error) => {
            throw error;
          }
        );
      expect(wrapper).toThrowError("The function failed.");
      expectTypeOf(wrapper).toEqualTypeOf<() => string>();
    });

    // Async
    it("should return the value async", async () => {
      const result = await tryFn(
        async () => willPassAsync("success"),
        (error) => {
          throw error;
        }
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should have both return types", async () => {
      const wrapper = () =>
        tryFn(
          async () => "success",
          () => 1
        );
      expect(await wrapper()).toBe("success");
      expectTypeOf(wrapper).toEqualTypeOf<() => Promise<string> | number>();
    });

    it("should have both return types", () => {
      const result = tryFn(
        () => willPass("success"),
        async () => {
          await sleep(1);
          return 1;
        }
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string | Promise<number>>();
    });

    it("should have both return types", async () => {
      const result = await tryFn(
        async () => {},
        async () => {}
      );
      expect(result).toBe(undefined);
      expectTypeOf(result).toEqualTypeOf<void>();
    });

    it("should have both return types", async () => {
      const result = await tryFn(
        async () => willPassAsync("success"),
        async () => {}
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string | void>();
    });

    it("should have both return types", async () => {
      const result = await tryFn(
        async () => willPassAsync("success"),
        async (error) => {
          await sleep(1);
          throw error;
        }
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should have both return types", async () => {
      const result = await tryFn(
        async () => willPassAsync("success"),
        async () => {
          await sleep(1);
          return 1;
        }
      );
      expect(result).toBe("success");
      expectTypeOf(result).toEqualTypeOf<string | number>();
    });

    it("should return the value async", async () => {
      const result = await tryFn(
        async () => willThrowAsync("success"),
        () => "fail"
      );
      expect(result).toBe("fail");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should throw an error on error", async () => {
      const result = await tryFn(
        async () => willThrowAsync("success"),
        async () => {
          await sleep(1);
          return "failed";
        }
      );
      expect(result).toBe("failed");
      expectTypeOf(result).toEqualTypeOf<string>();
    });

    it("should throw an error on error", async () => {
      const promise = tryFn(
        async () => willThrowAsync("success"),
        (error) => {
          throw error;
        }
      );
      await expect(promise).rejects.toThrowError("The function failed.");
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("should throw an error on error", async () => {
      const promise = tryFn(
        async () => willThrowAsync("success"),
        async (error) => {
          await sleep(1);
          throw error;
        }
      );
      await expect(promise).rejects.toThrowError("The function failed.");
      expectTypeOf(promise).toEqualTypeOf<Promise<string> | Promise<never>>();
    });
  });

  describe("try catch finally", () => {
    // TODO
    it("should return the value", () => {
      expect(true).toBe(true);
    });
  });

  describe("try finally", () => {
    // TODO
    it("should return the value", () => {
      expect(true).toBe(true);
    });
  });
});
