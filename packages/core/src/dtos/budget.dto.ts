import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateBudgetDto {
  @IsUUID()
  itinerary_id!: string;

  @IsNumber()
  total_amount!: number;

  @IsNumber()
  spent_amount!: number;
}

export class UpdateBudgetDto {
  @IsOptional()
  @IsUUID()
  itinerary_id?: string | undefined;

  @IsOptional()
  @IsNumber()
  total_amount?: number | undefined;

  @IsOptional()
  @IsNumber()
  spent_amount?: number | undefined;
}

export class BudgetResponseDto {
  id!: string;
  itinerary_id!: string;
  total_amount!: number;
  spent_amount!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
