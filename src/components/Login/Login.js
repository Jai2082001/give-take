import classes from './Login.module.css'
import {useState, useRef} from 'react';
import {Form, Button, Alert, Spinner} from 'react-bootstrap'
import { useHistory } from 'react-router';
import Flip from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'
import { useDispatch } from 'react-redux';
import {userActions} from '../../Store/UserSlice'
import Navbar from '../Navbar/Navbar';

const Login = () => {

    const [hoverState, changeHoverState] = useState();
    const [error, changeError] = useState();
    const [alert, changeAlert] = useState(false);
    const [loading, changeLoading] = useState(false);
    const [loading2, changeLoading2] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    
    const forgotPasswordHandler = () => {
        changeLoading2(true)
        if(validateEmail(emailRef.current.value)){
            fetch(`${process.env.REACT_APP_FETCH_LINK}/forgotList`, {
                headers: {
                    email: emailRef.current.value
                }
            }).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response)
                if(response.msg === 'done'){
                    changeError("Your Password will be sent to your email in a few minutes")
                }else{
                    changeError('You are not registered')
                }
                changeLoading2(false)
            })
        }else{
            changeError("Enter a Correct Email")
            changeLoading2(false)
        }
    }

    console.log(error)

    const loginHandler = () => {
        console.log('clicked')
        changeLoading(true)
        if(emailRef.current.value){
            if(!(validateEmail(emailRef.current.value))){
                changeError("Enter A Valid Email")
                changeLoading(false)
            }else{
                if(passwordRef.current.value){
                    if(passwordRef.current.value.length < 4){
                        changeError('Password Field should be atleast 4 characters long')
                        changeLoading(false)
                    }else {
                        fetch(`${process.env.REACT_APP_FETCH_LINK}/loginUser`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value})
                        }).then((response)=>{
                            return response.json()
                        }).then((response)=>{
                            console.log(response);
                            if(response.message === 'no authentication'){
                                changeError('Email and password do not match')
                                changeLoading(false)
                                dispatch(userActions.changeUser({status: false}))
                            }else if(response.message === 'not reg'){
                                changeError('Seems that you are not registered');
                                changeLoading(false)
                                dispatch(userActions.changeUser({status: false}))
                            }
                            else{
                                dispatch(userActions.changeUser(response));
                                changeLoading(false);
                                history.push('/home');
                            }
                        })
                    }
                }else{
                    changeError('Password Field is Required')
                    changeLoading(false);
                }
            }
        }else {
            changeError("Email Is Required")
            changeLoading(false)
        }
    }

    return (
        <Fade>
            <div className={classes.loginDiv}>
                <div className={classes.overlayDiv}></div>
                <div className={classes.upperDiv}>
                    <Navbar></Navbar>
                    <div className={classes.loginForm}>
                        {error && 
                        <Flip top>
                            <Alert variant='danger'>{error}</Alert>                
                        </Flip>}
                        
                        
                        <div className={classes.loginFormDiv}>
                            <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                            </Form.Group>
                            <div className={classes.btnDiv}>
                                <Button onClick={loginHandler} variant="dark" >
                                    {loading && <Spinner animation='border'></Spinner>}
                                    {!loading && "Login"}
                                </Button>
                                <Button onClick={()=>{
                                    history.push('/signup')
                                }} variant="dark" >
                                    Not A User?
                                </Button>
                                <Button onClick={forgotPasswordHandler} variant="dark" >
                                    {loading2 && <Spinner animation='border'></Spinner>}
                                    {!loading2 && "Forgot Password"}
                                </Button>
                            </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Login