import { IsDate, IsEmail, IsString, IsStrongPassword, minLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: String;

    @IsString()
    surname: String;

    @IsEmail()
    email: String;

    @IsString()
    phone: String;

    @IsDate()
    birthDate: Date;

    @IsString()
    @IsStrongPassword({
        minLength: 0,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 1,

    })
    password: String;

}
