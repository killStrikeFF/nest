import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({example: 'user@email.com', description: 'Email' })
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, { message: 'Должен быть валидный email'})
    readonly email: string;

    @ApiProperty({example: '******', description: 'User Password' })
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
    readonly password: string;
}
