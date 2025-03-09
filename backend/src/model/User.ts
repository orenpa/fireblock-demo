import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Wallet } from "./Wallet";
import { Transaction } from "./Transaction";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => Transaction, (transaction) => transaction.fromUser)
  transactions: Transaction[];
}
