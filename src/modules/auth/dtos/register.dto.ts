import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RegisterRequest } from "../interfaces";

export class RegisterDto implements RegisterRequest {
    @ApiProperty({
        type: "string",
        required: true,
        example: "john_old@gmail.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        type: "string",
        required: true,
        example: "+998901233223",
        maxLength: 13,
        minLength: 13,
    })
    @IsPhoneNumber("UZ")
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: "string",
        required: true,
        example: "John Old"
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}