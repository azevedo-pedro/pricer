import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const defaultValues: FormValues = {
  email: "",
  password: "",
};

export function AuthForm() {
  const form = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  return (
    <Form {...form}>
      <form action="">
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
            <FormItem>
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
      </form>
    </Form>
  );
}
