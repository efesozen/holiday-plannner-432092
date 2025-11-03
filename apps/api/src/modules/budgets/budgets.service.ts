import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateBudgetDto, BudgetResponseDto, UpdateBudgetDto } from '@saas-template/core';
import type { Budget } from '@saas-template/database';
import { BudgetsRepository } from './budgets.repository';

@Injectable()
export class BudgetsService {
  constructor(
    private readonly budgetsRepository: BudgetsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<BudgetResponseDto[]> {
    const budgets = await this.budgetsRepository.findAll(userId);
    return budgets.map((budget: Budget) => this.toResponseDto(budget));
  }

  async findOne(id: string, userId: string): Promise<BudgetResponseDto> {
    const budget = await this.budgetsRepository.findById(id, userId);
    if (!budget) {
      throw new NotFoundException('Budget not found');
    }
    return this.toResponseDto(budget);
  }

  async create(userId: string, dto: CreateBudgetDto): Promise<BudgetResponseDto> {
    return this.uow.execute(async () => {
      const budget = await this.budgetsRepository.create(userId, dto);
      return this.toResponseDto(budget);
    });
  }

  async update(id: string, userId: string, dto: UpdateBudgetDto): Promise<BudgetResponseDto> {
    return this.uow.execute(async () => {
      const budget = await this.budgetsRepository.update(id, userId, dto);
      if (!budget) {
        throw new NotFoundException('Budget not found');
      }
      return this.toResponseDto(budget);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.budgetsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Budget not found');
      }
    });
  }

  private toResponseDto(budget: Budget): BudgetResponseDto {
    return {
      id: budget.id,
      total_amount: budget.total_amount,
      spent_amount: budget.spent_amount,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    };
  }
}
