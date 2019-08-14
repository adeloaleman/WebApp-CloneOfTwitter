import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public email!: string;
    
    @Column()
    public password!: string;

    @Column({nullable: true })
    public name!: string;

    @Column({nullable: true })
    public bio!: string;

    @Column({nullable: true })
    public pic!: string;
}
