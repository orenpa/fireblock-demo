import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { CurrencyBalance } from "./CurrencyBalance";

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column("text")
  publicKey: string;

  @Column("text")
  privateKey: string;

  @OneToMany(() => CurrencyBalance, (balance) => balance.wallet, {
    cascade: true,
  })
  balances: CurrencyBalance[];

  @OneToOne(() => User, (user) => user.wallet)
  @JoinColumn()
  user: User;
}
