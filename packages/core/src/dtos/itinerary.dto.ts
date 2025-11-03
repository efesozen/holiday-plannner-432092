import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateItineraryDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDate()
  start_date!: Date;

  @IsDate()
  end_date!: Date;
}

export class UpdateItineraryDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;

  @IsOptional()
  @IsDate()
  start_date?: Date | undefined;

  @IsOptional()
  @IsDate()
  end_date?: Date | undefined;
}

export class ItineraryResponseDto {
  id!: string;
  user_id!: string;
  title!: string;
  description?: string;
  start_date!: Date;
  end_date!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
