import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Precisa ser um email valido" }),
  password: z
    .string()
    .min(1, { message: "Senha é obrigatório" })
    .min(4, { message: "Senha tem que haver pelo menos 6 caracteres" }),
});

type FormValues = {
  email: string;
  password: string;
};

type Props = {
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};
export type LoginFormData = z.infer<typeof formSchema>;

export function AuthForm({
  defaultValues = { email: "", password: "" },
  onSubmit,
}: Props) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2.5">
              <FormControl>
                <Input
                  placeholder="E-mail*"
                  type="email"
                  className="h-[55px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2.5">
              <FormControl>
                <Input
                  type="password"
                  placeholder="Senha*"
                  className="h-[55px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full bg-[#37776C]">Entrar</Button>
      </form>
    </Form>
  );
}
