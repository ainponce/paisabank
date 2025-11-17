import { CardRepository } from "../repositories/card.repository";

export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  async getUserCards(userId: number) {
    return await this.cardRepository.findByUserId(userId);
  }
}

