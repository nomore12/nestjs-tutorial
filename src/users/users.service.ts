import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { hashPassword, checkPassword } from './utils/password.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userEntity: Repository<Users>,
  ) {}

  async create(user: Users) {
    const password = await hashPassword(user.password);
    const userData = {
      ...user,
      password,
    };
    console.log(userData);
    const newUser = this.userEntity.create(userData);
    delete userData.password;
    return await this.userEntity.save(newUser);
  }

  async findAll() {
    return await this.userEntity.find();
  }

  async findOne(id: number) {
    return await this.userEntity.findOne({
      where: { id },
    });
  }

  async update(id: number, user: Users) {
    return await this.userEntity.update(id, user);
  }

  async remove(id: number) {
    await this.userEntity.delete(id);
    return id;
  }

  async login(id: number, password: string) {
    const user = await this.userEntity.findOne(id);
    if (await checkPassword(password, user.password)) {
      return '로그인 성공!';
    } else {
      return '비밀번호가 틀렸습니다.';
    }
  }
}
