import { render, screen } from "@testing-library/react";
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
  Mail: () => <div data-testid="mail-icon">Mail Icon</div>,
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

      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("shows email in dropdown menu when avatar is clicked", async () => {
      render(<UserButton />);

      const trigger = screen.getByText("John Doe").closest("div");
      expect(trigger).toBeInTheDocument();
      if (trigger) {
        await userEvent.click(trigger);
      }

      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    it("calls signOut when logout button is clicked", async () => {
      render(<UserButton />);

      const trigger = screen.getByText("John Doe").closest("div");
      if (trigger) {
        await userEvent.click(trigger);
      }

      const logoutButton = screen.getByText("Sair");
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalledTimes(1);
    });

    it("renders logout icon correctly", async () => {
      render(<UserButton />);

      const trigger = screen.getByText("John Doe").closest("div");
      if (trigger) {
        await userEvent.click(trigger);
      }

      expect(screen.getByTestId("logout-icon")).toBeInTheDocument();
    });

    it("has correct hover cursor style", () => {
      render(<UserButton />);

      const button = screen.getByText("John Doe").closest("div");
      expect(button).toHaveClass("hover:cursor-pointer");
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
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
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
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  describe("Error Handling", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockProfile,
        status: "authenticated",
      });
    });

    it("handles signOut rejection gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      const mockError = new Error("SignOut failed");
      (signOut as jest.Mock).mockRejectedValueOnce(mockError);

      render(<UserButton />);

      const trigger = screen.getByText("John Doe").closest("div");
      if (trigger) {
        await userEvent.click(trigger);
      }

      const logoutButton = screen.getByText("Sair");
      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("Failed to sign out:", mockError);

      consoleSpy.mockRestore();
    });
  });

  describe("Component Layout", () => {
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({
        data: mockProfile,
        status: "authenticated",
      });
    });

    it("renders with correct layout classes", () => {
      render(<UserButton />);

      const container = screen.getByText("John Doe").closest("div");
      expect(container).toHaveClass("flex", "justify-center", "items-center");
    });

    it("renders user name with correct text styles", () => {
      render(<UserButton />);

      const nameElement = screen.getByText("John Doe").closest("h2");
      expect(nameElement).toHaveClass(
        "text-white",
        "text-base",
        "ml-2",
        "leading-5",
      );
    });
  });
});
