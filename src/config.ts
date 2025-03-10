import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-pro',
  },
  hubspot: {
    accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  },
  jira: {
    host: process.env.JIRA_HOST,
    username: process.env.JIRA_USERNAME || '',
    password: process.env.JIRA_API_TOKEN,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
  },
  zendesk: {
    subdomain: process.env.ZENDESK_SUBDOMAIN,
    email: process.env.ZENDESK_EMAIL,
    token: process.env.ZENDESK_API_TOKEN,
  },
} as const; 