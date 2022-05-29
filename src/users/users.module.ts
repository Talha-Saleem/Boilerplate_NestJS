import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { FirebaseModule } from '../firebase';

@Module({
  imports: [FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
