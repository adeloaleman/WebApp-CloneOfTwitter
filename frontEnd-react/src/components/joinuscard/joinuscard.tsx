import React from 'react';

import {TweetEntry} from  '../tweet_entry/tweet_entry';

import { FaSearch } from 'react-icons/fa';
import { MdPeople, MdChatBubbleOutline, MdChat } from 'react-icons/md';
import { IoMdPeople, IoIosSearch } from "react-icons/io";
import { TiSocialTwitter } from "react-icons/ti";
import { FiTwitter } from "react-icons/fi";
import { GiBirdTwitter } from "react-icons/gi";
// import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';


const cardStyle: React.CSSProperties = {
    backgroundColor: "#1da1f2",
    // display: "flex",
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
    height: "492px",
    marginTop: "5px"
    // display: "table-cell",
    // verticalAlign: "middle"
};

const tableStyle: React.CSSProperties = {
    // borderCollapse: "collapse"
    borderCollapse: "separate",
    borderSpacing: "0 3em"
};

const trStyle: React.CSSProperties = {
    marginTop: "100px",
    // paddingTop: "5em",
    // paddingBottom: "5em"
};

const barStyle: React.CSSProperties = {
    backgroundColor: "white",
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
    color: "#1da1f2",
    float: "right",
    marginRight: "7px",
    // marginBottom: "40px",
};

const iconSearchStyle: React.CSSProperties = {
    fontSize: "25px",
    marginLeft: "20px",
    marginRight: "5px",
    // marginTop: "48px",
    // marginBottom: "40px",
};

const iconPeopleStyle: React.CSSProperties = {
    fontSize: "35px",
    marginLeft: "20px",
    marginRight: "5px",
    // marginTop: "48px",
    // marginBottom: "40px",
};

const iconChatStyle: React.CSSProperties = {
    marginLeft: "20px",
    marginRight: "5px",
    fontSize: "30px",
    // marginTop: "48px",
    // marginBottom: "40px",
};

const textStyle: React.CSSProperties = {
    display: "flex",
    fontFamily: "'Helvetica Neue',Helvetica,Arial,sans-serif",
    fontSize: "18px",
    color: "white",
    fontWeight: "bold",
    margin: "48px auto",
    marginTop: "48px",
    marginBottom: "48px",
    marginLeft: "20px",
};


interface JoinUsCardProps {}

interface JoinUsCardState {}


export class JoinUsCard extends React.Component<JoinUsCardProps, JoinUsCardState> {
    public render(){
        return (
            <div style={cardStyle}>
                <div style={barStyle}>
                    <p style={titleStyle}>Join us! <FiTwitter style={iconTwitterStyle}/></p>
                </div >
                <table style={tableStyle}>
                    <tr style={trStyle}>
                        <td style={trStyle}><FaSearch style={iconSearchStyle}/></td>
                        <td>Follow your interests.</td>
                    </tr>
                    <tr>
                        <td><MdPeople style={iconPeopleStyle}/></td>
                        <td>Hear what people are talking about.</td>
                    </tr>
                    <tr>
                        <td><MdChatBubbleOutline style={iconChatStyle}/></td>
                        <td>Join the conversation.</td>
                    </tr>
                </table>

            </div>
        );
    }
}


{/* <div style={barStyle}>
</div >
<div style={textStyle}>
    <FiTwitter style={iconTwitterStyle}/>
</div >
<div style={textStyle}>
    <FaSearch style={iconSearchStyle}/> Follow your interests. 
</div >
<div style={textStyle}>
    <MdPeople style={iconPeopleStyle}/> Hear what people are talking about. 
</div>
<div style={textStyle}>
    <MdChatBubbleOutline style={iconChatStyle}/> Join the conversation.
</div> */}