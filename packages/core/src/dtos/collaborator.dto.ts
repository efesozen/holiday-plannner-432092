import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateCollaboratorDto {
  @IsUUID()
  itinerary_id!: string;

  @IsUUID()
  user_id!: string;
}

export class UpdateCollaboratorDto {
  @IsOptional()
  @IsUUID()
  itinerary_id?: string | undefined;

  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;
}

export class CollaboratorResponseDto {
  id!: string;
  itinerary_id!: string;
  user_id!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
