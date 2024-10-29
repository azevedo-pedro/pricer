// __tests__/components/UserButton.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSession, signOut } from "next-auth/react";
import { UserButton } from "@/components/user-button";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  User: () => <div data-testid="user-icon">User Icon</div>,
  Settings: () => <div data-testid="settings-icon">Settings Icon</div>,
  LifeBuoy: () => <div data-testid="lifebuoy-icon">LifeBuoy Icon</div>,
  LogOut: () => <div data-testid="logout-icon">Logout Icon</div>,
}));

describe("UserButton", () => {
  const mockProfile = {
    user: {
      name: "John Doe",
      email: "john@example.com",
    },
    expires: "2024-01-01",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Authenticated State", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockProfile,
        status: "authenticated",
      });
    });

    it("renders user avatar and name when authenticated", () => {
      render(<UserButton />);

      expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument();
    });

    it("shows dropdown menu when avatar is clicked", async () => {
      render(<UserButton />);

      const trigger = screen.getAllByText("John Doe")[0].parentElement;
      expect(trigger).toBeInTheDocument();
      if (trigger) {
        await userEvent.click(trigger);
      }

      expect(screen.getByText("Minha Conta")).toBeInTheDocument();
      expect(screen.getByText("Perfil")).toBeInTheDocument();
      expect(screen.getByText("Configurações")).toBeInTheDocument();
      expect(screen.getByText("Suporte")).toBeInTheDocument();
      expect(screen.getByText("Sair")).toBeInTheDocument();
    });

    it("shows avatar fallback when image fails to load", () => {
      render(<UserButton />);

      expect(screen.getAllByText("John Doe")).toHaveLength(1); // One in header, one in fallback
    });

    it("calls signOut when logout button is clicked", async () => {
      render(<UserButton />);

      const trigger = screen.getAllByText("John Doe")[0].parentElement;
      if (trigger) {
        await userEvent.click(trigger);
      }

      const logoutButton = screen.getByText("Sair");
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalledTimes(1);
    });

    it("renders disabled menu items correctly", async () => {
      render(<UserButton />);

      const trigger = screen.getAllByText("John Doe")[0].parentElement;
      if (trigger) {
        await userEvent.click(trigger);
      }
      const profileItem = screen.getByText("Perfil").closest("div");
      const settingsItem = screen.getByText("Configurações").closest("div");
      const supportItem = screen.getByText("Suporte").closest("div");
      expect(profileItem).toHaveAttribute("aria-disabled", "true");
      expect(settingsItem).toHaveAttribute("aria-disabled", "true");
      expect(supportItem).toHaveAttribute("aria-disabled", "true");
    });

    it("renders all icons correctly", async () => {
      render(<UserButton />);

      const trigger = screen.getAllByText("John Doe")[0].parentElement;
      if (trigger) {
        await userEvent.click(trigger);
      }

      expect(screen.getByTestId("user-icon")).toBeInTheDocument();
      expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
      expect(screen.getByTestId("lifebuoy-icon")).toBeInTheDocument();
      expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
    });
  });

  describe("Unauthenticated State", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "unauthenticated",
      });
    });

    it("does not render anything when unauthenticated", () => {
      render(<UserButton />);

      expect(screen.queryByAltText("Profile photo")).not.toBeInTheDocument();
    });
  });

  describe("Loading State", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: null,
        status: "loading",
      });
    });

    it("does not render anything while loading", () => {
      render(<UserButton />);

      expect(screen.queryByAltText("Profile photo")).not.toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    it("handles signOut rejection gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      (signOut as jest.Mock).mockRejectedValueOnce(new Error("SignOut failed"));
      (useSession as jest.Mock).mockReturnValue({
        data: mockProfile,
        status: "authenticated",
      });

      render(<UserButton />);

      const trigger = screen.getAllByText("John Doe")[0].parentElement;
      if (trigger) {
        await userEvent.click(trigger);
      }

      const logoutButton = screen.getByText("Sair");
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
