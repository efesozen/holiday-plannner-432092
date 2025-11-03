import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateCollaboratorDto, CollaboratorResponseDto, UpdateCollaboratorDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CollaboratorsService } from './collaborators.service';

@Controller('collaborators')
@UseGuards(JwtAuthGuard)
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<CollaboratorResponseDto[]> {
    return this.collaboratorsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateCollaboratorDto,
    @CurrentUser() user: User
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCollaboratorDto,
    @CurrentUser() user: User
  ): Promise<CollaboratorResponseDto> {
    return this.collaboratorsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.collaboratorsService.remove(id, user.id);
  }
}
