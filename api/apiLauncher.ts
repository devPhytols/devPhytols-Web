// Importando Bibliotecas
import { GithubStats } from '../includes/Utils/Structures';
import errorHandler from '../modules/ErrorHandler';
import renderCard from '../modules/renderCard';
import axios from 'axios';
import express, { Request, Response } from 'express';

// Variáveis Globais para o servidor Express
const API = express();

// Configurações do 
API.use(errorHandler);

// Criando Rota temporária para a API
API.get('/api', async (req, res) => {
    const { username } = req.query;

    // Verifica se argumentos foram fornecidos
    if (!username) {
        res.status(400).send('O parâmetro "username" é obrigatório');
        return;
    }

    // Tenta realizar a execução do código
    try {
        const [user, repos] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://api.github.com/users/${username}/repos`),
        ]);

        // Armazena informações necessárias para a página
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

        res.send(stats);

    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro ao buscar as estatísticas do GitHub');
    }
});

// Ligando o Servidor Express
API.listen(3000, () => {
    console.log(`Servidor Iniciado [Porta: 3000]`);
});
