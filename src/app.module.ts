import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull/dist';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
