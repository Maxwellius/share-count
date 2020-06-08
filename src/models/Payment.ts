import { Table, Column, PrimaryColumn, PrimaryGeneratedColumn } from "ionic-orm";

export interface IPayment{
    id: number,
    name: string,
    montant: number,
}

@Table()
export default class Payment{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("int")
    montant: number;
    
    constructor(newPayment: IPayment){
        this.id = newPayment.id;
        this.name = newPayment.name;
        this.montant = newPayment.montant;
    }

    montantToEuros(): string{
        return (~~this.montant + '.' + this.montant % 100);
    }
}