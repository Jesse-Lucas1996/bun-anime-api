import { Hono } from "hono";

const app = new Hono();

const home = app.get("/", (c) => {
  return c.json({ message: "Hello World" });
});

const anime = app.get("/anime", async (c) => {
  const anime = await fetch("https://animechan.vercel.app/api/random");
  const res = await anime.json();
  return c.json({
    anime: res.anime,
    character: res.character,
    quote: res.quote,
  });
});

console.log("Running on port: ", process.env.port ?? 3000);

export default {
  port: Number(process.env.PORT ?? 3000),
  fetch: home.fetch,
  otherFetch: anime.fetch,
};
