/* eslint-disable require-jsdoc */
import {MigrationInterface, QueryRunner, Table} from 'typeorm';
export class CreateClients1641586368006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
        new Table({
          name: 'clients',
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
              enum: ['male', 'female', 'others'],
              type: 'varchar',
            },
            {
              name: 'birthdate',
              type: 'timestamp',
            },
            {
              name: 'current_city_id',
              type: 'uuid',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()',
            },
          ],
          foreignKeys: [
            {
              name: 'fk_clients_cities',
              columnNames: ['current_city_id'],
              referencedTableName: 'cities',
              referencedColumnNames: ['id'],
            },
          ],
        }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients');
  }
}
