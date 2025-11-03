import { api } from '@/lib/api';
import type { CollaboratorResponseDto, CreateCollaboratorDto, UpdateCollaboratorDto } from '@saas-template/core';

export const collaboratorsService = {
  async getAll(): Promise<CollaboratorResponseDto[]> {
    const response = await api.get('/collaborators');
    return response.data;
  },

  async getById(id: string): Promise<CollaboratorResponseDto> {
    const response = await api.get(`/collaborators/${id}`);
    return response.data;
  },

  async create(data: CreateCollaboratorDto): Promise<CollaboratorResponseDto> {
    const response = await api.post('/collaborators', data);
    return response.data;
  },

  async update(id: string, data: UpdateCollaboratorDto): Promise<CollaboratorResponseDto> {
    const response = await api.put(`/collaborators/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/collaborators/${id}`);
  },
};
