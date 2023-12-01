import { useState } from "react"
import classes from './Home.module.css'
import Fade from 'react-reveal/Fade'
import { useHistory } from "react-router"
import Jello from 'react-reveal/Jello';
import Bounce from 'react-reveal/Bounce'
import { useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const Home = (page) => {

    const history = useHistory()

    // const changeState = (value) => {
    //     changeHoverState(value)
    // }
    
    const giveHandler = () => {
        history.push('/give')
    }
    
    const takeHandler = () => {
        history.push('/take')
    }
    

    
    return (
        <Fade>
            <div className={classes.homeDiv}>
                <div className={classes.overlayDiv}>

                </div>
                <div className={classes.upperDiv}>
               <Navbar></Navbar>
                <Bounce bottom>
                <div className={classes.bigBtns}>
                        <div className={classes.btns}>
                                <div className={classes.quote}>Giving is not just making a donation. It is about making a difference</div>
                                <div style={{textAlign: 'right', fontSize:  '18px'}}>-Kathy Calvin</div>
                                <button onClick={giveHandler}>Give</button> 
                                <button onClick={takeHandler} style={{marginLeft: '10px'}}>Take</button>
                        </div>
                </div>
                </Bounce>
                </div>
            </div>
        </Fade>
    )
}

export default Home