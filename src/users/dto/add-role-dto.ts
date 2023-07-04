import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddRoleDto {

    @ApiProperty({example: '1', description: 'Id пользователя'})
    @IsNumber({}, { message: 'Должен быть числом'})
    public readonly userId: number;

    @ApiProperty({example: 'USER', description: 'Новая роль пользователя'})
    @IsString({ message: 'Должен быть строкой' })
    public readonly value: string;
}
