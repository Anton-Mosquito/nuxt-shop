export default defineNitroPlugin(async () => {
  console.log("🔧 Initializing database...");

  try {
    // This will run migrations on first startup
    await useDB();
    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
  }
});
