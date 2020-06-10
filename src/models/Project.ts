import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

interface IProject{
    id: number,
    name: string,
    payments: Payment[],
}

@Entity('Project')
class Project extends BaseEntity{


    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(type => Payment, payment => payment.project, {cascade: true})
    payments: Payment[];

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

    montantToEuros(): string{
        return (~~this.montant + '.' + this.montant % 100);
    }
}

export default Project;
export {Payment, IPayment, Project, IProject};