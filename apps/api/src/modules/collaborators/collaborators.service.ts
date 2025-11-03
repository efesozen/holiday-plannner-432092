import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateCollaboratorDto, CollaboratorResponseDto, UpdateCollaboratorDto } from '@saas-template/core';
import type { Collaborator } from '@saas-template/database';
import { CollaboratorsRepository } from './collaborators.repository';

@Injectable()
export class CollaboratorsService {
  constructor(
    private readonly collaboratorsRepository: CollaboratorsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<CollaboratorResponseDto[]> {
    const collaborators = await this.collaboratorsRepository.findAll(userId);
    return collaborators.map((collaborator: Collaborator) => this.toResponseDto(collaborator));
  }

  async findOne(id: string, userId: string): Promise<CollaboratorResponseDto> {
    const collaborator = await this.collaboratorsRepository.findById(id, userId);
    if (!collaborator) {
      throw new NotFoundException('Collaborator not found');
    }
    return this.toResponseDto(collaborator);
  }

  async create(userId: string, dto: CreateCollaboratorDto): Promise<CollaboratorResponseDto> {
    return this.uow.execute(async () => {
      const collaborator = await this.collaboratorsRepository.create(userId, dto);
      return this.toResponseDto(collaborator);
    });
  }

  async update(id: string, userId: string, dto: UpdateCollaboratorDto): Promise<CollaboratorResponseDto> {
    return this.uow.execute(async () => {
      const collaborator = await this.collaboratorsRepository.update(id, userId, dto);
      if (!collaborator) {
        throw new NotFoundException('Collaborator not found');
      }
      return this.toResponseDto(collaborator);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.collaboratorsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Collaborator not found');
      }
    });
  }

  private toResponseDto(collaborator: Collaborator): CollaboratorResponseDto {
    return {
      id: collaborator.id,
      itinerary_id: collaborator.itinerary_id,
      user_id: collaborator.user_id,
      createdAt: collaborator.createdAt,
      updatedAt: collaborator.updatedAt,
    };
  }
}
