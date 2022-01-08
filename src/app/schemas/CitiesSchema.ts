/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {v4 as uuid} from 'uuid';
@Entity('cities')
export class CitiesSchema {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    city!: string;

  @Column()
    state!: string;

  @Column()
    createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
};
