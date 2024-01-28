import { Body, Controller, Delete, Param, Post, Put, Request } from "@nestjs/common";
import { CardService } from "../services/card.service";
import { CreateCardDto } from "../dto/create-card.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto, @Request() req){
    const userId = req.sub;
    return this.cardsService.create(createCardDto, userId);
  }

  @Put(':id')
  update(@Param("id") id: string, @Body() createCardDto: CreateCardDto){
    return this.cardsService.update(id, createCardDto);
  }

  @Delete(':id')
  remove(@Param("id") id: string){
    return this.cardsService.delete(id);
  }
}
