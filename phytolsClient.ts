// Importando Bibliotecas
import { GithubStats } from './includes/Utils/Structures';
import Config from './includes/config/clientSettings';
import express, { Request, Response } from 'express';
import errorHandler from './modules/ErrorHandler';
import client from './modules/DiscordConnect';
import renderCard from './modules/renderCard';
import axios from 'axios';
import path from 'path';

// Variáveis Globais
const Client = express();

// Configurando o Client para renderizar as páginas
Client.set('view engine', 'ejs');
Client.set('views', path.join(__dirname, 'views'));
Client.use(express.static('public'));
Client.use(errorHandler);

// Configurando a rota principal
Client.get('/', (req: Request, res: Response) => {
    res.render('index');
});

Client.get('/api', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    res.status(400).send('O parâmetro "username" é obrigatório');
    return;
  }

  try {
    const [user, repos] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
    ]);

    const stats: GithubStats = {
      username: user.data.login,
      followers: user.data.followers,
      repos: user.data.public_repos,
      stars: repos.data.reduce(
        (acc: number, repo: any) => acc + repo.stargazers_count,
        0,
      ),
      forks: repos.data.reduce(
        (acc: number, repo: any) => acc + repo.forks_count,
        0,
      ),
    };
    
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Length': renderCard.length
    });
    res.end(renderCard);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro ao buscar as estatísticas do GitHub');
  }
});

// Ligando o Servidor Express
Client.listen(Config.Porta, () => {
    console.log(`Servidor Iniciado [Porta: ${Config.Porta}]`);
});

