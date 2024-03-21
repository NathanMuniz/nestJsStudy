import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Mongoose } from 'mongoose';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  async createNewUser(newUser: CreateUserDto): Promise<User>  {

    if (this.isValidEmail(newUser.email))
    

  }

  isValidEmail(email: string)
  {
    if(email){
      var re = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/; 
      return re.test(email);
    }else return false
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
