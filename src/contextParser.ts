import { OpenAI, Configuration } from 'openai';

const openai = new OpenAI(new Configuration({
  apiKey: 'OPenAI API Keya',
}));

export const parseEmailContext = async (emailContent: string) => {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Categorize the following email content and suggest a response: ${emailContent}`,
    max_tokens: 150,
  });

  return response.data.choices[0].text;
};
