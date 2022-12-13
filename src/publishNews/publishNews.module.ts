import { BullModule } from '@nestjs/bull/dist';
import { Module } from '@nestjs/common';
import { NewsProcessor } from './publishNews.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'publish-news',
    }),
  ],
  controllers: [],
  providers: [NewsProcessor],
})
export class NewsModule {}