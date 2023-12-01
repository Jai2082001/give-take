import { useEffect, useState } from 'react'
import classes from './Profile.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {userActions} from '../../Store/UserSlice';
import SingleProduct from './SingleProduct/SingleProduct';
import { Redirect, useHistory } from 'react-router';
import {Spinner} from 'react-bootstrap'
import SingleTake from './SingleTake/SingleTake';
import Bounce from 'react-reveal/Bounce'
import Flip from 'react-reveal/Flip'
import Navbar from '../Navbar/Navbar';
import Claim from './Claim/Claim';

const Profile = () =>  {

    const [hoverState, changeHoverState] = useState('');
    const [loading, changeLoading] = useState(false);
    const [takeLoading, changeTakeLoading] = useState(false); 
    const [donation, changeDonation] = useState([]);
    const [takeReq, changeTakeReq] = useState([]);
    const [content, changeContent] = useState('');
    const [loading2, changeLoading2] = useState(false);
    const [claim, changeClaim] = useState(false);
    const [claimMsg, changeClaimMsg] = useState('');
    const dispatch = useDispatch();
    const history = useHistory() 

    const userState = useSelector((state)=>{
        return state.user.user
    })


    const changeHandler = (action) => {
        console.log(action)
        if(action === 'donation'){
            if(content === 'donation'){
                changeContent('')
            }else{
                changeContent('donation')
            }
        }
        if(action==='take'){
            if(content === 'take'){
                changeContent('')
            }else{
                changeContent('take')
            }
        }
        if(action === 'claim'){
            if(content === 'claim'){
                changeContent('')
            }else{
                changeContent('claim')
            }
        }
    }
    
    
    useEffect(()=>{
        changeLoading(true);
        changeTakeLoading(true);
        if(userState._id){
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayDonation`, {
                headers: {
                    id: userState._id
                }
            }).then((response)=>{
                return response.json();
            }).then((response)=>{
                changeLoading(false)
                fetch(`${process.env.REACT_APP_FETCH_LINK}/takeReq`, {
                    headers: {
                        userid: userState._id
                    }
                }).then((response)=>{
                    return response.json()
                }).then((resp)=>{
                    changeDonation(response)
                    changeTakeReq(resp)
                    changeTakeLoading(false)
                })            
            })
        }
        
    }, [userState])


    if(!userState._id){
        return  (
            <Redirect to='/home'></Redirect>
        )
    }
    return (
        <div className={classes.profileDiv}>
            <div className={classes.overlayDiv}>

            </div>
            <div className={classes.upperDiv}>
                <Navbar status={'logout'}></Navbar>
                <div className={classes.donationBtn}>
                    <button onClick={()=>{changeHandler('donation')}}>{content === 'donation' && 'Hide Donations'}{!(content === 'donation') && 'Your Donations'}</button>
                    <button onClick={()=>{changeHandler('take')}}>Take Requests</button>
                    <button onClick={()=>{changeHandler('claim')}}>{content === 'claim' && 'Hide'}{content !== 'claim' && 'Claim your award'}</button>
                </div>

            
                {content === 'donation' && 
                <Bounce bottom opposite>
                <div className={classes.contentDiv}>
                    <p>{'Your Donations'}</p>
                    <div className={classes.productParent}>
                    {loading && <Spinner animation='border'></Spinner>}
                    {!loading && donation.map((singleItem)=>{
                        return (
                            <SingleProduct singleItem={singleItem}></SingleProduct>
                        )
                    })}
                    </div>

                    <p>{"Thank you for contributing"}</p>
                    <p>{"If you have depsited a product, it will be reflected after a short time"}</p>
                </div>
                </Bounce>
                }

                {content === 'take' && 
                <Bounce bottom opposite>
                <div className={classes.contentDiv}>
                    <h3>{'Your Take Requests'}</h3>
                    <div className={classes.donationDiv}>
                        
                        {takeLoading && <Spinner animation='border' variant='light'></Spinner>}
                        
                        {!takeLoading && takeReq.map((singleItem)=>{
                           return (
                            <SingleTake singleId={singleItem}></SingleTake>
                           )      
                        }) }
                        
                    </div>
                </div>
                </Bounce>
                }
                {
                    content === 'claim' &&
                    <Flip top>
                        <Claim></Claim>
                    </Flip> 
                    // <Bounce bottom opposite>
                    //     <h3>{'Your Claim Requests'}</h3>
                    // </Bounce>
                }

            </div>
            
        </div>    )
}

export default Profile