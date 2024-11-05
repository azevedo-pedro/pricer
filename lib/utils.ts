import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formaterCurrency = (currency: number) => {
  if (currency) {
    const formatedCurrency = new Intl.NumberFormat("pt-BR", {
      maximumSignificantDigits: 4,
    }).format(currency);
    return `R$ ${formatedCurrency}`;
  }
  return null;
};

export const formaterPerCent = (perCent: number) => {
  if (perCent) {
    const formatedPerCent = new Intl.NumberFormat("pt-BR", {
      maximumSignificantDigits: 4,
    }).format(perCent);
    return `${formatedPerCent} %`;
  }
  return null;
};
