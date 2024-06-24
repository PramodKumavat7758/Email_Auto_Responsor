import express from 'express';
import { getAuthUrl as getGoogleAuthUrl, getToken as getGoogleToken, getGmailClient } from './auth/googleOAuth';
//import { getAuthUrl as getOutlookAuthUrl, getToken as getOutlookToken } from './auth/outlookOAuth';
import { OAuth2Client } from 'google-auth-library';

const app = express();
const PORT = 3000;

app.get('/auth/google', (req, res) => {
  res.redirect(getGoogleAuthUrl());
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokens = await getGoogleToken(code);
  res.json(tokens);
});
/*
app.get('/auth/outlook', (req, res) => {
  res.redirect(getOutlookAuthUrl());
});

app.get('/auth/outlook/callback', async (req, res) => {
  const code = req.query.code as string;
  const tokens = await getOutlookToken(code);
  res.json(tokens);
});
*/
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
