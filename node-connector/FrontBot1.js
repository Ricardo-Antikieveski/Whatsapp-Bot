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

client.on('qr', (qr) =>{
    qrcode.generate(qr, { small: true });
})

client.on('ready', () => console.log("[AVISO] Whatsapp Conectado com sucesso."));

client.initialize();