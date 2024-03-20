import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Mongoose } from 'mongoose';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>){}


  create(createUserDto: CreateUserDto) {

    try {
      this.userModel.create(createUserDto);
    }
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
