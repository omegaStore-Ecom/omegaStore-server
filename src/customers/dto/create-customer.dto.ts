import {  IsString, MaxLength, MinLength ,isNumber ,isEmail, isString} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @MinLength(8, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    password: string;

    @MaxLength(35, { message: 'Name is too short ' })
    email:string

    @MinLength(10, { message: 'number phone should be 10' })
    @MaxLength(10, { message: 'number phone should be 10' })
    phone: number;

    @IsString()
    @MinLength(4, { message: 'Name is too short ' })
    @MaxLength(10, { message: 'Name is too long ' })
    name: string;

    
    @IsString()
    @MinLength(4, { message: 'Name is too short ' })
    @MaxLength(7, { message: 'Name is too long ' })
    username: string;

    @IsString()
    country: string;

    @IsString()
    state: string;

    @IsString()
    city: string;

   



}
