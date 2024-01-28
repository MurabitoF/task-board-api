import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AssociateUserToBoardDto } from "../dto/associate-user-board.dto";

@Injectable()
export class UserBoardService {
	constructor(private readonly prisma: PrismaService) {}

	associateUserToBoard(userToAssociate: AssociateUserToBoardDto) {
		return this.prisma.boardUser.create({
			data: userToAssociate,
		});
	}

	unassociateUserToBoard(boardId: string, userId: string) {
		return this.prisma.boardUser.delete({
			where: { userId_boardId: { boardId, userId } },
		});
	}

	removeAllUser(boardId: string) {
		return this.prisma.boardUser.deleteMany({ where: { boardId } });
	}
}
