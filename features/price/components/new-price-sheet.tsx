import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useNewPrice } from "@/features/price/hooks/use-new-price";
import { PriceForm } from "./price-form";
import { useCreatePrice } from "../api/use-create-price";
import { TickerProps } from "../api/api";

export function NewPriceSheet() {
  const { isOpen, onClose } = useNewPrice();
  const mutation = useCreatePrice();
  const onSubmit = (values: TickerProps) => {
    const toUpper = values.ticker.toUpperCase().trim();
    mutation.mutate(
      { ...values, ticker: toUpper },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Novo Ativo</SheetTitle>
          <SheetDescription>
            Adicione um novo ativo ao seu rastreio.
          </SheetDescription>
        </SheetHeader>
        <PriceForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ ticker: "", qtd: "" }}
        />
      </SheetContent>
    </Sheet>
  );
}
