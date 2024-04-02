import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { registerUserDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
=
@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) userRepositoy: User){}


  async isValidaEmail(email: string){

    const emailExist = await this.userRepositoy.findOne({where: {email}});

    if (emailExist){
      return false;
    }

    return email;

  }

  async registerUser(registerUserData: registerUserDto) {

    const validEmail = await this.isValidaEmail(registerUserData.email);
    
    if (!validEmail){
      throw new  BadRequestException('Invlaid Email or Already Exists.')
    }

    const user = new User();

    user.password = bcrypt.hash(registerUserData.password);
    user.email = registerUserData.email;
    user.surname = registerUserData.surname;
    user.name = registerUserData.name;

    const userEntity = this.userRepositoy.create(user);
    const result = this.userRepositoy.save(userEntity);

    if (!result){
      throw new InternalServerErrorException('Erro ao registar usuários. Tente novamente mais tarde.')
    }



    return { ...result };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
