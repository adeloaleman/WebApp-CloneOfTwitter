import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {Nav, Navbar, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';

import {TweetDetails} from  '../../pages/tweet_details';
import {SignUp} from "../../pages/sign_up";

import Avatar from 'react-avatar';
import history from '../../pages/history';

import {withRouter} from "react-router-dom";


const cardStyle: React.CSSProperties = {
    // maxWidth: "650px",
    padding: "40px 40px",
    backgroundColor: "white",
    // backgroundColor: "#F7F7F7",

    margin: "0 auto 10px",
    marginTop: "5px",
    MozBorderRadius: "2px",
    WebkitBorderRadius: "2px",
    borderRadius: "2px",
    MozBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)"
};

const mediaStyle: React.CSSProperties = {
    height: "0",
    paddingTop: '56.25%', // 16:9
};

const avatarStyle: React.CSSProperties = {
    backgroundColor: "#9370DB"
};

const expandButtonStyle: React.CSSProperties = {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
};

const cardHeaderStyle: React.CSSProperties = {
    marginRight: "-13px",
};

const buttonAvatarStyle: React.CSSProperties = {
    padding: "0px 0px",
    border: "none",
    backgroundColor: "transparent"
};

const fontsizeEmail: React.CSSProperties = {
    fontSize: "17px",
    color: "blue",
    marginBottom: "0px"
};

const showCommentsStyle: React.CSSProperties = {
    float: "right",
    color: "grey",
    right: "15px",
    marginLeft: "292px",
};


const useStyles = makeStyles( (theme: Theme) =>
    createStyles({
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create(
                'transform',
                {
                    duration: theme.transitions.duration.shortest,
                }
            ),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);


interface TweetEntryProps {
    id:         number;
    title?:     string | null;
    content:    string;
    date?:      string | null;
    imageUrl?:  string | null;
    userEmail?: string | null;
    userId?:    number | null;
    userPic?:   string
    comments?:  any;
    propsExpanded?: boolean
}

interface TweetEntryStates {
   expanded: boolean | undefined;
   setExpanded: boolean;
}


export class TweetEntry extends React.Component<TweetEntryProps, TweetEntryStates> {
    public constructor(props: TweetEntryProps){
        super(props)
        this.state = {
            expanded: this.props.propsExpanded,
            // expanded: false,
            setExpanded: false
        };
    }
    public render(){
        return (
            <Card style={cardStyle}>
                <CardHeader style={cardHeaderStyle}
                    avatar={
                        <Button style={buttonAvatarStyle}>
                            <Avatar
                                round={true}
                                size="60"
                                src={this.props.userPic}
                                onClick={() => this._showUserDetails()}
                            />
                        </Button>
                        // <Avatar style={avatarStyle} aria-label="Recipe">
                        //     T
                        // </Avatar>
                    }
                    action={
                        <IconButton aria-label="Settings">
                            {/* <MoreVertIcon></MoreVertIcon> */}
                            <NavDropdown 
                                alignRight
                                title=""
                                // title={
                                //     <div style={{ display: 'inline-block' }}> 
                                //       {/* <MoreVertIcon/> {' '} */}
                                //     </div>
                                // }
                                id="basic-nav-dropdown">
                                <NavDropdown.Item
                                    eventKey="1"
                                    onClick={() => this._showTweetDetails()}
                                    >
                                        Show this tweet
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider /> */}
                                {/* <NavDropdown.Item eventKey="2">Separated link</NavDropdown.Item> */}
                            </NavDropdown>  
                        </IconButton>
                    }
                    title = {<p style={fontsizeEmail}>{this.props.userEmail}</p>}
                    subheader={this.props.date}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.content}
                    </Typography>
                </CardContent>
                {
                    (() => {
                        if (this.props.imageUrl !== null && this.props.imageUrl !== undefined){
                            return (
                                <CardMedia
                                    style={mediaStyle}
                                    image={this.props.imageUrl}
                                />
                            );
                        } else {
                            return null;
                        }
                    })()
                }
                {/* <CardMedia
                    style={mediaStyle}
                    // image="http://www.araguato.org/sites/default/files/styles/full_width_500px_height/public/www.araguato.org%20Choroni%20Chuao01_1.jpg?itok=JseYr5dg"
                    // title="Paella dish"
                    // {image !== undefined ? image={this.props.imageUrl}}
                    // image={this.props.imageUrl}
                /> */}
                <CardActions disableSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon/>
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon/>
                    </IconButton>
                    {/* <div style={showCommentsStyle}>
                        Show comments
                    </div> */}
                    <IconButton
                        // className={
                        //     clsx(
                        //         {useStyles.expand},
                        //         {
                        //             [useStyles.expandOpen]: this.state.expanded,
                        //         }
                        //     )
                        // }
                        style={expandButtonStyle}
                        title="Show comments"
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        onClick={() => this._handleExpandClick()}
                        >
                        <ExpandMoreIcon/>
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {this.props.comments}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
    private _defineExpanded(){
        if (this.props.propsExpanded === undefined) {
            return false;
        } else {
            return this.props.propsExpanded;
        }
    }

    private _handleExpandClick() {
        this.setState({expanded: !this.state.expanded});
    }
    private _showTweetDetails() {
        (window as any).__id = this.props.id;
        history.push(`/tweet_details/${this.props.id}`);
        // history.push(`/tweet_details`);
    }
    private _showUserDetails() {
        (window as any).__userId = this.props.userId;
        history.push(`/user_details/${this.props.userId}`);
    }

}


// export const TweetEntry = withRouter(props => <TweetEntry {...props}/>);