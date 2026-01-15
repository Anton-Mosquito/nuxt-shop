export default defineNitroPlugin((nitroApp) => {
  // Перехоплюємо всі помилки, що виникають у застосунку
  nitroApp.hooks.hook('error', async (error, { event }) => {
    // 1. Логування в консоль (або зовнішній сервіс як Sentry/Logtail)
    console.error(`[API Error] ${event?.path}:`, error);

    // 2. Можна додати специфічну логіку для помилок бази даних (Prisma)
    if (error.message.includes('Prisma')) {
      // Тут можна відправити сповіщення в Telegram/Slack команді
      // або додати специфічні метадані
    }
  });

  // Можна також перехоплювати відповіді (опціонально)
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    // Наприклад, додати кастомний заголовок до всіх успішних відповідей
    // response.headers['x-processed-by'] = 'my-nuxt-app';
  });
});