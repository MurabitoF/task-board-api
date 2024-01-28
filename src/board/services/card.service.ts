import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCardDto } from "../dto/create-card.dto";
import { ColumnService } from "./column.service";
import { UpdateCardDto } from "../dto/update-card.dto";

@Injectable()
export class CardService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly columnService: ColumnService,
	) {}

	findById(cardId: string) {
		const card = this.prisma.card.findUnique({ where: { id: cardId } });

		if (!card) throw new NotFoundException("Card not found");

		return card;
	}

	async create(cardDto: CreateCardDto, userId: string) {
		const column = await this.columnService.findById(cardDto.columnId);

		return this.prisma.card.create({
			data: { ...cardDto, order: column.cards.length + 1, ownerId: userId },
		});
	}

	async update(cardId: string, updateCard: UpdateCardDto) {
		const card = await this.findById(cardId);
		if (updateCard.title && updateCard !== card.title) {
			card.title = updateCard.title;
		}
		if (updateCard.description && updateCard !== card.description) {
			card.description = updateCard.description;
		}

		return this.prisma.card.update({
			where: { id: cardId },
			data: { ...card },
		});
	}

	delete(cardId: string) {
		this.prisma.card.delete({ where: { id: cardId } });
	}
}
