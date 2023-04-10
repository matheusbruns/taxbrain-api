const express = require('express'); // Importa o módulo do Express
const app = express(); // Cria uma instância do Express
require('./config/dbConfig');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const routes = require('./routes');

var path = require('path');









const PORT = 5000; // Define a porta na qual o servidor deve escutar

app.use(session({ secret: 'kasdakhdjakdajhkjhaksdjhakdjhakdjhkajhsd' }));
app.use(express.json());
app.use(routes);
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
