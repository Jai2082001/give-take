import {useEffect, useState} from 'react'
import classes from './SingleTake.module.css'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SingleTake = ({singleId}) => {
    
    const [taker, changeTaker] = useState(false);

    console.log(singleId)

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takerProductDisplay`, {
            headers: {
                productid: singleId
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            changeTaker(response)
        })
    }, [])

    console.log(taker)
    return (
        <>
        {taker.takerFinal && 
        <div className={classes.donationChild}>
        <div className={classes.childDiv} >
        <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="button-tooltip-2">You will be contacted by donor</Tooltip>}
        >
            {({ ref, ...triggerHandler }) => (
            // <Button
            //     variant="light"
            //     {...triggerHandler}
            //     className="d-inline-flex align-items-center"
            // >
            //     <span className="ms-1">Hover to see</span>
            // </Button>
            <div {...triggerHandler}  ref={ref} className={classes.banner}>Accepted</div>
            )}
        </OverlayTrigger>
            
            <div className={classes.imgDiv}>
                <img src={taker.image[0]}></img>
            </div>
            <div className={classes.contentChildDiv}>
                <h3>{taker.name}</h3>
                <h4>{taker.quantity}</h4>
            </div>
        </div>
    </div>}
    
    {taker && 
    <>
    {!taker.takerFinal && 
        <div className={classes.donationChild}>
            <div className={classes.childDiv} >
                <div className={classes.imgDiv}>
                    <img src={taker.image[0]}></img>
                </div>
                <div className={classes.contentChildDiv}>
                    <h3>{taker.name}</h3>
                    <h4>{taker.quantity}</h4>
                    <h5>Approval Within Donor</h5>
                </div>
            </div>
        </div>
        }        
    </>
    }
        
        </>
    )
}
export default SingleTake