import { Worker,RedisClient } from 'bullmq';
import { readGmail, readOutlook } from './emailReader';
import { parseEmailContext } from './contextParser';
import { sendGmailReply, sendOutlookReply } from './emailSender';
new Worker('emails', async job => {
  const { emailService, accessToken } = job.data;

  let emails;
  if (emailService === 'gmail') {
    emails = await readGmail();
  } else if (emailService === 'outlook') {
    emails = await readOutlook(accessToken);
  }

  for (const email of emails) {
    const context = await parseEmailContext(email.body.content);
    let reply;
    if (context.includes('Interested')) {
      reply = 'We are glad to hear you are interested. Would you like to schedule a demo call?';
    } else if (context.includes('Not Interested')) {
      reply = 'Thank you for your response. If you change your mind, please let us know.';
    } else if (context.includes('More information')) {
      reply = 'Can you provide more details on what you need?';
    }

    if (emailService === 'gmail') {
      await sendGmailReply(email.threadId, reply);
    } else if (emailService === 'outlook') {
      await sendOutlookReply(accessToken, email.id, reply);
    }
  }
}, { connection: new IORedis() });
