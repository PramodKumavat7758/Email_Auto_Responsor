import { gmail_v1, google } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';
import { getGmailClient } from './auth/googleOAuth';

export const readGmail = async () => {
  const auth = getGmailClient();
  const gmail = google.gmail({ version: 'v1', auth });

  const res = await gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
  const messages = res.data.messages || [];
  return messages;
};

export const readOutlook = async (accessToken: string) => {
  const client = Client.init({
    authProvider: (done) => done(null, accessToken),
  });

  const messages = await client.api('/me/mailFolders/inbox/messages').filter('isRead eq false').get();
  return messages.value;
};
