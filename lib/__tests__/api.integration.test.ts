import { api } from "@/lib/api";
import { getSession } from "next-auth/react";
import nock from "nock";

jest.mock("next-auth/react");

describe("API Integration", () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const mockSession = {
    user: { name: "Test User" },
    expires: "2024-01-01",
    accessToken: "test_token",
  };

  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = API_URL;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  afterAll(() => {
    delete process.env.NEXT_PUBLIC_API_URL;
    nock.restore();
  });

  it("should make authenticated requests when session exists", async () => {
    (getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    nock(API_URL).options("/users/me").reply(
      200,
      {},
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
      }
    );
    nock(API_URL)
      .get("/users/me")
      .matchHeader("Authorization", `Bearer ${mockSession.accessToken}`)
      .reply(
        200,
        { data: "test" },
        {
          "Access-Control-Allow-Origin": "*",
        }
      );

    const response = await api.get("/users/me");
    expect(response.data).toEqual({ data: "test" });
  });

  it("should make unauthenticated requests when no session exists", async () => {
    (getSession as jest.Mock).mockResolvedValueOnce(null);
    nock(API_URL).options("/users/me").reply(
      200,
      {},
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
      }
    );
    nock(API_URL).get("/users/me").reply(
      200,
      { data: "test" },
      {
        "Access-Control-Allow-Origin": "*",
      }
    );

    const response = await api.get("/users/me");
    expect(response.data).toEqual({ data: "test" });
  });

  it("should handle API errors correctly", async () => {
    (getSession as jest.Mock).mockResolvedValueOnce(mockSession);
    nock(API_URL).options("/users/me").reply(
      200,
      {},
      {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Authorization",
      }
    );
    nock(API_URL).get("/error").reply(
      500,
      { error: "Server Error" },
      {
        "Access-Control-Allow-Origin": "*",
      }
    );

    await expect(api.get("/error")).rejects.toThrow();
  });
});
