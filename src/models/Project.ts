import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

interface IProject{
    id: number,
    name: string,
    payments: Payment[],
    members: Member[],
}

@Entity('Project')
class Project extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => Payment, payment => payment.project, {cascade: true})
    payments: Payment[];
    @OneToMany(type => Member, member => member.project, {cascade: true})
    members: Member[];

    constructor(){
        super()
    }
}

interface IPayment{
    id: number,
    name: string,
    montant: number,
}

@Entity('Payment')
class Payment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("int")
    montant: number;
    @ManyToOne(type => Project, project => project.payments)
    @JoinColumn({ name: 'project_id' })
    project: Project;
    
    constructor(){
        super();
    }

    montantToEuros(): string {
        return (~~this.montant + '.' + this.montant % 100);
    }
}

interface IMember{
    id: number,
    name: string,
    nbShares: number,
    amountToPay: number
}

@Entity('Member')
class Member extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("int")
    nbShares: number;
    @Column("int", { nullable: true })
    amountToPay: number;
    @ManyToOne(type => Project, project => project.members)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    constructor(){
        super();
    }

    amountToPayToEuros(): string {
        if(this.amountToPay != null) {
            return (~~this.amountToPay + '.' + this.amountToPay % 100);
        } else {
            return null;
        }
    }
}

export default Project;
export {Payment, IPayment, Project, IProject, Member, IMember};