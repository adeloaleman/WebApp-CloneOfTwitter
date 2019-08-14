import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import * as joi from "joi";
import { useAlert } from 'react-alert'
// import * as H from 'history';
import history from './history';


const divStyle: React.CSSProperties = {
    marginTop: "40px",
};

const cardStyle: React.CSSProperties = {
    maxWidth: "350px",
    padding: "40px 40px",
    backgroundColor: "#F7F7F7",

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

const topBar: React.CSSProperties = {
    height: "30px",
    backgroundColor: "red"
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
    password: joi.string().min(3).max(30).required(),
    confirmPassword: joi.string().required().label("confirm password").valid(joi.ref('password')).options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match',
          }
        } 
    })
};

interface SignUpProps {}

interface SignUpState {
    email: string;
    password: string;
    confirmPassword: string;
    error: string | null
}


export class SignUp extends Component<SignUpProps, SignUpState> {
    public constructor(props: SignUpProps){
        super(props)
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            error: null
        };
    }
    render() {
        return (
            <div style={divStyle}>
                <div style={cardStyle}>
                    {/* <div style={topBar}></div> */}
                    <img style={imgStyle} src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" />
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                onKeyUp={(e: any) => this._updateConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Button
                            style={buttonStyle}
                            variant="success"
                            onClick={() => this._handlerSubmit()}>
                            Sign Up
                        </Button>
                        <div style={validationErrorsStyle}> {this._renderValidationErrors()} </div>
                        <div style={serverErrorsStyle}>     {this._renderServerErrors()}     </div>
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
    private _updateConfirmPassword(confirmPassword: string){
        this.setState({confirmPassword: confirmPassword});
    }
    private _handlerSubmit() {
        (async () => {
            try {
                const signup = await createUser(this.state.email, this.state.password);
                this.setState({ error: null });
                // const alert = useAlert()
                // alert.show('Oh look, an alert!')
                history.push("/sign_in");
            } catch(err) {
                this.setState({ error: err.msg });
            }
        })();
    }
    // private _handlerSubmit() {
    //     (async () => {
    //         await createUser(this.state.email, this.state.password);
    //     })();
    //     (async () => {
    //         try {
    //             const token = await getToken(this.state.email, this.state.password);

    //             // Reset error
    //             this.setState({ error: null });

    //             // ===============
    //             // Metodo 1: Saving the token in the window object
    //             (window as any).__token = token;

    //             // Redirect to home page
    //             history.push("/");
    //         } catch(err) {
    //             this.setState({ error: err.msg });
    //         }
    //     })();
    // }
    private _renderValidationErrors(){
        const validationResults = joi.validate(
            {
                email:   this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
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


async function  createUser(email: string, password: string) {
    return new Promise(function (resolve, reject) {
        (async () => {
            const data = {
                email: email,
                password: password
            };
            const response = await fetch(
                "/api/v1/users",
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
                resolve(json);
            } else {
                reject(json);
            }
        })();
    });
}