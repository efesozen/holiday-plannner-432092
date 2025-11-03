import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { CollaboratorsController } from './collaborators.controller';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsRepository } from './collaborators.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaborator]),
    DatabaseModule,
  ],
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, CollaboratorsRepository],
  exports: [CollaboratorsService],
})
export class CollaboratorsModule {}
