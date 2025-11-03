import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Itinerary } from './itinerary.entity';
import type { User } from './user.entity';

@Entity({ name: 'collaborators' })
export class Collaborator extends BaseEntity {


@Column({ name: 'itinerary_id' })
  itinerary_id!: string;

  @Index('idx_collaborators_itinerary_id')
  @ManyToOne('Itinerary', 'collaborators')
  @JoinColumn({ name: 'itinerary_id' })
  itinerary!: Itinerary;

  @Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_collaborators_user_id')
  @ManyToOne('User', 'collaborators')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
