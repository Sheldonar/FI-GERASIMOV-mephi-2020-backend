import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  hashedPassword: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}