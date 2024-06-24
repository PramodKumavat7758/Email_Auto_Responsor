import { google } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';
import { getGmailClient } from './auth/googleOAuth';

export const sendGmailReply = async (threadId: string, message: string) => {
  const auth = getGmailClient();
  const gmail = google.gmail({ version: 'v1', auth });

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      threadId,
      raw: Buffer.from(message).toString('base64'),
    },
  });
};

export const sendOutlookReply = async (accessToken: string, messageId: string, message: string) => {
  const client = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  await client.api(`/me/messages/${messageId}/reply`).post({
    comment: message,
  });
};
