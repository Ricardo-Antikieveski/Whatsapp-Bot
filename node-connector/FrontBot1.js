const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const pauseChats = new Map();

function pauseBotForChat(chatId, minutes) {
    // se o chat já está pausado, não faz nada
    if (pausedChats.has(chatId)) {
        console.log(`Chat ${chatId} já está pausado, ignorando...`);
        return;
    }

    const timeout = setTimeout(() => {
        pausedChats.delete(chatId);
        console.log(`Bot reativado para ${chatId}`);
    }, minutes * 60 * 1000);

    pausedChats.set(chatId, timeout);
}

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "bot_test"
    }),
    puppeteer:{
        headless: false,
        args: ['--start-maximized']
    }
});

client.on('qr', (qr) =>{
    qrcode.generate(qr, { small: true });
})

client.on('ready', () => console.log("[AVISO] Whatsapp Conectado com sucesso."));
client.on('message', async (msg) => {

    const chatId = msg.from;

    if(chatId === "status@broadcast" || chatId.endsWith("@broadcast") || chatId.endsWith("@g.us"))
        return;

    const text = msg.body;
    console.log(`Mensagem Recebida de ${chatId}: ${text}`);

    try{

      const result = await axios.post('https://127.0.0.1:8080/sendMessage',{
            chat_id: chatId,
            message:text
      });

      const responseBot = result.data.response;
      const responseIsBot = result.data.responseisbot;

      if(responseBot)
      {
          await client.sendMessage(chatId, responseBot);
          console.log(`Message sent: ${responseBot}`);
      }
    }
    catch (error) {
        console.error(error);
    }

});

client.on('message_create', (msg) => {
    if(msg.fromMe && !msg.body.startsWith("[Resposta Automática]"))
    {
        const chatId = msg.to;
        pauseBotForChat(chatId, 5);
        console.log(`Bot pausado para ${chatId} por 5 minutos`);
    }
})


client.initialize();