import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'line-up',
})
export class LineUp {

  constructor(name: string, style: string, description: string, rating: number) {
    this.name = name;
    this.style = style;
    this.description = description;
    this.rating = rating;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  style: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
