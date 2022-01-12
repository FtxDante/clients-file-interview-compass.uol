/* eslint-disable new-cap */
import {Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn} from 'typeorm';
import {CitiesSchema} from './CitiesSchema';
import {randomUUID} from 'crypto';

@Entity('clients')
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

  @Column()
    current_city_id!: string;

  @ManyToOne(() => CitiesSchema)
  @JoinColumn({name: 'current_city_id'})
    currentCityId!: CitiesSchema;

  @Column('timestamp')
    createdAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
};
