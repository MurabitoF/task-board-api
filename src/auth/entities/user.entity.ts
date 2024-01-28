import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { User } from "@prisma/client";

export class UserEntity implements User {
	@ApiProperty()
	id: string;

	@ApiProperty()
	username: string;

	@ApiProperty()
	@Exclude()
	password: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updateAt: Date;
}
