import { BullModule } from '@nestjs/bull/dist';
import { Module } from '@nestjs/common';
import { CheckNewsProcessor } from './checkNews.processor';

// Required to register both queues here

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'check-news',
    }, {
      name: "publish-news"
    }),
  ],
  controllers: [],
  providers: [CheckNewsProcessor],
})
export class CheckNewsModule {}