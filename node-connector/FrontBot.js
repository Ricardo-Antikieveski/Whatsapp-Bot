const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const pausedChats = new Map();

// Função para pausar o bot para um chat específico
function pauseBotForChat(chatId, minutes) {
    if (pausedChats.has(chatId)) {
        clearTimeout(pausedChats.get(chatId));
    }

    const timeout = setTimeout(() => {
        pausedChats.delete(chatId);
        console.log(`Bot reativado para ${chatId}`);
    }, minutes * 60 * 1000);

    pausedChats.set(chatId, timeout);
}

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: ['--start-maximized']
    }
});

// Gera o QR Code para conectar
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Quando conectar
client.on('ready', () => console.log("✅ Whatsapp conectado."));

// Quando receber mensagem no whatsapp
client.on('message', async (msg) => {
    const chatId = msg.from;

    // ignora mensagens de status/broadcast e grupos
    if (chatId === "status@broadcast" || chatId.endsWith("@broadcast") || chatId.endsWith("@g.us")) {
        return;
    }

    // Se o chat estiver pausado, ignora
    if (pausedChats.has(chatId)) {
        console.log(`Bot pausado para ${chatId}`);
        return;
    }

    const text = msg.body;
    console.log(`Mensagem Recebida de ${chatId}: ${text}`);

    try {
        // Envia mensagem pro servidor Rust
        const result = await axios.post('http://127.0.0.1:8080/sendMessage', {
            chat_id: chatId,
            message: text
        });

        // Rust responde com JSON { response: "..." }
        const responseBot = result.data.response;

        if (responseBot) {
            // Envia de volta para o WhatsApp
            await client.sendMessage(chatId, responseBot);
            console.log(`Resposta Enviada: ${responseBot}`);
        }
    } catch (err) {
        console.error("Erro ao se comunicar com o servidor Rust:", err.message);
    }
});

// Pausa o bot se você enviar uma mensagem manual
client.on('message_create', (msg) => {
    if (msg.fromMe) {
        const chatId = msg.to; // ID do destinatário
        pauseBotForChat(chatId, 5); // pausa por 5 minutos
        console.log(`Bot pausado para ${chatId} por 5 minutos`);
    }
});

// Inicializa o Cliente
client.initialize();
