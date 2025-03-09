import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
export class CurrencyBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column("decimal", { precision: 18, scale: 8, default: 0 })
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.balances)
  wallet: Wallet;
}
