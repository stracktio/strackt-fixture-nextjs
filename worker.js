// ST-2592 preview proof: a long-running background worker with a graceful shutdown.
const fs = require('fs');

const tag = `[st2592-worker pid=${process.pid}]`;
console.log(`${tag} started cwd=${process.cwd()} release=${fs.realpathSync('.')} NODE_ENV=${process.env.NODE_ENV} APP_URL=${process.env.APP_URL ?? '(unset)'} PORT=${process.env.PORT ?? '(unset)'}`);

const heartbeat = setInterval(() => console.log(`${tag} heartbeat`), 30000);

process.on('SIGTERM', () => {
  console.log(`${tag} SIGTERM received, finishing current job`);
  clearInterval(heartbeat);
  setTimeout(() => {
    console.log(`${tag} graceful shutdown complete`);
    process.exit(0);
  }, 2000);
});
