import { Injectable, NotFoundException, Request } from "@nestjs/common";
import { $Enums } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UserBoardService } from "./users-boards.service";
import { AssociateUserToBoardDto } from "../dto/associate-user-board.dto";

@Injectable()
export class BoardService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userBoardService: UserBoardService,
	) {}

	async create(createBoardDto: CreateBoardDto, userId: string) {
		const salt = await bcrypt.genSalt();
		const newBoard = {
			...createBoardDto,
			password: await bcrypt.hash(createBoardDto.password, salt),
		};
		const savedBoard = await this.prisma.board.create({
			data: { ...newBoard },
		});

		const assosiation: AssociateUserToBoardDto = {
			userId,
			boardId: savedBoard.id,
			color: createBoardDto.color,
			role: $Enums.Role.OWNER,
		};

		await this.userBoardService.associateUserToBoard(assosiation);

		return savedBoard;
	}

	findAllByUser(userId: string) {
		return this.prisma.board.findMany({
			where: { users: { every: { userId } } },
		});
	}

	async findById(id: string, columns = true) {
		const board = await this.prisma.board.findUnique({
			where: { id },
			include: { columns },
		});

		if (!board) throw new NotFoundException("Board not found");

		return board;
	}

	async update(id: string, updatedBoardDto: UpdateBoardDto) {
		const board = await this.findById(id, false);

		if (updatedBoardDto.name && board.name !== updatedBoardDto.name) {
			board.name = updatedBoardDto.name;
		}

		//Change validation with coparison between encrypted passwords
		if (
			updatedBoardDto.password &&
			board.password !== updatedBoardDto.password
		) {
			//Encrypt password
			board.password = updatedBoardDto.password;
		}

		if (updatedBoardDto.private && board.private !== updatedBoardDto.private) {
			board.private = updatedBoardDto.private;
			if (!updatedBoardDto.private) {
				board.password = null;
			}
		}

		return this.prisma.board.update({
			where: { id },
			data: {
				name: board.name,
				password: board.password,
				private: board.private,
			},
		});
	}

	async remove(id: string) {
		await this.userBoardService.removeAllUser(id);
		return this.prisma.board.delete({ where: { id } });
	}
}
