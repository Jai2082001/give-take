import classes from './Navbar.module.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { NavLink, OverlayTrigger, Popover } from 'react-bootstrap'
import Jello from 'react-reveal/Jello'
import { useDispatch } from 'react-redux'
import { userActions } from '../../Store/UserSlice'

const Navbar = ({status}) => {

    const [hoverState, changeHoverState] = useState('')

    const dispatch = useDispatch()

    const userState = useSelector((state)=>{
        return state.user.user
    })

    const history = useHistory()

    const profileHandler = () => {
        history.push('/profile')
    }
    // const changeState = (value) => {
    //     changeHoverState(value)
    // }
    
    const logoutHandler = () => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/logout`, {
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            dispatch(userActions.changeUser({status: false}))
            history.push('/home')
        })
    }

    const aboutusHandler = () => {
        history.push('/aboutus')
    }

    const contactHandler = () => {
        history.push('/contact')
    }

    console.log(status)
   
    const loginHandler = () => {
        history.push('/login')
    }


    const homeHandler = () => {
        history.push('/home')
    }

    return (
        <div className={classes.navbar}>
                <h3><NavLink onClick={homeHandler} to='/home'>Give And Take</NavLink></h3>
                <ul className={classes.aboutSec}>
                    <li onClick={aboutusHandler}>About Us</li>
                    <li onClick={contactHandler}>Contact</li>
                </ul>
                <ul className={classes.socialDiv}>
                    <OverlayTrigger
                        trigger="click"
                        key={'bottom'}
                        placement={'bottom'}
                        overlay={
                            <Popover id={`popover-positioned-${'bottom'}`}>
                            <Popover.Header as="h3">{`Facebook`}</Popover.Header>
                            <Popover.Header as="h3">{`Twitter`}</Popover.Header>
                            <Popover.Header as="h3">{`Instagram`}</Popover.Header>

                            {/* <Popover.Body>
                                <strong>Holy guacamole!</strong> Check this info.
                            </Popover.Body> */}
                            </Popover>
                        }
                        >
                        <li>Social Media Links</li>
                        </OverlayTrigger>
                </ul>
                <ul>        
                    {status !== 'logout' && 
                    <>
                        <li onClick={profileHandler}>{userState.status && `Hello ${userState.name}`}</li>
                        {!userState.status && <li onClick={loginHandler}>{'Login/Signup'}</li> }                       
                
                    </>}
                    {status === 'logout' && <li onClick={logoutHandler}>Logout</li>}
                </ul> 
                    <div className={classes.socialMediaIcon}>
                    <span onMouseOver={()=>{changeHoverState('facebook')}} onMouseLeave={()=>{changeHoverState('')}} className={classes.socialDescParent}>
                            <i  class="fa fa-facebook"></i> 
                            {hoverState === 'facebook' && <Jello><span className={classes.socialDesc}>Facebook</span></Jello>}
                        </span>
                        <span onMouseOver={()=>{changeHoverState('instagram')}} onMouseLeave={()=>{changeHoverState('')}} className={classes.socialDescParent}>
                            <i  class="fa fa-instagram"></i>
                            {hoverState === 'instagram' && <Jello><span className={classes.socialDesc}>Instagram</span></Jello>}
                        </span>
                         <span onMouseOver={()=>{changeHoverState('twitter')}} onMouseLeave={()=>{changeHoverState('')}} className={classes.socialDescParent}>
                            <i  class="fa fa-twitter"></i> 
                            {hoverState === 'twitter' && <Jello><span className={classes.socialDesc}>Twitter</span></Jello>}
                        </span>
                    </div>
                </div>
    )

}

export default Navbar