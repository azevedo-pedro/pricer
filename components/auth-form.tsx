import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
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
export type LoginFormData = z.infer<typeof loginSchema>;

export function AuthForm({
  defaultValues = { email: "", password: "" },
  onSubmit,
}: Props) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
            </FormItem>
          )}
        />
        <Button className="w-full bg-[#37776C]">Entrar</Button>
      </form>
    </Form>
  );
}
