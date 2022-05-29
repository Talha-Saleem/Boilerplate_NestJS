import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JobDtoReq } from '../dto/request/request.job.dto';
import { JobDtoRes } from '../dto/response/response.job.dto';
import { JobsService } from '../service/jobs.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { Job } from '../model/job.model';

@UseGuards(AuthGuard)
@ApiTags('Jobs')
@Controller('Jobs')
export class JobsController {
  constructor(private JobsService: JobsService) {}

  @ApiOkResponse({ type: JobDtoRes, isArray: true })
  @ApiBearerAuth()
  @Get()
  getJobs(): Promise<JobDtoRes[]> {
    return this.JobsService.findAll();
  }

  @ApiOkResponse({ type: Job })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiBearerAuth()
  @Get(':id')
  getJobsById(@Param('id') id: string): Promise<JobDtoRes> {
    return this.JobsService.findById(id);
  }

  @UseGuards(AdminRoleGuard)
  @ApiCreatedResponse({ type: String })
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Post()
  createJob(@Body() body: JobDtoReq): Promise<void> {
    return this.JobsService.createJob(body);
  }

  @UseGuards(AdminRoleGuard)
  @ApiOkResponse({ type: String })
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Put(':id')
  updateJob(@Param('id') id: string, @Body() body: JobDtoReq): Promise<void> {
    return this.JobsService.updateJob(id, body);
  }

  @UseGuards(AdminRoleGuard)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @Delete(':id')
  deleteJob(@Param('id') id: string): Promise<void> {
    return this.JobsService.deleteJob(id);
  }
}
