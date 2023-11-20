// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://9b0bc864d5cb400b87bfef099d4a7bdd@o4505229370195968.ingest.sentry.io/4505229371375616',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  beforeSend: event => {
    if (event.message?.includes('ResizeObserver loop')) {
      return null;
    }
    return event;
  },
});
