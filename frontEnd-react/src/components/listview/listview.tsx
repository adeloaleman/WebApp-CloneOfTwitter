import React from 'react';

import {TweetEntry} from  '../tweet_entry/tweet_entry';


const messageStyle: React.CSSProperties = {
    fontSize: "15px",
    color: "#635f5f"
};


interface ListviewProps {
    items: any[];
    renderItem: JSX.Element[];
}

interface ListviewState {}


export class Listview extends React.Component<ListviewProps, ListviewState> {
    public render(){
        if (this.props.items.length < 1){
            return <div><p style={messageStyle}>There are no comments yet</p></div>;
        } else {
            return (
                this.props.renderItem
            );
        }
    }
}


// export class Listview extends React.Component<ListviewProps, ListviewState> {
//     public render(){
//         if (this.props.items.length < 1){
//             return <div><p style={messageStyle}>There are no comments yet</p></div>;
//         } else {
//             return (
//                 this.props.items.map(
//                     (item) => {
//                         return (
//                             this.props.renderItem
//                         );
//                     }
//                 )
//             );
//         }
//     }
// }