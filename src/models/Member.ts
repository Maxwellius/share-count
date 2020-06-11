/*import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Project from "./Project";

export interface IMember{
    name: string,
    nbShares: number,
    amountToPay: number
}

@Entity('Member')
export default class Member{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("int")
    nbShares: number;
    @Column("int")
    amountToPay: number;
    @ManyToOne(type => Project, project => project.payments)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    constructor(newMember: IMember){
        this.name = newMember.name;
        this.nbShares = newMember.nbShares;
        this.amountToPay = newMember.amountToPay;
    }
}
*/