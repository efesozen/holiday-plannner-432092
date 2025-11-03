import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateItineraryTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'itineraries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
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
      'itineraries',
      new TableForeignKey({
        name: 'fk_itineraries_user_id',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_user_id',
        columnNames: ['user_id'],
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_start_date',
        columnNames: ['start_date'],
      })
    );

    await queryRunner.createIndex(
      'itineraries',
      new TableIndex({
        name: 'idx_itineraries_end_date',
        columnNames: ['end_date'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('itineraries', 'idx_itineraries_user_id');
    await queryRunner.dropIndex('itineraries', 'idx_itineraries_start_date');
    await queryRunner.dropIndex('itineraries', 'idx_itineraries_end_date');
    await queryRunner.dropForeignKey('itineraries', 'fk_itineraries_user_id');
    await queryRunner.dropTable('itineraries');
  }
}
