const fs = require('fs');
const { createBot } = require('./bot.js');

const HOST = 'localhost'; // Si el servidor está en tu misma PC, déjalo así.
// Si es remoto, reemplaza 'localhost' con la IP del servidor.

const PORT = 25565; // ← Cambia este número por el puerto de tu servidor.
const INTERVAL = 5000; // Tiempo entre cada bot (en milisegundos)
const RECONNECT_DELAY = 8000; // Tiempo para reconectar si se desconecta

let index = 0;

const accounts = fs.readFileSync('./accounts.txt', 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line, i) => {
    const [username, password] = line.split(':');
    if (!username || !password) {
      console.warn(`[Línea ${i + 1}] Cuenta inválida: "${line}"`);
      return null;
    }
    return { username, password };
  })
  .filter(Boolean);

if (accounts.length === 0) {
  console.error('❌ No hay cuentas válidas en accounts.txt');
  process.exit(1);
}

function startNextBot() {
  if (index >= accounts.length) {
    console.log('✅ Todos los bots han sido lanzados.');
    return;
  }

  const { username, password } = accounts[index];
  console.log(`🟢 Lanzando bot ${index + 1}/${accounts.length}: ${username}`);

  try {
    const bot = createBot({ username, password, host: HOST, port: PORT });

    bot.on('end', () => {
      console.warn(`[${username}] Desconectado. Intentando reconectar en ${RECONNECT_DELAY / 10000}s...`);
      setTimeout(() => {
        console.log(`[${username}] Reconectando...`);
        startBotAgain(username, password);
      }, RECONNECT_DELAY);
    });

    bot.on('error', (err) => {
      console.error(`[${username}] Error: ${err.message}`);
    });

  } catch (err) {
    console.error(`❌ Error creando bot "${username}": ${err.message}`);
  }

  index++;
  setTimeout(startNextBot, INTERVAL);
}

function startBotAgain(username, password) {
  try {
    const bot = createBot({ username, password, host: HOST, port: PORT });

    bot.on('end', () => {
      console.warn(`[${username}] Desconectado. Reintentando reconexión en ${RECONNECT_DELAY / 10000}s...`);
      setTimeout(() => startBotAgain(username, password), RECONNECT_DELAY);
    });

    bot.on('error', (err) => {
      console.error(`[${username}] Error: ${err.message}`);
    });

  } catch (err) {
    console.error(`❌ Error recreando bot "${username}": ${err.message}`);
  }
}

startNextBot();
