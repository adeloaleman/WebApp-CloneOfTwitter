import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import { FiTwitter } from "react-icons/fi";
import { GiBirdTwitter } from "react-icons/gi";
// import { withAuth } from "../with_auth/with_auth"

import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';

import Avatar from 'react-avatar';

import history from '../../pages/history';


const navlinkStyle: React.CSSProperties = {
    marginTop: "7px"
};

const searchStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    // maxWidth: "1500px",
    // width: "1500px",
    // margin: "0 auto 25px",
};

const bottonBarStyle: React.CSSProperties = {
    // backgroundColor: "#9370DB ",
    backgroundColor: "#1da1f2",
    height: "30px"
};

const leftBarStyle: React.CSSProperties = {
    float: "left"
};

const rightBarStyle: React.CSSProperties = {
    position: "relative",
    float: "right",
    right: "10px",
    width: "50%"
};

const rightIcon1Style: React.CSSProperties = {
    position: "absolute",
    right: "15px"
};

const rightIcon2Style: React.CSSProperties = {
    position: "absolute",
    right: "85px"
};

const profileStyle: React.CSSProperties = {
    position: "absolute",
    marginTop: "10px",
    right: "15px",
    width: "10px",
    height: "10px" 
};

const imageStyle: React.CSSProperties = {
    marginTop: "-22px",
    marginLeft: "-33px",
    width: "45px",
    height: "45px" 
};

const iconTwitterStyle: React.CSSProperties = {
    fontSize: "27px",
    color: "white",
    float: "right",
    // marginRight: "7px",
    // marginBottom: "40px",
};


interface HeaderInternalProps {
    // Metodo 2 con la class que Remo creo «with_auth»
    // token: string | null;
}

interface HeaderInternalStates {}


export class HeaderInternal extends React.Component<HeaderInternalProps, HeaderInternalStates> {
    public render() {
        return (
            <div>
                <div>
                    <Navbar bg="dark" variant="dark">
                    {/* <Navbar bg="light" variant="light"> */}
                        <Nav variant="pills" defaultActiveKey="/">
                            <div>
                                <Nav.Link style={leftBarStyle} eventKey="1" as={Link} to="/"> <FiTwitter style={iconTwitterStyle}/> </Nav.Link>
                            </div>
                            <div>
                                {this._renderSomethingPrivate()}
                            </div>
                            <div style={searchStyle}>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-info">Search</Button>
                                </Form>
                            </div>
                        </Nav>
                    </Navbar>
                </div>
                <div style={bottonBarStyle}></div>
            </div>
        );
    }
    private _renderSomethingPrivate() {
        // =================
        // Metodo 1: Taking the token that was saved (See «sign_in.tsx») into the window object
        const token = (window as any).__token;

        // Metodo 2: Usaondo la class que Remo creo «with_auth»
        // const token = this.props.token;
        // =================
        if (token) {
            return (
                <div>
                    <Nav.Link 
                        style={profileStyle}
                        eventKey="4" 
                        as={Link} to={`/user_details/${(window as any).__user.id}`}
                        onClick={() => (window as any).__userId = (window as any).__user.id}
                        >
                            <Avatar style={imageStyle}
                                    round={true}
                                    size="45"
                                    src={(window as any).__user.pic}
                            />
                            {/* <img style={imageStyle}
                                src={(window as any).__user.pic}
                            /> */}
                    </Nav.Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Nav.Link style={rightIcon1Style} eventKey="2" as={Link} to="/sign_in">Sign In</Nav.Link>
                    <Nav.Link style={rightIcon2Style} eventKey="3" as={Link} to="/sign_up">Sign Up</Nav.Link>
                </div>
            );
        }
    }

}


// ======================
// withRouter/withAuth will trigger a re-render:
// Metodo 1: Using «withRouter»
export const Header = withRouter(props => <HeaderInternal {...props}/>);

// Metodo 2: Usando la class que Remo creo «with_auth»
// export const Header = withAuth(props => <HeaderInternal token={props.authToken} />);
// ======================

// withRouter pass some props that contain the history to the <HeaderInternal> component
// and returns a new component named <Header>. The new component (Header) is identical to the <HeaderInternal> 
// Component but it has som extra properties. If one of the properties passed (props) chages, <Header> is going to re-render

// So, basically, withRouter is a function that is taking a component, adding some properties to that component, and returning a new
// componenet that is going to render every time that some of the properties added chages.

// In the case of «withRouter, the properties that we are adding are relating to the Routing. So, when the routing changes, the 
// component is going to ber re-render

// https://reacttraining.com/react-router/core/api/withRouter
// You can get access to the history object’s properties and the closest <Route>'s match via the withRouter higher-order
// component. withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.