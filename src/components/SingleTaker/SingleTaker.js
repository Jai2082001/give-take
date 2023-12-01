import classes from './SingleTaker.module.css'
import { useEffect, useState } from 'react'

const SingleTaker = ({takerId, btnHandler}) => {

    const [taker, changeTaker] = useState(false)
    const [loading, changeLoading] = useState(false);
    


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takerDisplay`, {
            headers: {
                takerid: takerId
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            changeTaker(response)
        })
    }, [])

    return (
        <>
        {taker && 
        <div className={classes.takerDiv}>
            <div className={classes.infoDiv}>
            <p>{taker.name}</p>
            <p>{taker.email}</p>
            <p>{taker.number}</p>
            </div>
            <div className={classes.btnDiv}>
                <button onClick={()=>{btnHandler(taker._id)}}>Lets Do It</button>
            </div>
        </div>}
        
        </>
    )
}

export default SingleTaker