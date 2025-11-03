import { api } from '@/lib/api';
import type { BudgetResponseDto, CreateBudgetDto, UpdateBudgetDto } from '@saas-template/core';

export const budgetsService = {
  async getAll(): Promise<BudgetResponseDto[]> {
    const response = await api.get('/budgets');
    return response.data;
  },

  async getById(id: string): Promise<BudgetResponseDto> {
    const response = await api.get(`/budgets/${id}`);
    return response.data;
  },

  async create(data: CreateBudgetDto): Promise<BudgetResponseDto> {
    const response = await api.post('/budgets', data);
    return response.data;
  },

  async update(id: string, data: UpdateBudgetDto): Promise<BudgetResponseDto> {
    const response = await api.put(`/budgets/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/budgets/${id}`);
  },
};
