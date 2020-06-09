import Payment from './Payment';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';

export interface IProject{
    id: number,
    name: string,
    payments: Payment[],
}

@Entity('Project')
export default class Project extends BaseEntity{


    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => Payment, payment => payment.project)
    payments: Payment[];

    constructor(){
        super()
    }

    addPayment(payment: Payment): void{
        this.payments.push(payment);
    }
}