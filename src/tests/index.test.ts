import { describe, it, expect, vi } from "vitest";
import { initial, initialTwo } from "../index";

describe("initial", () => {
  it("should return 'initial'", () => {
    expect(initial()).toBe("initial");
  });
});

describe("initialTwo", () => {
  it("should return 'initialTwo'", () => {
    expect(initialTwo()).toBe("initialTwo");
  });
});
