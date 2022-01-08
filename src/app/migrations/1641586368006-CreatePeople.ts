/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePeople1641586368006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'people',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'gender',
              enum: ['male', 'female'],
              type: 'varchar',
            },
            {
              name: 'birthdate',
              type: 'timestamp',
            },
            {
              name: 'age',
              type: 'numeric',
            },
            {
              name: 'current_city_id',
              type: 'uuid',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
            },
          ],
          foreignKeys: [
            {
              name: 'fk_people_cities',
              columnNames: ['current_city_id'],
              referencedTableName: 'cities',
              referencedColumnNames: ['id'],
            },
          ],
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('people');
  }
}
