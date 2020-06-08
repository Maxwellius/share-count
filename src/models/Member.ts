import { Table, Column, PrimaryGeneratedColumn } from "ionic-orm";

export interface IMember{
    nom: string,
}

@Table()
export default class Member{
    @Column()
    nom: string;
    constructor(newMember: IMember){
        this.nom = newMember.nom;
    }

}