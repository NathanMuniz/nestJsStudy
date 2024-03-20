import { IsDate, IsEmail, IsString, IsStrongPassword, minLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly name: String;

    @IsString()
    readonly surname: String;

    @IsEmail()
    readonly email: String;

    @IsString()
    readonly phone: String;

    @IsDate()
    readonly birthdaydate: Date;

    @IsString()
    @IsStrongPassword({
        minLength: 0,
        minLowercase: 0,
        minNumbers: 1,
        minSymbols: 1,

    })
    password: String;

}
