import { Injectable } from '@nestjs/common';
import { UserDtoReq } from '../dto/request/request.user.dto';
import { UserDtoRes } from '../dto/response/response.user.dto';
import { UserDtoV1Res } from '../dto/response/response.user-v1.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private user: UserRepository) {}

  async findAll(name: string): Promise<UserDtoV1Res[]> {
    return this.user.findAll(name);
  }

  async findById(id: string): Promise<UserDtoRes> {
    return this.user.findById(id);
  }

  async createUser(body: UserDtoReq): Promise<void> {
    return this.user.createUser(body);
  }

  async updateUser(id: string, body: UserDtoReq): Promise<void> {
    return this.user.updateUser(id, body);
  }

  async deleteUser(id: string): Promise<void> {
    return this.user.deleteUser(id);
  }
}
