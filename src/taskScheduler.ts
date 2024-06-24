import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

const emailQueue = new Queue('emails', { connection });

new Worker('emails', async job => {
  // Read emails, parse context, and send replies
}, { connection });

export const addEmailJob = async (email: any) => {
  await emailQueue.add('processEmail', email);
};
