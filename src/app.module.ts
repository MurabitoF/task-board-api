import { Module } from '@nestjs/common';
import { AuthResolver } from './auth/auth.resolver';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [AuthModule, BoardModule],
  controllers: [],
  providers: [AuthResolver],
})
export class AppModule {}
