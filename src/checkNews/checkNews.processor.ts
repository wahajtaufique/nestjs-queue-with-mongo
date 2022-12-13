import { Process, Processor, InjectQueue } from '@nestjs/bull/dist';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as moment from 'moment'

@Processor('check-news')
export class CheckNewsProcessor {
  private readonly logger = new Logger(CheckNewsProcessor.name);
  constructor (
    @InjectConnection() private readonly connection: Connection,
    @InjectQueue('publish-news') private readonly publishNewsQueue: Queue,
  ) { }


  @Process()
  async checkNews(job: Job) {

    for (let i = 1; i <= 5; i++) {
      this.publishNewsQueue.add(job.data, {
        delay: 5000
      });
    };

    /*
    const Status  = this.connection.db.collection("statuses");
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
        scheduleDate: todayDate,
        status: approveStatus._id,
      }).toArray();
      if (findData.length > 0) {
        findData.forEach(async (data) => {
          console.log("Hi");
          this.publishNewsQueue.add({"abc": "xyz"});
        });
      }
    } catch (error) {
      return error;
    }
    */

    return "Jobs added"
  }
}