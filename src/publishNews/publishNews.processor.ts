import { Process, Processor } from '@nestjs/bull/dist';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as moment from 'moment'

@Processor('publish-news')
export class NewsProcessor {
  private readonly logger = new Logger(NewsProcessor.name);
  constructor (@InjectConnection() private readonly connection: Connection) { }


  @Process()
  async publishNews(job: Job) {

    console.log("Publish called with", job.data)
    
    /*
    const Status  = this.connection.db.collection("statuses");
    const News  = this.connection.db.collection("news");
     const approveStatus = await Status.findOne({
      name: 'Approve',
      is_deleted: false,
    });

    try {
      await News.findOneAndUpdate(
            {
              _id: job.data._id,
            },
            {
              scheduleForLater: false,
              status: approveStatus._id,
              dateAt: moment().startOf('day').utcOffset(0, true).toISOString(),
            },
          );
    } catch (error) {
      return error;
    }
    */
    
    return `Successfully processed the Job with ID: ${123}`;
  }
}