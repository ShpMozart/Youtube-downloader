const fs = require("fs");
const ytdl = require("ytdl-core");
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf("5383942758:AAGJI19C3RDAdijgXPYejT6bRLkaY0gn-Vo");

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(ctx.chat.id, "Send me your url 😾", {});
});
bot.on("message", (ctx) => {
  const url = ctx.message.text;
  ytdl(url, {
    quality: "18",
  })
    .pipe(fs.createWriteStream(`${ctx.from.id}.mp4`))
    .on("finish", () => {
      ctx.replyWithVideo({ source: `${ctx.from.id}.mp4` });
    });

  bot.telegram.sendMessage(ctx.chat.id, "loading.... 🐢", {});
});
bot.launch();
