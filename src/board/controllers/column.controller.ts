import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import { ColumnService } from "../services/column.service";
import { CreateColumnDto } from "../dto/create-column.dto";
import { UpdateColumnDto } from "../dto/update-column.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('columns')
@ApiBearerAuth()
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.create(createColumnDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.delete(id);
  }
}