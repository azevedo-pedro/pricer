"use client";

import { Button } from "@/components/ui/button";
import { useOpenPrice } from "@/features/price/hooks/use-open-price";
import { Edit } from "lucide-react";

type Props = {
  id: string;
};

export function Actions({ id }: Props) {
  const { onOpen } = useOpenPrice();

  return (
    <>
      <Button variant="ghost" onClick={() => onOpen(id)}>
        <Edit className="size-4 mr-2" />
      </Button>
    </>
  );
}
