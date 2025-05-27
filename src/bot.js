const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin;

function createBot({ username, password, host, port }) {
  const bot = mineflayer.createBot({
    host,
    port,
    username,          // cambia el nombre por tu correo de microsoft los nombres estan en accounts.txt
    password,
    version: false,  // cambiar para una version especifica
    // auth: mojang // si quieres usa microsoft para premium
  });

  bot.loadPlugin(pathfinder);
  bot.loadPlugin(pvp);

  let currentGoal = null;
  let hasLogged = false;

  bot.once('spawn', () => {
    console.log(`[${username}] Se conectó al servidor`);

    bot.on('message', (msg) => {
      const text = msg.toString().toLowerCase();

      if (!hasLogged) {
        if (text.includes('register')) {
          hasLogged = true;
          bot.chat(`/register ${password} ${password}`);
          console.log(`[${username}] Se registró`);

          setTimeout(() => bot.chat('/s'), 3000);
        } else if (text.includes('login')) {
          hasLogged = true;
          bot.chat(`/login ${password}`);
          console.log(`[${username}] Se logueó`);

          setTimeout(() => bot.chat('/s'), 3000);
        }
      }
    });
  });

  bot.on('whisper', (from, message) => {
    if (from === bot.username || !message.startsWith('$')) return;
    const [command, ...args] = message.slice(1).split(' ');

    switch (command.toLowerCase()) {
      case 'goto': {
        const [x, y, z] = args.map(Number);
        if (![x, y, z].some(isNaN)) {
          if (currentGoal) bot.pathfinder.setGoal(null);
          currentGoal = new goals.GoalBlock(x, y, z);
          bot.pathfinder.setGoal(currentGoal);
        }
        break;
      }

      case 'attack': {
        const target = args[0];
        const entity = bot.players[target]?.entity;
        if (entity) {
          if (currentGoal) bot.pathfinder.setGoal(null);
          currentGoal = new goals.GoalFollow(entity, 1);
          bot.pathfinder.setGoal(currentGoal, true);
          bot.pvp.attack(entity);
        }
        break;
      }

      case 'stop':
        if (currentGoal) bot.pathfinder.setGoal(null);
        currentGoal = null;
        bot.pvp.stop();
        break;

      case 'say':
        bot.chat(args.join(' '));
        break;

      case 'end':
        bot.quit();
        break;
    }
  });

  bot.on('end', () => {
    console.log(`[${username}] Se desconectó`);
  });

  bot.on('error', (err) => {
    console.error(`[${username}] Error: ${err.message}`);
  });

  return bot;
}

module.exports = { createBot };
