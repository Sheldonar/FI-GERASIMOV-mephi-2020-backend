import {InjectRepository} from '@nestjs/typeorm';
import {LineUp} from '@app/line-up/entities/line-up.entity';
import {Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineUpService {
  constructor(
    @InjectRepository(LineUp)
    private readonly LineUpRepository: Repository<LineUp>,
  ) {}

  public async createDj(name: string, style: string, description: string, rating: number): Promise<LineUp> {
    const dj: LineUp = new LineUp(name, style, description, rating);
    await this.LineUpRepository.save(dj);
    return dj;
  }

  public async getAllLineUp(): Promise<LineUp[]> {
    return await this.LineUpRepository.find();
  }

  public async getDjByName(djName: string): Promise<LineUp> {
    return await this.LineUpRepository.findOne({name: djName});
  }

   // public async getDjByStyle(djStyles: string): Promise<LineUp[]> {
   //   return await this.LineUpRepository.find(select ["style"]);
   // } TODO: fix this shit

  public async updateDj(newName: string, oldName: string, newStyle: string, newDescription: string, newRating: number): Promise<LineUp> {
    const dj: LineUp = await this.getDjByName(oldName);
    dj.name = newName;
    dj.description = newDescription;
    dj.style = newStyle;
    dj.rating = newRating;
    return dj;
  }

  public async deleteDj(djName: string): Promise<void> {
    const dj: LineUp =  await this.getDjByName(djName);
    await this.LineUpRepository.remove(dj);
  }

}
