import { Controller, Get, Post, Body, Param, Delete, Request, Put } from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('boards')
@ApiBearerAuth()
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @Request() req) {
    const userId = req.sub 
    return this.boardService.create(createBoardDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.sub;
    return this.boardService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
