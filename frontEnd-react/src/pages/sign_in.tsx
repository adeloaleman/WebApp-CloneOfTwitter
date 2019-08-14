import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import * as joi from "joi";

// import * as H from 'history';
import history from './history';

const divStyle: React.CSSProperties = {
    marginTop: "40px",
};

const cardStyle: React.CSSProperties = {
    maxWidth: "350px",
    padding: "40px 40px",
    backgroundColor: "#F7F7F7",

    // Para centrar
    margin: "0 auto 25px",
    marginTop: "5px",
    MozBorderRadius: "2px",
    WebkitBorderRadius: "2px",
    borderRadius: "2px",
    MozBoxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.3)"
};

const imgStyle: React.CSSProperties = {
    width: "120px",
    height: "120px",
    margin: "0 auto 10px",
    display: "block",
    MozBorderRadius: "50%",
    WebkitBorderRadius: "50%",
    borderRadius: "50%"
};

const buttonStyle: React.CSSProperties = {
    width: "100%",
    fontSize: "700",
    height: "36px",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    cursor: "default"
};

const validationErrorsStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "blue",
    paddingTop: "15px"
};

const serverErrorsStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "red",
    paddingTop: "15px"
};


const credentialSchema =  {
    email: joi.string().email().required(),
    password: joi.string().min(3).max(30).required()
};

interface UserDetails{
    token: string;
    user: User;
}

interface User{
    id: number;
    email: string;
}

interface SignInProps {}

interface SignInState {
    email: string;
    password: string;
    error: string | null
}


export class SignIn extends Component<SignInProps, SignInState> {
    public constructor(props: SignInProps){
        super(props)
        this.state = {
            email: "",
            password: "",
            error: null
        };
    }
    render() {
        return (
            <div style={divStyle}>
                <div style={cardStyle}>
                    <img style={imgStyle} src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" />
                    {/* <img style={imgStyle} src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" /> */}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email"
                                placeholder="Enter email"
                                onKeyUp={(e: any) => this._updateEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                {/* Some text */}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onKeyUp={(e: any) => this._updatePassword(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Button
                            style={buttonStyle}
                            variant="primary"
                            onClick={() => this._handlerSubmit()}>
                            Sign In
                        </Button>
                        <div style={validationErrorsStyle}> {this._renderValidationErrors()} </div>
                        <div style={serverErrorsStyle}>     {this._renderServerErrors()}     </div>
                        {/* {this.state.error} */}
                        {/* {this.state.token} */}
                    </Form>
                </div>
            </div>
        );
    }
    private _updateEmail(email: string){
        this.setState({email: email});
    }
    private _updatePassword(password: string){
        this.setState({password: password});
    }
    private _handlerSubmit() {
        (async () => {
            try {
                const userDetails: any = await getToken(this.state.email, this.state.password);
                // Reset error
                this.setState({ error: null });

                // ===============
                // Metodo 1: Saving the token in the window object
                (window as any).__token = userDetails.token;
                (window as any).__user = userDetails.user;

                // Metodo 2: usando la class que Remo creo «with_auth»
                // setAuthToken((token as any));
                // ===============

                // Redirect to home page
                history.push("/");
            } catch(err) {
                this.setState({ error: err.msg });
            }
        })();
    }
    private _renderValidationErrors(){
        const validationResults = joi.validate(
            {
                email:   this.state.email,
                password: this.state.password
            },
            credentialSchema
        );
        if (validationResults.error){
            return <div> {validationResults.error.details.map( d => <div>{d.message}</div> )} </div>;
        } else {
            return <div>OK!</div>;
        }
    }
    private _renderServerErrors() {
        if (this.state.error === null) {
            return <div></div>;
        } else {
            return <div>{this.state.error}</div>;
        }
    }
}


// export const SignIn = withRouter(props => <SignIn {...props}/>);


async function getToken(email: string, password: string) {
    return new Promise(function (resolve, reject) {
        (async () => {
            const data = {
                email: email,
                password: password
            };
            const response = await fetch(
                "/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            const json = await response.json();
            if (response.status === 200) {
                resolve(json as UserDetails);
            } else {
                reject(json as UserDetails);
            }
        })();
    });
}

async function getToken1(email: string, password: string){
    const data = {
        email: email,
        password: password
    }
    const response = await fetch(
        "/api/v1/auth/login",
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    return json.token;
}


// We can use this method if we want to fetch the token from a local file:
async function getToken2(email: string, password: string){
    const data = {
        email: email,
        password: password
    }
    const response = await fetch(
        "/data/login.json",
        {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            },
            // body: JSON.stringify(data)
        }
    );
    const json = await response.json();
    // { token: "lasflsfooiwerojsdfosjfoijljosdifjosdfijsdfoijoweoierj" }
    if (json.token === null){
        return json.msg;
    } else {
        return json.token;
    }
}