import { MessageEvent } from './types';
import { processMessage } from '../../services/openai.service';
import logger from '@/utils/logger';
import { WebClient } from '@slack/web-api';

export const handleMessage = async (
  event: MessageEvent,
) => {
  // Ignore bot messages and messages with subtypes
  if (event.bot_id || event.subtype) {
    return;
  }
  const client = new WebClient(process.env.SLACK_BOT_TOKEN);

  logger.info('Received message', { event });

  try {
    await client.apiCall('assistant.threads.setStatus', {
      status: 'Looking up information...',
      thread_ts: event.thread_ts,
      channel_id: event.channel
    });

    if (event.text) {
      const response = await processMessage(event.text);
      await client.chat.postMessage({
        channel: event.channel,
        text: response,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: response
            }
          }
        ],
        thread_ts: event.thread_ts
      });
      logger.info('Sent response to message', { channel: event.channel, response });
    } else {
      await client.chat.postMessage({
        channel: event.channel,
        text: 'Please provide more information...',
        thread_ts: event.thread_ts
      });
      logger.info('No text in message', { event });
    }
  } catch (error) {
    logger.error('Error sending response:', error);
  }
}; 