import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '@app/logger/logger.service';

export const MAX_RESPONSE_BODY_LENGTH_TO_LOG = 5128;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info('New request has come', {
      extra: {
        request: {
          ip: req.ip,
          url: req.url,
          headers: req.headers,
          method: req.method,
          query: req.query,
          body: req.body,
        },
      },
    });

    const oldWrite = res.write;

    const oldEnd = res.end;

    const chunks = [];

    res.write = function(chunk) {
      chunks.push(chunk);

      return oldWrite.apply(res, arguments);
    };

    res.end = function(chunk) {
      if (chunk) {
        chunks.push(chunk);
      }

      oldEnd.apply(res, arguments);
    };

    res.on('finish', () => {
      let body;

      try {
        body = Buffer.concat(chunks).toString();
      } catch (e) {
        body = chunks[0];
      }

      let bodyToLog;

      try {
        bodyToLog = JSON.parse(body);
      } catch (e) {
        bodyToLog = body;
      }

      this.logger.info('Made the response', {
        extra: {
          response: {
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            body: bodyToLog.length > MAX_RESPONSE_BODY_LENGTH_TO_LOG ? `Too big body! ${MAX_RESPONSE_BODY_LENGTH_TO_LOG} symbols max` : bodyToLog,
          },
        },
      });
    });

    next();
  }
}
