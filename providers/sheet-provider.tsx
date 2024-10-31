"use client";

import { NewPriceSheet } from "@/features/price/components/new-price-sheet";
import { useMountedState } from "react-use";

export function SheetProvider() {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewPriceSheet />
    </>
  );
}
