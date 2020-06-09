import { ManyToOne, Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";
import Project from "./Project";

export interface IPayment{
    id: number,
    name: string,
    montant: number,
}

@Entity('Payment')
export default class Payment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("int")
    montant: number;
    @ManyToOne(type => Project, project => project.payments)
    project: Project;
    
    constructor(){
        super();
    }

    montantToEuros(): string{
        return (~~this.montant + '.' + this.montant % 100);
    }
}