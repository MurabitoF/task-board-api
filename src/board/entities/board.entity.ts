import { ApiProperty } from "@nestjs/swagger";
import { Board } from "@prisma/client";

export class BoardEntity implements Board {
	@ApiProperty({ type: "uuid" })
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty({ default: "false" })
	private: boolean;

	@ApiProperty({ required: false, nullable: true })
	password: string | null;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updateAt: Date;
}
