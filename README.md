# 🤖 Bot Launcher para Minecraft con Mineflayer

Este proyecto lanza múltiples bots de Minecraft usando [Mineflayer](https://github.com/PrismarineJS/mineflayer), con soporte para reconexión automática, combate y pathfinding. Puedes configurar múltiples cuentas fácilmente desde un archivo.

---

## 📦 Instalación

Primero, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego abre la terminal en esta carpeta (`Botito/`) y ejecuta:
```bash
npm install
```

## ⚙️ Configuración Inicial

Antes de iniciar los bots, abre el archivo:
```bash
src/launcher.js
```
Y modifica estas líneas según tu caso:
```js
const HOST = 'localhost'; // Si el servidor está en tu misma PC, déjalo así.
// Si es remoto, reemplaza 'localhost' con la IP del servidor.

const PORT = 25565; // ← Cambia este número por el puerto de tu servidor.
const INTERVAL = 5000; // Tiempo entre cada bot (en milisegundos)
const RECONNECT_DELAY = 8000; // Tiempo para reconectar si se desconecta
```

## 👥 Añadir Usuarios

⚠️ **No hay límite de cuentas (que yo sepa)**, así que puedes agregar cuantas quieras, **una por línea** en el archivo `account.txt`.

Si estás usando autenticación offline (`auth: 'offline'`), el `:password` puede dejarse vacío o simplemente usarse como identificador.

---

Los bots usan una lista de usuarios que se encuentran en el archivo:
```
account.txt
```

Cada línea representa una cuenta, usando el formato:

```makefile
username:password
```

## 📁 Estructura del Proyecto
```lua
bots/
├── node_modules/
├── src/
│   ├── bot.js
│   ├── launcher.js
│   └── configs/
│       ├── babel.config.js
│       └── jest.config.js
├── test/
│   └── test.js
├── account.txt ← Aquí van tus usuarios
├── .gitignore
├── .version
├── files.txt
├── package.json
└── package-lock.json
```

## 🧠 Dependencias Clave
```json
"dependencies": {
  "mineflayer": "4.29.0",
  "mineflayer-pathfinder": "2.4.5",
  "mineflayer-pvp": "1.3.2"
}
```
## 🧪 Scripts
Este proyecto se puede iniciar con:
```bash
npm run start
```
## Bot commands
para que el bot entienda los comandos tienes que hacer esto:
```bash
/tell botito $goto x y z

/tell botito $attack player

/tell botito $stop

/tell botito $say hole
/tell botito $say /tpa player

/tell botito $end
```
$goto xyz es para ir a esas cord caminando

$attack player es para atacar a ese jugador lo persige hasta matarlo o hasta el bot morir

$stop para todas las acciones que este acciendo tipo attackar o ir a unas cord 

$say es para decir algo o ejecutar algo en el chat 

$end apaga el bot lo reinicia 

## ✍️ Autor
Hecho por [**OceanicTech**]

¡Listo para conquistar servidores! 😎🔥
```go
¿Quieres que lo guarde directamente en un archivo llamado `README.md` o prefieres que te lo empaquete con todo el proyecto?
```

## Extras
Para que no te salga este error 

```bash

```
en la carpeta `node_modules/mineflayer-pvp/lib/PVP.js` busca esta linea
```js
        this.bot.on('physicTick', () => this.update());
```
cambia eso por esto
```js
        this.bot.on('physicsTick', () => this.update());
```
