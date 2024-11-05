import { cn, formaterCurrency, formaterPerCent } from "../utils";

describe("cn (className merger)", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
    expect(cn("foo", { bar: true })).toBe("foo bar");
    expect(cn("foo", { bar: false })).toBe("foo");
    expect(cn("foo", undefined, "bar")).toBe("foo bar");
  });

  it("should handle tailwind conflicts correctly", () => {
    expect(cn("px-2 px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("mt-2", { "mt-4": true })).toBe("mt-4");
  });

  it("should handle empty or invalid inputs", () => {
    expect(cn()).toBe("");
    expect(cn("")).toBe("");
    expect(cn(null)).toBe("");
    expect(cn(undefined)).toBe("");
  });
});

describe("formaterCurrency", () => {
  it("should format positive numbers correctly", () => {
    expect(formaterCurrency(1234.56)).toBe("R$ 1.235");
    expect(formaterCurrency(1000)).toBe("R$ 1.000");
    expect(formaterCurrency(1)).toBe("R$ 1");
  });

  it("should handle large numbers", () => {
    expect(formaterCurrency(1000000)).toBe("R$ 1.000.000");
    expect(formaterCurrency(1234567.89)).toBe("R$ 1.235.000");
  });

  it("should handle small decimal numbers", () => {
    expect(formaterCurrency(0.123)).toBe("R$ 0,123");
    expect(formaterCurrency(0.1)).toBe("R$ 0,1");
  });

  it("should handle zero", () => {
    expect(formaterCurrency(0)).toBe(null);
  });

  it("should handle invalid inputs", () => {
    expect(formaterCurrency(NaN)).toBe(null);
    // @ts-expect-error - Testing invalid input
    expect(formaterCurrency(undefined)).toBe(null);
    // @ts-expect-error - Testing invalid input
    expect(formaterCurrency(null)).toBe(null);
  });

  it("should handle negative numbers", () => {
    expect(formaterCurrency(-1234.56)).toBe("R$ -1.235");
    expect(formaterCurrency(-1000)).toBe("R$ -1.000");
  });
});

describe("formaterPerCent", () => {
  it("should format positive numbers correctly", () => {
    expect(formaterPerCent(12.34)).toBe("12,34 %");
    expect(formaterPerCent(100)).toBe("100 %");
    expect(formaterPerCent(1)).toBe("1 %");
  });

  it("should handle large numbers", () => {
    expect(formaterPerCent(1000)).toBe("1.000 %");
    expect(formaterPerCent(1234.56)).toBe("1.235 %");
  });

  it("should handle small decimal numbers", () => {
    expect(formaterPerCent(0.123)).toBe("0,123 %");
    expect(formaterPerCent(0.1)).toBe("0,1 %");
  });

  it("should handle zero", () => {
    expect(formaterPerCent(0)).toBe(null);
  });

  it("should handle invalid inputs", () => {
    expect(formaterPerCent(NaN)).toBe(null);
    // @ts-expect-error - Testing invalid input
    expect(formaterPerCent(undefined)).toBe(null);
    // @ts-expect-error - Testing invalid input
    expect(formaterPerCent(null)).toBe(null);
  });

  it("should handle negative numbers", () => {
    expect(formaterPerCent(-12.34)).toBe("-12,34 %");
    expect(formaterPerCent(-100)).toBe("-100 %");
  });
});
