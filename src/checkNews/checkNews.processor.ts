import { Process, Processor, InjectQueue } from '@nestjs/bull/dist';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { queuePool } from '../bull-board/bull-board-queue';
import * as moment from 'moment'

@Processor('check-news')
export class CheckNewsProcessor {
  private readonly logger = new Logger(CheckNewsProcessor.name);
  constructor (
    @InjectConnection() private readonly connection: Connection,
    @InjectQueue('publish-news') private readonly publishNewsQueue: Queue,
  ) {  queuePool.add(publishNewsQueue) }


  @Process()
  async checkNews(job: Job) {
    const Status  = this.connection.db.collection("status");
    const News  = this.connection.db.collection("news");

    try {
      const approveStatus = await Status.findOne({
        name: 'Approve',
        is_deleted: false,
      });
      const todayDate = moment().startOf('day').utcOffset(0, true).toISOString();

      const findData = await News.find({
        is_deleted: false,
        scheduleForLater: true,
        scheduleDate: new Date(todayDate),
        status: approveStatus._id
      }).toArray();

      if (findData.length > 0) {
        findData.forEach(async (data) => {
          data.statusId = approveStatus._id;
          await this.publishNewsQueue.add(data, {
            delay: 1000
          });
        });
        return `${findData.length} News added`
      }
    } catch (error) {
      return error.message || "Error occurred while checking for the news";
    }

    return "No News were added"
  }
}