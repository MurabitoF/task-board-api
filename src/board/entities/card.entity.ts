import { ApiProperty } from "@nestjs/swagger";
import { Card } from "@prisma/client";

export class CardEntity implements Card {
	@ApiProperty({ type: "uuid" })
	id: string;

	@ApiProperty()
	title: string;

	@ApiProperty({ required: false, nullable: true })
	description: string | null;

	@ApiProperty()
	order: number;

	@ApiProperty()
	columnId: string;

	@ApiProperty()
	ownerId: string;
}
