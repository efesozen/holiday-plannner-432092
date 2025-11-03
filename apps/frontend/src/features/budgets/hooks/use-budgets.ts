import type { CreateBudgetDto, UpdateBudgetDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { budgetsService } from '../services';

const BUDGET_KEY = ['budgets'];

export function useBudgets() {
  return useQuery({
    queryKey: BUDGET_KEY,
    queryFn: () => budgetsService.getAll(),
  });
}

export function useBudget(id: string) {
  return useQuery({
    queryKey: [...BUDGET_KEY, id],
    queryFn: () => budgetsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBudgetDto) => budgetsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEY });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBudgetDto }) =>
      budgetsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEY });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => budgetsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BUDGET_KEY });
    },
  });
}
