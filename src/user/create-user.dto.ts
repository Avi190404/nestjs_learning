import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class userDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message: "Password must be atleast 6 characters long"})
    password: string;

    @IsString()
    @IsNotEmpty()
    roleName: string;
}

export class signInDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message: "Password must be atleast 6 characters long"})
    password: string;
}