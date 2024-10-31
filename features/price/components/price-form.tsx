import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";

const formSchema = z.object({
  ticker: z.string(),
  qtd: z.string(),
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export function PriceForm({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="ticker"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ativo</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Ex. VALE3, PRIO3, HYPE3."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="qtd"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input disabled={disabled} placeholder="Ex. 100." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          style={{ marginTop: "10px" }}
          className="w-full"
          disabled={disabled}
        >
          {id ? "Save Changes" : "Criar Ativo"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
}
