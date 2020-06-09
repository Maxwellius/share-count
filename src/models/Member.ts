import { Table, Column, PrimaryGeneratedColumn, Entity } from "typeorm";

export interface IMember{
    nom: string,
}

@Entity('Member')
export default class Member{
    @Column()
    nom: string;
    constructor(newMember: IMember){
        this.nom = newMember.nom;
    }

}