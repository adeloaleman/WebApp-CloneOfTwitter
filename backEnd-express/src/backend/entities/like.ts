import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Users } from "./users";
import { Tweet } from "./tweet";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Users, referenceUser => referenceUser.id)
    public referenceUser!: Users;

    @ManyToOne(type => Tweet, referenceTweet => referenceTweet.id)
    public referenceTweet!: Tweet;

    @Column()
    public is_positive!: boolean;
}
