import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 18, scale: 8 })
  amount: number;

  @Column()
  currency: string;

  @ManyToOne(() => User, (user) => user.transactions)
  fromUser: User;

  @ManyToOne(() => User, (user) => user.transactions)
  toUser: User;

  @Column("text")
  signature: string;

  @CreateDateColumn()
  createdAt: Date;
}
