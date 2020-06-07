export interface IPayment{
    id: number,
    name: string,
    montant: number,
}

export default class Payment{
    id: number;
    name: string;
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