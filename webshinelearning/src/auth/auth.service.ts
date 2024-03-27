import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDTO } from './dto/register-auth.dto';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { bcrypt } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(AuthEntity) private repositoy: Repository<AuthEntity>
  ){}

  async register(registerData: RegisterDTO) {

    let emailExits = await this.repositoy.find({
      where: {email: registerData.email}
    })

    if (emailExits){
      throw new ConflictException('Email already exists')
    }


    let user = new AuthEntity;
    user.name = registerData.name;
    user.surname = registerData.surname;
    user.email = registerData.email;
    user.phoneNumber = registerData.phoneNumber;
    user.password =  bcrypt.hash(registerData.password);

    let userIntancy = await this.repositoy.create(user);
    let res = await this.repositoy.save(userIntancy);

    return {
      user : {
        res.name,
      }
    }




  } 

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} au;th`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
