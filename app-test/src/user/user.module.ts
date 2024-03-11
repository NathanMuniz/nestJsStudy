import { Module } from '@nestjs/common';,
import { TypeOrmModule } from '@nestjs/typeorm';

import { IdeaEntity } from '../idea/idea.entity';
import { CommentEntity } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserResolver } from './user.resolver';


@Module({
    imports: [TypeOrmModule.forFeatur([UserEntity, IdeaEntity, CommentEntity])],
    controllers: [UserController],
    providers: [UserService, UserResolver, CommentService]
})