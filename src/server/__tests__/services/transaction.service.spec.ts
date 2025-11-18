import { TransactionService } from "../../services/transaction.service";
import { TransactionRepository } from "../../repositories/transaction.repository";

describe("TransactionService", () => {
  let transactionService: TransactionService;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;

  beforeEach(() => {
    mockTransactionRepository = {
      findLastByUserId: jest.fn(),
      findAllByUserId: jest.fn(),
    } as unknown as jest.Mocked<TransactionRepository>;

    transactionService = new TransactionService(mockTransactionRepository);
  });

  describe("getLastTransactions", () => {
    it("should return last 5 transactions for user", async () => {
      const mockUserId = 1;
      const mockTransactions = [
        {
          id: 1,
          userId: mockUserId,
          title: "Payment received",
          amount: "500.00",
          transactionType: "received",
          date: new Date("2024-11-17"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: mockUserId,
          title: "Payment sent",
          amount: "200.00",
          transactionType: "sent",
          date: new Date("2024-11-16"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: mockUserId,
          title: "Subscription",
          amount: "50.00",
          transactionType: "subscription",
          date: new Date("2024-11-15"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: mockUserId,
          title: "Payment sent",
          amount: "100.00",
          transactionType: "sent",
          date: new Date("2024-11-14"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          userId: mockUserId,
          title: "Payment received",
          amount: "300.00",
          transactionType: "received",
          date: new Date("2024-11-13"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTransactionRepository.findLastByUserId.mockResolvedValue(
        mockTransactions
      );

      const actualResult = await transactionService.getLastTransactions(
        mockUserId
      );

      expect(mockTransactionRepository.findLastByUserId).toHaveBeenCalledWith(
        mockUserId,
        5
      );
      expect(actualResult).toEqual(mockTransactions);
      expect(actualResult).toHaveLength(5);
    });
  });

  describe("getAllTransactions", () => {
    it("should filter transactions by type", async () => {
      const mockUserId = 1;
      const mockFilter = "sent";
      const mockFilteredTransactions = [
        {
          id: 2,
          userId: mockUserId,
          title: "Payment sent",
          amount: "200.00",
          transactionType: "sent",
          date: new Date("2024-11-16"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          userId: mockUserId,
          title: "Payment sent",
          amount: "100.00",
          transactionType: "sent",
          date: new Date("2024-11-14"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTransactionRepository.findAllByUserId.mockResolvedValue(
        mockFilteredTransactions
      );

      const actualResult = await transactionService.getAllTransactions({
        userId: mockUserId,
        filter: mockFilter,
      });

      expect(mockTransactionRepository.findAllByUserId).toHaveBeenCalledWith(
        mockUserId,
        mockFilter
      );
      expect(actualResult).toEqual(mockFilteredTransactions);
      expect(actualResult).toHaveLength(2);
      expect(actualResult.every((t) => t.transactionType === "sent")).toBe(
        true
      );
    });
  });
});

