import { Process, Processor } from '@nestjs/bull/dist';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Types } from 'mongoose';
import * as moment from 'moment'

@Processor('publish-news')
export class NewsProcessor {
  private readonly logger = new Logger(NewsProcessor.name);
  constructor (@InjectConnection() private readonly connection: Connection) { }


  @Process()
  async publishNews(job: Job) {

    let approveStatusId = job.data.statusId;
    const News = this.connection.db.collection("news");

    try {
      await News.findOneAndUpdate(
            {
              _id: new Types.ObjectId(job.data._id)
            },
            {
              $set: {
                scheduleForLater: false,
                status: new Types.ObjectId(approveStatusId),
                dateAt: moment().startOf('day').utcOffset(0, true),
              }
            },
          );
    } catch (error) {
      return error.message || "An error occurred while publishing the news";
    }  
    return `Successfully processed the News with ID: ${job.data._id}`;
  }
}