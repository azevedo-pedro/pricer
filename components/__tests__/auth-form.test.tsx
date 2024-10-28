import { render, screen, waitFor } from "@/lib/test-utils";
import { AuthForm } from "@/components/auth-form";

describe("AuthForm", () => {
  it("renders login form", () => {
    const submit = jest.fn();

    render(<AuthForm onSubmit={submit} />);
    expect(screen.getByPlaceholderText(/e\-mail\*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Senha*/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    const submit = jest.fn();

    const { user } = render(<AuthForm onSubmit={submit} />);

    await user.click(screen.getByRole("button", { name: /entrar/i }));

    expect(await screen.findByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha é obrigatório/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const submit = jest.fn();

    const { user } = render(<AuthForm onSubmit={submit} />);

    await user.type(
      screen.getByPlaceholderText(/E-mail*/i),
      "test@example.com"
    );
    await user.type(screen.getByPlaceholderText(/senha/i), "password123");
    await user.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(window.location.href).toContain("http://localhost/");
    });
  });
});
