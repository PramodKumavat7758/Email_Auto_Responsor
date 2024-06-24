// src/auth/outlookOAuth.ts

/*
import { PublicClientApplication, Configuration } from '@azure/msal-node';

const config: Configuration = {
  auth: {
    clientId: 'YOUR_OUTLOOK_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/common',
    clientSecret: 'YOUR_OUTLOOK_CLIENT_SECRET',
  },
};

const pca = new PublicClientApplication(config);

export const getAuthUrl = () => {
  const authCodeUrlParameters = {
    scopes: ["User.Read", "Mail.Read", "Mail.Send"],
    redirectUri: "YOUR_REDIRECT_URI",
  };

  return pca.getAuthCodeUrl(authCodeUrlParameters);
};

export const getToken = async (code: string) => {
  const tokenRequest = {
    code,
    scopes: ["User.Read", "Mail.Read", "Mail.Send"],
    redirectUri: "YOUR_REDIRECT_URI",
  };

  return await pca.acquireTokenByCode(tokenRequest);
};
*/