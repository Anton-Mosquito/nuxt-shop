export default defineNuxtRouteMiddleware((to, from) => {
  // Always log to see if middleware runs at all
  console.log("🔥 MIDDLEWARE EXECUTING");

  if (import.meta.server) {
    console.log("🚀 ~ SERVER SIDE - Running on the server");
    console.log("🚀 ~ SERVER from:", from.fullPath);
    console.log("🚀 ~ SERVER to:", to.fullPath);
    console.log("🚀 ~ SERVER timestamp:", new Date().toISOString());
  } else {
    console.log("🌐 ~ CLIENT SIDE - Running on the client");
    console.log("🌐 ~ CLIENT from:", from.fullPath);
    console.log("🌐 ~ CLIENT to:", to.fullPath);
    console.log("🌐 ~ CLIENT timestamp:", new Date().toISOString());
  }
});
