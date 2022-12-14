import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './publishNews/publishNews.module';
import { CheckNewsModule } from './checkNews/checkNews.module';
import { BullBoardController } from './bull-board//bull-board-controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_DB_HOST,
        port: parseInt(process.env.REDIS_DB_PORT),
      },
    }),
    NewsModule,
    CheckNewsModule
  ],
  controllers: [BullBoardController],
  providers: [],
})
export class AppModule {}
