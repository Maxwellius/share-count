import Payment from './Payment';

export interface IProject{
    id: number,
    name: string,
    payments: Payment[],
}

export default class Project{

    id: number;
    name: string;
    payments: Payment[];

    constructor(newProject: IProject){
        this.id = newProject.id;
        this.name = newProject.name;
        this.payments = newProject.payments;
    }

    addPayment(payment: Payment): void{
        this.payments.push(payment);
    }
}