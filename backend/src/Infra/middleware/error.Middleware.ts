import { NextFunction, Request, Response } from 'express';
import { HTTPExceptions } from '../../types/HTTPExceptions';

export function errorMiddleware(
  err: HTTPExceptions,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(err.status).json({
    status: err.status,
    message: err.message || 'Internal server error',
  });
}