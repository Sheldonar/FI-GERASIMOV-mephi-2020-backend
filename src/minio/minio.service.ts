import { Client } from 'minio';
import { Response } from 'express';

export class MinioService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT, 10),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  public async uploadFile(file: Express.Multer.File): Promise<void> {
    await this.client.putObject(process.env.MINIO_BUCKET_NAME, file.originalname, file.buffer);
  }

  public async downloadFile(fileName: string, response: Response): Promise<void> {
    const fileSize = (await this.client.statObject(process.env.MINIO_BUCKET_NAME, fileName)).size;

    response.setHeader('Content-Type', 'application/octet-stream');

    response.setHeader('Content-Length', fileSize);

    (await this.client.getObject(process.env.MINIO_BUCKET_NAME, fileName)).pipe(response);
  }
}
