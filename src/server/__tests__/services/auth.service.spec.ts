import { TRPCError } from "@trpc/server";
import { AuthService } from "../../services/auth.service";
import { UserRepository } from "../../repositories/user.repository";

describe("AuthService", () => {
  let authService: AuthService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    authService = new AuthService(mockUserRepository);
  });

  describe("login", () => {
    it("should return user name and token when credentials are valid", async () => {
      const mockEmail = "test@example.com";
      const mockPassword = "password123";
      const mockUser = {
        id: 1,
        name: "Test User",
        email: mockEmail,
        password: mockPassword,
        token: "mock-token-123",
        createdAt: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      const actualResult = await authService.login({
        email: mockEmail,
        password: mockPassword,
      });

      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(mockEmail);
      expect(actualResult).toEqual({
        name: mockUser.name,
        token: mockUser.token,
      });
    });

    it("should throw UNAUTHORIZED error when credentials are invalid", async () => {
      const mockEmail = "test@example.com";
      const mockPassword = "wrong-password";
      const mockUser = {
        id: 1,
        name: "Test User",
        email: mockEmail,
        password: "correct-password",
        token: "mock-token-123",
        createdAt: new Date(),
      };

      mockUserRepository.findByEmail.mockResolvedValue(mockUser);

      await expect(
        authService.login({
          email: mockEmail,
          password: mockPassword,
        })
      ).rejects.toThrow(TRPCError);

      await expect(
        authService.login({
          email: mockEmail,
          password: mockPassword,
        })
      ).rejects.toMatchObject({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    });
  });
});

