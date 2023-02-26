// Importando Bibliotecas
import Config from './includes/config/clientSettings';
import express, { Request, Response } from 'express';
import errorHandler from './modules/ErrorHandler';
import client from './modules/DiscordConnect';
import path from 'path';

// Variáveis Globais
const Client = express();

// Configurando o Client para renderizar as páginas
Client.set('view engine', 'ejs');
Client.set('views', path.join(__dirname, 'views'));
Client.use(express.static('public'));
Client.use(errorHandler); // Handler para erros relacionados ao Node.js

// Configurando a rota principal
Client.get('/', (req: Request, res: Response) => {
    res.render('index');
});

// Ligando o Servidor Express
Client.listen(Config.Porta, () => {
    console.log(`Servidor Iniciado [Porta: ${Config.Porta}]`);
});

