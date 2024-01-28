import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { BoardModule } from "./board/board.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
		AuthModule,
		BoardModule,
		PrismaModule,
		ConfigModule.forRoot({ isGlobal: true }),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
