import { Request, Response } from 'express';

function errorHandler(err: Error, req: Request, res: Response) {
    console.error(err.stack);
    res.status(500).send('Ocorreu um erro na execução!');
}

export default errorHandler;
