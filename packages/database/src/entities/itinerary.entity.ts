import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'itineraries' })
export class Itinerary extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_itineraries_start_date')
  start_date!: Date;

  @Column({ type: 'timestamp with time zone' })
  @Index('idx_itineraries_end_date')
  end_date!: Date;


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_itineraries_user_id')
  @ManyToOne('User', 'itineraries')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
