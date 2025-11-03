import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateCollaboratorTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'collaborators',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'itinerary_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        name: 'fk_collaborators_itinerary_id',
        columnNames: ['itinerary_id'],
        referencedTableName: 'itineraries',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'collaborators',
      new TableForeignKey({
        name: 'fk_collaborators_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'collaborators',
      new TableIndex({
        name: 'idx_collaborators_itinerary_id',
        columnNames: ['itinerary_id'],
      })
    );

    await queryRunner.createIndex(
      'collaborators',
      new TableIndex({
        name: 'idx_collaborators_itinerary_id',
        columnNames: ['itinerary_id'],
      })
    );

    await queryRunner.createIndex(
      'collaborators',
      new TableIndex({
        name: 'idx_collaborators_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'collaborators',
      new TableIndex({
        name: 'idx_collaborators_user_id',
        columnNames: ['user_id'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('collaborators', 'idx_collaborators_itinerary_id');
    await queryRunner.dropIndex('collaborators', 'idx_collaborators_user_id');
    await queryRunner.dropForeignKey('collaborators', 'fk_collaborators_itinerary_id');
    await queryRunner.dropForeignKey('collaborators', 'fk_collaborators_user_id');
    await queryRunner.dropTable('collaborators');
  }
}
