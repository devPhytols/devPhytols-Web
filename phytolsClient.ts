// Importando Bibliotecas
import express, { Request, Response } from 'express';
import path from 'path';

// Variáveis Globais
const Client = express();
const Port = 80;

// Configurando o Client para renderizar as páginas
Client.set('view engine', 'ejs');
Client.set('views', path.join(__dirname, 'views'));
Client.use(express.static('public'));

// Configurando a rota principal
Client.get('/', (req: Request, res: Response) => {
  res.render('index');
});

// Ligando o Servidor Express
Client.listen(Port, () => {
  console.log(`Servidor Iniciado [Porta: ${Port}]`);
});

