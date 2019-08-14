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
import { FiTwitter } from "react-icons/fi";

import {Nav, Navbar, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';

import {TweetDetails} from  '../../pages/tweet_details';

import Avatar from 'react-avatar';
import history from '../../pages/history';

import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";


const cardStyle: React.CSSProperties = {
    // maxWidth: "550px",
    padding: "6px 6px",
    backgroundColor: "white",

    margin: "0 auto 0px",
    marginTop: "5px",
    MozBorderRadius: "2px",
    WebkitBorderRadius: "2px",
    borderRadius: "2px",
    MozBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)"
};

const divStyle: React.CSSProperties = {
    // maxWidth: "550px",
    padding: "0px 0px",
    backgroundColor: "#D8BFD8",

    margin: "0 auto 0px",
    marginTop: "5px",
    MozBorderRadius: "2px",
    WebkitBorderRadius: "2px",
    borderRadius: "2px",
    MozBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)"
};

const barStyle: React.CSSProperties = {
    backgroundColor: "#1da1f2",
    color: "#1da1f2",
    height: "40px",
};

const titleStyle: React.CSSProperties = {
    padding: "5px 5px",
    marginLeft: "17px",
    fontSize: "20px",
};

const iconTwitterStyle: React.CSSProperties = {
    fontSize: "27px",
    color: "white",
    float: "right",
    marginRight: "7px",
    // marginBottom: "40px",
};

const cardHeaderStyle: React.CSSProperties = {
    marginRight: "-8px",
    marginLeft:  "-8px",
};

const avatarStyle: React.CSSProperties = {
    backgroundColor: "#9370DB"
};

const mediaStyle: React.CSSProperties = {
    height: "0",
    paddingTop: '56.25%',
};

const expandButtonStyle: React.CSSProperties = {
    transform: 'rotate(0deg)',
    marginRight: 'auto',
};

const bioStyle: React.CSSProperties = {
    marginTop: "-20px"
};

const fontsizeName: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold"
};

const fontsizeEmail: React.CSSProperties = {
    fontSize: "15px",
    color: "blue",
    marginTop: "-15px"
};

const buttonAvatarStyle: React.CSSProperties = {
    padding: "0px 0px",
    border: "none",
    backgroundColor: "transparent"
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


interface UserProfileProps {
    userEmail?:  string;
    userId?:     number  | null;
    userName?:   string  | null;
    userBio?:    string  | null;
    userPic?:    string
    dateJoined?: string  | null;
    renderBio?:  boolean | null;
}

interface UserProfileStates {
    expanded: boolean;
    setExpanded: boolean;
}


export class UserProfile extends React.Component<UserProfileProps, UserProfileStates> {
    public constructor(props: UserProfileProps){
        super(props)
        this.state = {
            expanded: true,
            setExpanded: false
        };
    }
    public render(){
        return (
            <div style={divStyle}>
                <div style={barStyle}>
                    <p style={titleStyle}>Join us! <FiTwitter style={iconTwitterStyle}/></p>
                </div >
                <Card style={cardStyle}>
                    <CardHeader style={cardHeaderStyle}
                        avatar={
                            <Button style={buttonAvatarStyle}>
                                <Avatar
                                    round={true}
                                    size="100"
                                    src={this.props.userPic}
                                    onClick={() => this._showUserDetails()}
                                />
                            </Button>
                            // <Avatar style={avatarStyle} aria-label="Recipe">
                            //     T
                            // </Avatar>
                        }
                        // action={
                        //     <IconButton aria-label="Settings">
                        //         <NavDropdown 
                        //             alignRight
                        //             title=""
                        //             id="basic-nav-dropdown">
                        //             <NavDropdown.Item
                        //                 eventKey="1"
                        //                 onClick={() => this._showTweetDetails()}
                        //                 >
                        //                     Show the user's details
                        //             </NavDropdown.Item>
                        //         </NavDropdown>  
                        //     </IconButton>
                        // }
                        title={
                            <p style={fontsizeName}>{this.props.userName}</p>
                        }
                        subheader={
                            <p style={fontsizeEmail}>{this.props.userEmail}</p>
                            // subheader={this.props.userEmail}
                        }
                        
                    />
                    <div>
                        {this._renderBio()}
                    </div>
                </Card>
            </div>
        );
    }
    private _handleExpandClick() {
        this.setState({expanded: !this.state.expanded});
    }
    private _showUserDetails() {
        (window as any).__userId = this.props.userId;
        history.push(`/user_details/${this.props.userId}`);
    }
    private _showTweetDetails() {
        (window as any).__id = this.props.userId;
        history.push(`/tweet_details/${this.props.userId}`);
    }
    private _renderBio() {
        if (this.props.renderBio !== undefined){
            return (
                <div>
                    <CardActions disableSpacing>
                        Biography
                        <IconButton
                            style={expandButtonStyle}
                            title="Show biography"
                            aria-expanded={this.state.expanded}
                            aria-label="Show more"
                            onClick={() => this._handleExpandClick()}
                            >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent style={bioStyle}>
                            <div>
                                {this.props.userBio}
                            </div>
                        </CardContent>
                    </Collapse>
                </div>
            );
        }
    }

}


// export const UserProfile = withRouter(props => <UserProfileInternal {...props}/>);