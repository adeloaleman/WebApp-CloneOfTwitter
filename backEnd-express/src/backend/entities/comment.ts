import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Users } from "./users";
import { Tweet } from "./tweet";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(type => Users, referenceUser => referenceUser.id)
    public referenceUser!: Users;

    @ManyToOne(type => Tweet, referenceTweet => referenceTweet.id)
    public referenceTweet!: Tweet;
    
    @Column()
    public content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    public date!: string;
}