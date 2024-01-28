import { ApiProperty } from "@nestjs/swagger";
import { $Enums, BoardUser } from "@prisma/client";

export class UserBoardEntity implements BoardUser {
	@ApiProperty()
	userId: string;

	@ApiProperty()
	boardId: string;

	@ApiProperty()
	color: string;

	@ApiProperty()
	role: $Enums.Role;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updateAt: Date;
}
