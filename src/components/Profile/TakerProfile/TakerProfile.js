import classes from './TakerProfile.module.css'
import { useEffect } from 'react'
import { useState } from 'react'

const TakerProfile = ({takerid}) => {

    const [taker, changeTaker] = useState(false)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takerDisplay`, {
            headers: {
                takerid: takerid
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeTaker(response)
        })
    }, [])
    return(
        <div className={classes.takerProfile}>
            {taker && 
            <div className={classes.takeDiv}>
                <p style={{marginBottom: '5px'}}>Contact Details:-</p>
                <p style={{marginBottom: '5px'}}>{taker.name}</p>
                <p style={{marginBottom: '5px'}}>{taker.email}</p>
                <p style={{marginBottom: '5px'}}>{taker.number}</p>
            </div>}
        </div>
    )
}

export default TakerProfile