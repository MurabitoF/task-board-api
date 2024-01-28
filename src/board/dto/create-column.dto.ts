import { ApiProperty } from "@nestjs/swagger";
import { IS_ALPHA, IsNotEmpty } from "class-validator";

export class CreateColumnDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	boardId: string;
}
