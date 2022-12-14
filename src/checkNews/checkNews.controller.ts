import { Controller, Post, Body, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { queuePool } from '../bull-board/bull-board-queue';

@Controller()
export class CheckNewsController {
  constructor(@InjectQueue('check-news') private checkNewsQueue: Queue) {
    queuePool.add(checkNewsQueue);
  }

  @Post('/add-cron')
  async addCron(
    @Body() body: {
    "school": string,
    "_id": string
  }) {
    try {
        const job = await this.checkNewsQueue.add(body, {
            repeat: {cron: '0 0 * * *'},
            jobId: body._id
        });
        return `Created job ${ job.id}`;
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
  }

  @Get('/server-status')
  getServerStatus() {
    return "Running"
  }

}