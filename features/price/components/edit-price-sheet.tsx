import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { useOpenPrice } from "@/features/price/hooks/use-open-price";
import { PriceForm } from "./price-form";
import { useEditPrice } from "../api/use-edit-price";
import { TickerProps } from "../api/api";
import { useGetPriceId } from "../api/use-get-price-id";
import { useDeletePrice } from "../api/use-delete-price";

export function EditPriceSheet() {
  const { isOpen, onClose, id } = useOpenPrice();
  const priceQuery = useGetPriceId(id);
  const mutation = useEditPrice();
  const deletePrices = useDeletePrice();

  const defaultValues = priceQuery.data
    ? {
        ticker: priceQuery.data?.ticker,
        qtd: priceQuery.data?.qtd,
      }
    : { ticker: "", qtd: "" };
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
  const onDelete = () => {
    deletePrices.mutate([id ? id : ""], { onSuccess: () => onClose() });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Editar Ativo</SheetTitle>
          <SheetDescription>Edite ativo do seu rastreio.</SheetDescription>
        </SheetHeader>
        <PriceForm
          id={id}
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          onDelete={onDelete}
          defaultValues={{
            ticker: defaultValues.ticker,
            qtd: defaultValues.qtd,
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
