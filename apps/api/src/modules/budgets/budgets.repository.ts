import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Budget } from '@saas-template/database';
import type { CreateBudgetDto, UpdateBudgetDto } from '@saas-template/core';

@Injectable()
export class BudgetsRepository extends Repository<Budget> {
  constructor(private dataSource: DataSource) {
    super(Budget, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Budget[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Budget | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateBudgetDto): Promise<Budget> {
    const budget = this.create({
      ...dto,
      userId,
    });
    return this.save(budget);
  }

  async update(id: string, userId: string, dto: UpdateBudgetDto): Promise<Budget | null> {
    const budget = await this.findById(id, userId);
    if (!budget) {
      return null;
    }

    Object.assign(budget, dto);
    return this.save(budget);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const budget = await this.findById(id, userId);
    if (!budget) {
      return false;
    }

    await this.softRemove(budget);
    return true;
  }
}
