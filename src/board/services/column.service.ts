import { NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateColumnDto } from "../dto/create-column.dto";
import { BoardService } from "./board.service";
import { UpdateColumnDto } from "../dto/update-column.dto";

export class ColumnService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly boardService: BoardService,
	) {}

	async findById(id: string) {
		const column = await this.prisma.column.findUnique({
			where: {
				id,
			},
			include: { cards: true },
		});

		if (!column) throw new NotFoundException("Column not found");

		return column;
	}

	async create(columnDto: CreateColumnDto) {
		const board = await this.boardService.findById(columnDto.boardId);
		return this.prisma.column.create({
			data: { ...columnDto, order: board.columns.length + 1 },
		});
	}

	async update(id: string, updateColumnDto: UpdateColumnDto) {
		return this.prisma.column.update({
			where: { id },
			data: { name: updateColumnDto.name },
		});
	}

	delete(id: string) {
		return this.prisma.column.delete({ where: { id } });
	}
}
