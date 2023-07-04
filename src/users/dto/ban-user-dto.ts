import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({example: '1', description: 'Id пользователя'})
    public readonly userId: number;

    @ApiProperty({example: 'Хулиган', description: 'Причина бана'})
    public readonly banReason: string;
}
