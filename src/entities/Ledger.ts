

import { User } from './User';

@Entity('ledger')
class Ledger {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  category: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Ledger };
