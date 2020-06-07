export interface IMember{
    nom: string,
}

export default class Member{
    nom: string;

    constructor(newMember: IMember){
        this.nom = newMember.nom;
    }

}