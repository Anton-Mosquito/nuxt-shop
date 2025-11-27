export default defineEventHandler((event) => {
  //console.log("🚀 ~ event:", event);
  const { req } = event.node;

  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  const userAgent = req.headers["user-agent"] || "Unknown";

  console.log("🛠️ SERVER LOG", { method, url, timestamp, userAgent });
});

//
