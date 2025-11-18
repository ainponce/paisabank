import { CardService } from "../../services/card.service";
import { CardRepository } from "../../repositories/card.repository";

describe("CardService", () => {
  let cardService: CardService;
  let mockCardRepository: jest.Mocked<CardRepository>;

  beforeEach(() => {
    mockCardRepository = {
      findByUserId: jest.fn(),
    } as unknown as jest.Mocked<CardRepository>;

    cardService = new CardService(mockCardRepository);
  });

  describe("getUserCards", () => {
    it("should return user's cards successfully", async () => {
      const mockUserId = 1;
      const mockCards = [
        {
          id: 1,
          userId: mockUserId,
          issuer: "visa",
          name: "Main Card",
          expDate: "12/25",
          lastDigits: "1234",
          fullNumber: "4111111111111234",
          cvv: "123",
          balance: "1500.00",
          currency: "USD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: mockUserId,
          issuer: "mastercard",
          name: "Secondary Card",
          expDate: "06/26",
          lastDigits: "5678",
          fullNumber: "5555555555555678",
          cvv: "456",
          balance: "2500.00",
          currency: "USD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockCardRepository.findByUserId.mockResolvedValue(mockCards);

      const actualResult = await cardService.getUserCards(mockUserId);

      expect(mockCardRepository.findByUserId).toHaveBeenCalledWith(mockUserId);
      expect(actualResult).toEqual(mockCards);
      expect(actualResult).toHaveLength(2);
    });

    it("should return empty array when user has no cards", async () => {
      const mockUserId = 1;
      const mockEmptyCards: [] = [];

      mockCardRepository.findByUserId.mockResolvedValue(mockEmptyCards);

      const actualResult = await cardService.getUserCards(mockUserId);

      expect(mockCardRepository.findByUserId).toHaveBeenCalledWith(mockUserId);
      expect(actualResult).toEqual([]);
      expect(actualResult).toHaveLength(0);
    });
  });
});

