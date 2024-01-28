import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCardDto {
	@ApiProperty()
	@IsNotEmpty()
	title: string;

	@ApiProperty()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsNotEmpty()
	ownerId: string;

	@ApiProperty()
	@IsNotEmpty()
	columnId: string;
}
