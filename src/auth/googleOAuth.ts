import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = 'Google_Client_Id';
const CLIENT_SECRET = 'google_ClientSecrete';
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const getAuthUrl = (): string => {
  const scopes = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send'
  ];
  return oAuth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes,
  });
};

export const getToken = async (code: string) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

export const getGmailClient = () => oAuth2Client;
