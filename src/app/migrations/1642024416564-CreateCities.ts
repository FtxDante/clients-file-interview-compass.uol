/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner, Table} from 'typeorm';
import {Cities} from '../interfaces/enums/Cities';
export class CreateCities1641584843823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'cities',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'city',
              type: 'varchar',
            },
            {
              name: 'state',
              enum: [...(Object.values(Cities))],
              type: 'varchar',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}
