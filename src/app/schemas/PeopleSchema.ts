/* eslint-disable require-jsdoc */
/* eslint-disable new-cap */
import {Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn} from 'typeorm';
import {CitiesSchema} from './CitiesSchema';
import {v4 as uuid} from 'uuid';

@Entity('people')
export class PeopleSchema {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    name!: string;

  @Column()
    gender!: string;

  @Column()
    birthdate!: Date;

  @Column()
    age!: number;

  @ManyToOne(() => CitiesSchema)
  @JoinColumn({name: 'current_city_id'})
    currentCityId!: string;

  @Column()
    createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
};
