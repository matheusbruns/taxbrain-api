const express = require('express'); // Importa o módulo do Express
const app = express(); // Cria uma instância do Express

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

const PORT = 3000; // Define a porta na qual o servidor deve escutar

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
