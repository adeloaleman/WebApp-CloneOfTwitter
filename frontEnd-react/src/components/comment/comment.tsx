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
import {Button} from 'react-bootstrap';
import Avatar from 'react-avatar';

import history from '../../pages/history';


const cardStyle: React.CSSProperties = {
    maxWidth: "500px",
    padding: "0px 0px",
    backgroundColor: "white",
    margin: "0 auto 0px",  // Centra la card
    boxShadow: "none",
    // borderLeft: "2px solid #9370DB",
    marginTop: "5px",
    // border: "5px solid red",
    // borderLeftColor: "red",
    // borderBlockColor: "red",
    // borderBlockWidth: "0px"
    // marginTop: "0px",
    // MozBorderRadius: "0px",
    // WebkitBorderRadius: "0px",
    // borderRadius: "0px",
};


const cardHeaderStyle: React.CSSProperties = {
    marginTop: "5px",
    padding: "0px 0px",
    marginLeft: "5px",
};

const cardContentStyle: React.CSSProperties = {
    padding: "0px 0px",
    marginLeft: "66px",
    marginTop: "5px",
};

const cardActionsStyle: React.CSSProperties = {
    padding: "0px 0px",
    marginLeft: "52px",
    marginTop: "1px",
};

const buttonAvatarStyle: React.CSSProperties = {
    padding: "0px 0px",
    border: "none",
    backgroundColor: "transparent"
};


interface CommentProps {
    id:         number;
    content:    string;
    date?:      string | null;
    userEmail?: string | null;
    userId?:    number | null;
    userPic?:   string
}

interface CommentStates {
   expanded: boolean;
   setExpanded: boolean;
}


export class Comment extends React.Component<CommentProps, CommentStates> {
    public constructor(props: CommentProps){
        super(props)
        this.state = {
            expanded: false,
            setExpanded: false
        };
    }
    public render(){
        return (
            <Card style={cardStyle}>
                <CardHeader
                    style={cardHeaderStyle}
                    avatar={
                        <Button style={buttonAvatarStyle}>
                            <Avatar
                                round={true}
                                size="45"
                                src={this.props.userPic}
                                onClick={() => this._showUserDetails()}
                            />
                        </Button>
                        // <Avatar style={avatarStyle} aria-label="Recipe">
                        //     T
                        // </Avatar>
                    }
                    title={this.props.userEmail}
                    subheader={this.props.date}
                />
                <CardContent style={cardContentStyle}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.content}
                    </Typography>
                </CardContent>
                <CardActions style={cardActionsStyle} disableSpacing>
                    <IconButton aria-label="Add to favorites">
                    <FavoriteIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
    private _showUserDetails() {
        (window as any).__userId = this.props.userId;
        history.push(`/user_details/${this.props.userId}`);
    }

}