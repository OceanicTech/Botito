// test.js

const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const pvp = require('./mineflayer-pvp/lib').plugin;

const bot = mineflayer.createBot({
  host: 'localhost', // o IP de tu servidor
  port: 25565,        // cambia si tu server tiene otro puerto
  username: 'TestBot',
  version: '1.12.2',  // asegúrate que sea la misma que el server
  auth: 'offline'
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp);

bot.once('spawn', () => {
  console.log('✅ El bot se conectó correctamente.');
  bot.chat('Hola, mundo! Estoy vivo 🧠');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  
  if (message === 'ven') {
    const player = bot.players[username];
    if (!player?.entity) {
      bot.chat('No te veo 😢');
      return;
    }

    const goal = new goals.GoalFollow(player.entity, 1);
    bot.pathfinder.setMovements(new Movements(bot));
    bot.pathfinder.setGoal(goal, true);
    bot.chat('¡Voy pa’llá, bro!');
  }

  if (message === 'pelea') {
    const entity = bot.nearestEntity(e => e.type === 'mob');
    if (entity) {
      bot.chat('¡A pelear, hijuepu...!');
      bot.pvp.attack(entity);
    } else {
      bot.chat('No veo a nadie para pelear 😴');
    }
  }
});
