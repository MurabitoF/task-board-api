import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, ValidateIf } from "class-validator";

export class CreateBoardDto {
	@ApiProperty()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsBoolean()
	private: boolean;

	@ApiProperty()
	@ValidateIf((o) => o.private === true)
	@IsNotEmpty()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	color: string;
}
