import React from 'react';
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";

import {Listview} from "../components/listview/listview";
import {TweetEntry} from "../components/tweet_entry/tweet_entry";
import {Comment} from "../components/comment/comment";
import {UserProfile} from "../components/user_profile/user_profile";
import {JoinUsCard} from "../components/joinuscard/joinuscard";
import {SignIn} from "./sign_in";
import {SignUp} from "./sign_up";


const pageStyle: React.CSSProperties = {
    maxWidth: "1500px",
    // width: "1500px",
    margin: "0 auto 25px",
};

const leftStyle: React.CSSProperties = {
    padding: "10px 10px",
    float: "left",
    width: "31%"
};

const midleStyle: React.CSSProperties = {
    padding: "10px 10px",
    float: "left",
    width: "45%"
};

const rightStyle: React.CSSProperties = {
    padding: "10px 10px",
    float: "left",
    width: "24%"
};

const adStyle: React.CSSProperties = {
    height: "600px",
    maxWidth: "250",
    backgroundColor: "#D8BFD8",
    fontSize: "20px",
    marginTop: "5px",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "600px",       /* The same as your div height */
};

const signInStyle: React.CSSProperties = {
    padding: "10px 10px",
    marginTop: "-35px",
    float: "left",
    width: "24%"
};

const ad1Style: React.CSSProperties = {
    // width: "240px",
    // height: "700px",
    margin: "0 auto 10px",
    display: "block",
    // MozBorderRadius: "50%",
    // WebkitBorderRadius: "50%",
    // borderRadius: "50%"
};

const ad2Style: React.CSSProperties = {
    // width: "240px",
    // height: "700px",
    padding: "5px 5px",
    margin: "0 auto 10px",
    display: "block",
    // MozBorderRadius: "50%",
    // WebkitBorderRadius: "50%",
    // borderRadius: "50%"
};


interface TweetInterface {
    id: number;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    referenceUser: {
        id: number;
        email: string;
        password: string;
        name: string;
        bio: string;
        pic: string;
    };
}

interface CommentInterface {
    id: number;
    content: string;
    date: string;
    referenceUser: {
        id: number;
        email: string;
        password: string;
        name: string;
        bio: string;
        pic: string;
    };
    referenceTweet: {
        id: number;
        title: string;
        content: string;
        date: string;
    };
}

interface TweetWithCommentsInterface {
    id: number;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    referenceUser: {
        id: number;
        email: string;
        password: string;
        name: string;
        bio: string;
        pic: string;
    },
    comments: any;
}


interface TweetsProps {}

interface TweetsState {
    dataTweets: TweetWithCommentsInterface[] | null;
}


export class Tweets extends React.Component<TweetsProps, TweetsState> {
    public constructor(props: TweetsProps){
        super(props);
        this.state = {
            dataTweets: null
        };
    }
    public componentDidMount(){
        (async () => {
            const _dataTweets = await getTweetsWithComments();
            this.setState({ dataTweets: _dataTweets });
        })();
    }
    public render(){
        return (
            <div style={pageStyle}>
                <div style={leftStyle}>
                    {this._renderUserProfile()}
                </div>
                <div style={midleStyle}>
                    {this._renderTweetWithComments()}
                </div>
                <div>
                    {this._renderRight()}
                </div>
            </div> 
        );
    }
    private _renderTweetWithComments(){
        if (this.state.dataTweets === null){
            return <div>Loding...</div>
        } else {
            return (
                <Listview
                    items={this.state.dataTweets}
                    renderItem={
                        this.state.dataTweets.map(
                            (tweet) => {
                                return (
                                    <TweetEntry
                                        id={tweet.id}
                                        userId={tweet.referenceUser.id}
                                        userPic={tweet.referenceUser.pic}
                                        content={tweet.content}
                                        date={tweet.date}
                                        userEmail={tweet.referenceUser.email}
                                        imageUrl={tweet.imageUrl}
                                        comments={this._renderComments(tweet.comments)}
                                    />
                                );
                            }
                        )
                    }
                />
            );
        }
    }
    private _renderComments(dataComments: CommentInterface[]): any{
        return (
            <Listview
                items={dataComments}
                renderItem={
                    dataComments.map(
                        (comment) => {
                            return (
                                <Comment
                                    id={comment.id}
                                    userId={comment.referenceUser.id}
                                    userPic={comment.referenceUser.pic}
                                    content={comment.content}
                                    date={comment.date}
                                    userEmail={comment.referenceUser.email}
                                />
                            );
                        }
                    )
                }
            />
        );
    }
    private _renderUserProfile() {
        const token = (window as any).__token;
        if (token) {
            return (
                <UserProfile
                    userName = {(window as any).__user.name}
                    userId = {(window as any).__user.id}
                    userEmail = {(window as any).__user.email}
                    userBio = {(window as any).__user.bio}
                    userPic = {(window as any).__user.pic}
                />
            );
        } else {
            return <JoinUsCard/>
        }
    }
    private _renderRight() {
        const token = (window as any).__token;
        if (!token) {
            return (
                <div style={signInStyle}>
                    <SignIn/>
                </div>
            );
        } else {
            return (
                <div style={rightStyle}>
                    <div style={adStyle}>
                        <Link to="">
                            {/* <img style={ad1Style} src="https://wiki.postgresql.org/images/f/f5/PostgreSQL.Vertical_Banner.orange.160x600.gif" /> */}
                            {/* https://i.pinimg.com/originals/12/8e/2f/128e2f85c84bc8fb45750527d7e367e2.png */}
                            {/* https://i2.wp.com/theurbandater.com/wp-content/uploads/edd/2015/12/ad-banner.png?fit=500%2C500&ssl=1 */}
                            {/* <img style={ad2Style} src="https://www.psdgraphics.com/file/300x600.jpg" /> */}
                            Advertise Here
                        </Link>
                    </div>
                </div>
            );
        }
    }

}


async function getTweetsWithComments(){
    const response = await fetch("/api/v1/tweets/tweetsWithComments");
    const json = await response.json();
    return json as TweetWithCommentsInterface[];
}