import { useSelector } from "react-redux"
import classes from './Claim.module.css'
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useHistory } from "react-router"

const Claim = () => {
    
    const userState = useSelector((state)=>{
        return state.user.user
    }) 
    const history = useHistory()
    const [loading, changeLoading] = useState(false);

    console.log(userState)

    const [usercurr, changeUserCurr] = useState(false)
    const [reload, changeReload] = useState(0);


    useEffect(()=>{
        console.log('useEffect')
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takerClaimArray`, {
            headers: {
                user: userState._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log('taker claim Array');
            console.log(response)
            changeUserCurr(response)
        })
    }, [reload])

    const claimHandler = () => {
        changeLoading(true)
        console.log('Claim Handler')
        fetch(`${process.env.REACT_APP_FETCH_LINK}/claimHandler`, {
            headers: {
                user: userState._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            // changeReload((prevState)=>{
            //     return prevState++
            // })
            history.push('/home')
            changeLoading(false)
        })
    }


    console.log(usercurr)

    return (
        <div className={classes.claimDiv}>

            {usercurr.awardStatus !== 'pending' && usercurr.awardStatus !== 'accepted' && 
            <>
            {(usercurr.tempClaimArray && !usercurr.awardStatus) && 
                <>
                    {(usercurr.tempClaimArray.length>0 && usercurr.tempClaimArray.length < 3) && 
                    <div className={classes.takerClaim}>
                        {`You can claim your gift when your 3 products have been taken, Currently your ${usercurr.tempClaimArray.length} have been taken`}
                    </div>}
                    {(usercurr.tempClaimArray.length>0 && usercurr.tempClaimArray.length >= 3) && 
                    <div className={classes.takerClaim}>
                        {loading && <Spinner animation='border'></Spinner>}
                        {!loading && <button onClick={claimHandler}>{`Claim Your Gift`}</button>}
                    </div>}
                    {usercurr.tempClaimArray.length === 0 && 
                        <div className={classes.takerClaim}>
                            {`To Apply for the gift you have to make donation which are taken by 3 person`}
                        </div>
                    }
                </>
            }        

            {
            !usercurr.takerClaimArray && !usercurr.tempClaimArray &&
            <div className={classes.claimDivEmpty}>
                {`To Apply for the gift you have to make donation which are taken by 3 person`}
            </div> 
            }
            
            </>
            }
            {usercurr.awardStatus === 'pending' && 
            <div className={classes.claimDivEmpty}>
                {'You Request is pending with Admin'}
            </div>
            }       

            {usercurr.awardStatus === 'accepted' && usercurr.tempClaimArray.length === 0 && 
            <div className={classes.claimDivEmpty}>
                {'Your Request has been accepted soon you will be contacted'}
            </div>}     

            {usercurr.awardStatus === 'accepted' && usercurr.tempClaimArray.length > 0 &&
            <>
                {(usercurr.tempClaimArray.length>0 && usercurr.tempClaimArray.length < 3) && 
                    <div className={classes.takerClaim}>
                        {`You can claim your gift when your 3 products have been taken, Currently your ${usercurr.tempClaimArray.length} have been taken`}
                    </div>}
                {(usercurr.tempClaimArray.length>0 && usercurr.tempClaimArray.length >= 3) && 
                    <div className={classes.takerClaim}>
                        {loading && <Spinner animation='border'></Spinner>}
                        {!loading && <button onClick={claimHandler}>{`Claim Your Gift`}</button>}
                </div>}
            </>}
            
        </div>
    )
}

export default Claim