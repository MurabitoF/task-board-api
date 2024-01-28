import { $Enums } from "@prisma/client";

export class AssociateUserToBoardDto {
	userId: string;
	boardId: string;
	role: $Enums.Role;
	color: string;
}
