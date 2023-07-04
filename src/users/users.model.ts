import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from '../posts/posts.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный ID' })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@email.com', description: 'Email' })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '*****', description: 'Password' })
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'Is banned or not' })
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Хулиган', description: 'Reason banned' })
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasMany(() => Post)
    posts: Post[];
}
