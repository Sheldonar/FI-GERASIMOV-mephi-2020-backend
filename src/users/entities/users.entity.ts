import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UsersService } from '@app/users/users.service';

@Entity({
  name: 'users',
})
export class Users extends BaseEntity{

  private readonly usersService: UsersService;

  constructor(login: string, password: string) {
    super();
    this.login = login;
    this.password = this.usersService.encryptSHA256(password);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 20,
  })
  login: string;

  @Column()
  password: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;
}
