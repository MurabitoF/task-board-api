import { Module } from "@nestjs/common";
import { BoardService } from "./services/board.service";
import { BoardController } from "./controllers/board.controller";
import { ColumnsController } from "./controllers/column.controller";
import { CardsController } from "./controllers/card.controller";
import { CardService } from "./services/card.service";
import { ColumnService } from "./services/column.service";
import { AuthModule } from "src/auth/auth.module";
import { UserBoardService } from "./services/users-boards.service";

@Module({
	imports: [AuthModule],
	controllers: [BoardController, ColumnsController, CardsController],
	providers: [BoardService, CardService, ColumnService, UserBoardService],
})
export class BoardModule {}
