import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Collaborator } from '@saas-template/database';
import type { CreateCollaboratorDto, UpdateCollaboratorDto } from '@saas-template/core';

@Injectable()
export class CollaboratorsRepository extends Repository<Collaborator> {
  constructor(private dataSource: DataSource) {
    super(Collaborator, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Collaborator[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Collaborator | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateCollaboratorDto): Promise<Collaborator> {
    const collaborator = this.create({
      ...dto,
      userId,
    });
    return this.save(collaborator);
  }

  async update(id: string, userId: string, dto: UpdateCollaboratorDto): Promise<Collaborator | null> {
    const collaborator = await this.findById(id, userId);
    if (!collaborator) {
      return null;
    }

    Object.assign(collaborator, dto);
    return this.save(collaborator);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const collaborator = await this.findById(id, userId);
    if (!collaborator) {
      return false;
    }

    await this.softRemove(collaborator);
    return true;
  }
}
