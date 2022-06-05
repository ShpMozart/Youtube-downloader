const fs = require("fs");
const ytdl = require("ytdl-core");
const Telegraf = require("telegraf").Telegraf;
const bot = new Telegraf("5383942758:AAGJI19C3RDAdijgXPYejT6bRLkaY0gn-Vo");
let clients = {};

bot.command("start", (ctx) => {
  console.log(ctx.from);
  clients += JSON.stringify(ctx.from) + ",";
  bot.telegram.sendMessage(ctx.chat.id, "Send me your url 😾", {});
});
let url = null;
let errorHappened = false;
let waiting = false;

bot.command("mp3", (ctx) => {
  ytdl(url, {
    quality: "140",
  })
    .on("error", (err) => {
      waiting = false;

      console.log(err);
      errorHappened = true;
      bot.telegram.sendMessage(
        ctx.chat.id,
        "Wtf dude send me valid youtube video url 🔪🩸",
        {}
      );
    })
    .pipe(fs.createWriteStream(`${ctx.from.id}.mp3`))
    .on("finish", () => {
      ctx.replyWithAudio({ source: `${ctx.from.id}.mp3` }).then(() => {
        waiting = false;

        fs.unlinkSync(`${ctx.from.id}.mp3`, (err) => {
          console.log(err);
        });
      });
    });
});
bot.command("mp4", (ctx) => {
  ytdl(url, {
    quality: "18",
  })
    .on("error", (err) => {
      waiting = false;

      console.log(err);
      errorHappened = true;
      bot.telegram.sendMessage(
        ctx.chat.id,
        "Wtf dude send me valid youtube video url 🔪🩸",
        {}
      );
    })
    .pipe(fs.createWriteStream(`${ctx.from.id}.mp4`))
    .on("finish", () => {
      waiting = false;

      ctx.replyWithVideo({ source: `${ctx.from.id}.mp4` }).then(() => {
        fs.unlinkSync(`${ctx.from.id}.mp4`, (err) => {
          console.log(err);
        });
      });
    });
});

bot.on("message", (ctx) => {
  if (!waiting) {
    waiting = true;
    ctx.reply("🎙 /mp3 ---- 🎥 /mp4 ");
    url = ctx.message.text;
  } else {
    console.log("----");
  }
});
bot.launch();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Check telegram bot now!");
});
app.get("/mozart_login_bot/fd32ccb9f45155e537f9b4da3d17a282", (req, res) => {
  res.status(200).json(clients);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
