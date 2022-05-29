import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserDtoReq } from '../dto/request/request.user.dto';
import { UsersService } from '../service/users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { UserDtoV1Res } from '../dto/response/response.user-v1.dto';
import { User } from '../model/user.model';

@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ type: UserDtoV1Res, isArray: true })
  @ApiQuery({ name: 'name', required: false })
  @ApiBearerAuth()
  @Get()
  getUsers(
    @Query('name', new DefaultValuePipe('')) name: string
  ): Promise<UserDtoV1Res[]> {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @Get(':id')
  getUsersById(@Param('id') id: string): Promise<UserDtoReq> {
    const resEmail = this.usersService.findById(id);
    return resEmail;
  }

  @UseGuards(AdminRoleGuard)
  @ApiCreatedResponse({ type: String })
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Post()
  createUser(@Body() body: UserDtoReq): Promise<void> {
    return this.usersService.createUser(body);
  }

  @UseGuards(AdminRoleGuard)
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UserDtoReq): Promise<void> {
    return this.usersService.updateUser(id, body);
  }

  @UseGuards(AdminRoleGuard)
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
