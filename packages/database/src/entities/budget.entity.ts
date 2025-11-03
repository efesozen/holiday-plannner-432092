import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Itinerary } from './itinerary.entity';

@Entity({ name: 'budgets' })
export class Budget extends BaseEntity {
  @Column({ type: 'integer' })
  total_amount!: number;

  @Column({ type: 'integer' })
  spent_amount!: number;

}
