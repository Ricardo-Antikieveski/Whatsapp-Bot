use actix_web::{post, web, App, HttpServer, Responder, HttpResponse};
use serde::{Serialize, Deserialize};

#[derive(Deserialize)]
struct MessageRequest{
    chat_id: String,
    message: String,
}

#[derive(Serialize)]
struct BotResponse{
    response: String,
}

#[post("/sendMessage")]
async fn receive_message(body: web::Json<MessageRequest>) -> impl Responder
{
    let receive_text = body.message.trim();
    println!("Nova mensagem de {}: {}", body.chat_id, receive_text);

    let response = if receive_text.to_lowercase().contains("pelicula"){
        "Temos película sim! R$ 20,00".to_string()
    }else{
        "Desculpa, não entendi sua mensagem 😅".to_string()
    };

    HttpResponse::Ok().json(BotResponse{response})
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Servidor iniciado em http://localhost:8080");

    HttpServer::new(|| {
        App::new()
            .service(receive_message)
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}