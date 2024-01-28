import { ApiProperty } from "@nestjs/swagger";
import { Column } from "@prisma/client";

export class ColumnEntity implements Column {
	@ApiProperty({ type: "uuid" })
	id: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	order: number;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updateAt: Date;

	@ApiProperty()
	boardId: string;
}
