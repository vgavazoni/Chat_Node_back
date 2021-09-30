const express = require('express')
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Endereço permitido qqum
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors()); // se não der pau
    next();  // próximo
})
 
app.get('/', function (req, res) {
  res.send('Hello World ehehe')
})


 
var server = app.listen(8080, ()=> {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
    
});

server = process.env.PORT || 8080;




io = socket(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {  // Para cada user eu to gerando uma ID
    console.log(socket.id);

    socket.on("sala_conectar", (dados) => {
        console.log("Sala selecionada: " + dados);
        socket.join(dados); // fazendo a conexão da mesma sala com o front
    });

    socket.on("enviar_mensagem", (dados) => {
        console.log(dados);
        socket.to(dados.sala).emit("receber_mensagem", dados.conteudo); // isso é um broadcast, todos da sala devem receber a msg
    });
});