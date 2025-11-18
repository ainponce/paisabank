import { TRPCError } from "@trpc/server";
import { UserService } from "../../services/user.service";
import { UserRepository } from "../../repositories/user.repository";

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userService = new UserService(mockUserRepository);
  });

  describe("getProfile", () => {
    it("should return user profile successfully", async () => {
      const mockUserId = 1;
      const mockUser = {
        id: mockUserId,
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        token: "mock-token-123",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);

      const actualResult = await userService.getProfile(mockUserId);

      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUserId);
      expect(actualResult).toEqual({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        createdAt: mockUser.createdAt,
      });
      expect(actualResult).not.toHaveProperty("password");
      expect(actualResult).not.toHaveProperty("token");
    });
  });

  describe("updateProfile", () => {
    it("should update user profile with new data", async () => {
      const mockUserId = 1;
      const mockExistingUser = {
        id: mockUserId,
        name: "Old Name",
        email: "old@example.com",
        password: "oldpassword",
        token: "mock-token-123",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      };
      const mockUpdatedUser = {
        id: mockUserId,
        name: "New Name",
        email: "new@example.com",
        password: "oldpassword",
        token: "mock-token-123",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      };

      mockUserRepository.findById.mockResolvedValue(mockExistingUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.update.mockResolvedValue(mockUpdatedUser);

      const actualResult = await userService.updateProfile({
        userId: mockUserId,
        name: "New Name",
        email: "new@example.com",
      });

      expect(mockUserRepository.findById).toHaveBeenCalledWith(mockUserId);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        "new@example.com"
      );
      expect(mockUserRepository.update).toHaveBeenCalledWith(mockUserId, {
        name: "New Name",
        email: "new@example.com",
      });
      expect(actualResult).toEqual({
        id: mockUpdatedUser.id,
        name: mockUpdatedUser.name,
        email: mockUpdatedUser.email,
      });
      expect(actualResult).not.toHaveProperty("password");
      expect(actualResult).not.toHaveProperty("token");
    });
  });
});

