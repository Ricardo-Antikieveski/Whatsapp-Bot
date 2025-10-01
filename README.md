# 🤖 WhatsApp Bot: Rust Server + Node.js

> Um bot modular para WhatsApp, integrando Node.js e Rust com comunicação assíncrona via JSON.

---

##  Visão Geral

Este projeto é um **bot de WhatsApp** que processa mensagens privadas de usuários. Ele combina:

* **Node.js + whatsapp-web.js**: captura mensagens do WhatsApp e envia respostas.
* **Servidor Rust + Actix Web**: processa as mensagens recebidas, aplica regras e gera respostas.
* **JSON**: padrão de comunicação entre Node.js e Rust.

O bot **ignora grupos e broadcasts**, focando em mensagens privadas, e é modular para facilitar futuras melhorias e integrações.

---

## 🛠 Tecnologias

* **Node.js** – Bot e interface com WhatsApp
* **TypeScript (opcional)** – Tipagem e organização
* **whatsapp-web.js** – API de automação do WhatsApp
* **Axios** – Comunicação HTTP com o servidor Rust
* **Rust + Actix Web** – Servidor de processamento de mensagens
* **JSON** – Formato padrão de requisições e respostas

---

## 🧱 Arquitetura

| Componente           | Função                                                                           |
| -------------------- | -------------------------------------------------------------------------------- |
| **Bot Node.js**      | Conecta ao WhatsApp, filtra mensagens, envia para Rust e recebe respostas        |
| **Servidor Rust**    | Processa mensagens, aplica regras (palavras-chave, comandos) e retorna respostas |
| **Comunicação JSON** | `{ chat_id, message } → { response }`                                            |

---

## 📌 Status Atual ✅

* [x] Node.js conecta ao WhatsApp e gera QR Code para autenticação
* [x] Filtra mensagens de **broadcast/status**
* [x] Filtra mensagens de **grupos** (opcional)
* [x] Envia mensagens privadas para o servidor Rust
* [x] Servidor Rust processa mensagens e gera respostas em JSON
* [x] Node.js envia a resposta de volta ao WhatsApp
* [x] Verifica se úsuario mandou mensagem e da um block bot por 5 minutos
---

## 🔜 Próximos Passos 🚀

* [ ] Criar respostas dinâmicas baseadas em comandos ou palavras-chave
* [ ] Suporte a múltiplos chats simultâneos (fila de mensagens)
* [ ] Integração com base de dados ou planilhas para respostas automáticas
* [ ] Logs avançados e monitoramento de mensagens
* [ ] Extensão para grupos (opcional)

---

## 🗺️ Fluxo do Bot

```
Usuário WhatsApp (privado)
        │
        ▼
Node.js (bot)
- Ignora broadcast/grupos
- Envia JSON para Rust
        │
        ▼
Servidor Rust
- Recebe JSON
- Processa mensagem
- Gera JSON de resposta
        │
        ▼
Node.js
- Recebe resposta JSON
- Envia mensagem de volta ao usuário
```

---

## 🎯 Objetivos do Projeto

* Criar um bot **modular, assíncrono e escalável**
* Aprender integração entre **Node.js e Rust**
* Implementar lógica de decisão simples e extensível
* Criar base para **comandos dinâmicos e IA futura**

---

## 👨‍💻 Autor

**Ricardo Antikieveski**
🔧 Desenvolvedor autodidata focado em Rust, Node.js e automação
📧 [antikieveski.ricardo@gmail.com](mailto:antikieveski.ricardo@gmail.com)
📷 [Instagram: @_ricardoan](https://www.instagram.com/_ricardoan/)

---

## 📝 Licença

Privado e acadêmico. Entre em contato para permissões ou colaborações.
