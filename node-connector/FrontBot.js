const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer:{
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

    // ignora mensagens de status/broadcast
    if (msg.from === "status@broadcast" || msg.from.endsWith("@broadcast"))
    {
        return;
    }

    const chatId = msg.from;
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

        // Envia de volta para o WhatsApp
        await client.sendMessage(chatId, responseBot);
        console.log(`Resposta Enviada: ${responseBot}`);
    } catch (err) {
        console.error("Erro ao se comunicar com o servidor Rust:", err.message);
    }
});

// Inicializa o Cliente
client.initialize();
