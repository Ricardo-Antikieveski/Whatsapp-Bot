import { initConnection, OpenToURL } from './whatsapp-connection/nav-connection.js';

async function main() {
    await initConnection(false);
    await OpenToURL('https://web.whatsapp.com/');
}

main().catch(console.error);