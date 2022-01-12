/* eslint-disable new-cap */
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {randomUUID} from 'crypto';
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
      this.id = randomUUID();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
};
