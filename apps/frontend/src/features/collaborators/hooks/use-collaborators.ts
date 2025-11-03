import type { CreateCollaboratorDto, UpdateCollaboratorDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collaboratorsService } from '../services';

const COLLABORATOR_KEY = ['collaborators'];

export function useCollaborators() {
  return useQuery({
    queryKey: COLLABORATOR_KEY,
    queryFn: () => collaboratorsService.getAll(),
  });
}

export function useCollaborator(id: string) {
  return useQuery({
    queryKey: [...COLLABORATOR_KEY, id],
    queryFn: () => collaboratorsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCollaborator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCollaboratorDto) => collaboratorsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLABORATOR_KEY });
    },
  });
}

export function useUpdateCollaborator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCollaboratorDto }) =>
      collaboratorsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLABORATOR_KEY });
    },
  });
}

export function useDeleteCollaborator() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => collaboratorsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLABORATOR_KEY });
    },
  });
}
