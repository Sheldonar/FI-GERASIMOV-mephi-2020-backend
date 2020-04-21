import { Response } from 'express';

export interface IRestFilter {
  handle(err: any, res: Response): void;
}
