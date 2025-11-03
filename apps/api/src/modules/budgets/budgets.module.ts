import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetsRepository } from './budgets.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget]),
    DatabaseModule,
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetsRepository],
  exports: [BudgetsService],
})
export class BudgetsModule {}
