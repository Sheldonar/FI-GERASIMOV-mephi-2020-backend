import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'line-up',
})
export class LineUp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  style: string;

  @Column({
    type: 'number',
    length: 255,
  })
  rating: number;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
