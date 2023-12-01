import {  useState } from 'react'
import { OverlayTrigger, Tooltip, Image,Button, Spinner } from 'react-bootstrap'
import classes from './SingleProduct.module.css'
import { useHistory } from 'react-router'
import TakerProfile from '../TakerProfile/TakerProfile'

const SingleProduct = ({singleItem}) => {

    
    const [taker, changeTaker] = useState([])
    const [loading, changeLoading] = useState(false)
    const history = useHistory();



    const deleteHandler = () => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/deleteElement`, {
            headers: {
                deleteid: singleItem._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response);
            history.push('/home')
        })
    }

    console.log(taker);


    const changeHandler = () => {
        if(!(singleItem.takerFinal)){
            history.push(`/chooseTaker/${singleItem._id}`)
        }else{
            return 
        }
    }

    return (
        <>


        {loading && <Spinner animation='border'></Spinner>}
        {!loading && 
        <>
            {!singleItem.takerFinal && 
        <div className={classes.donationChild}>            
            <div className={classes.childDiv} >
                <div className={classes.deleteDiv} onClick={deleteHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="20" height="20"
                viewBox="0 0 24 24"
                style={{fill:'#000000'}}><path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path></svg>
                </div>
                <div className={classes.imgDiv} onClick={changeHandler}>
                    <img src={singleItem.image[0]}></img>
                </div>
                <div className={classes.contentChildDiv}>
                    <h3>{singleItem.name}</h3>
                    <h4>{singleItem.quantity}</h4>
                    <h5>{`${singleItem.address1} ${singleItem.address2},  ${singleItem.city} ${singleItem.state} `}</h5>
                </div>
            </div>
        </div>}
        
        {singleItem.takerFinal && 
        <>
        <div className={classes.donationChild}>

        </div>
        <div className={classes.donationChild}>
             <div className={classes.childDiv}>
                <div className={classes.imgDiv}>
                    <img src={singleItem.image[0]}></img>
                </div>
                <div className={classes.contentChildDiv}>
                    <h3>{singleItem.name}</h3>
                    <h4>{singleItem.quantity}</h4>

                    <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="button-tooltip-2"><TakerProfile  takerid={singleItem.takerFinal}></TakerProfile></Tooltip>}
                    >
                    {({ ref, ...triggerHandler }) => (
                    <Button
                        variant="dark"
                        {...triggerHandler}
                        className="d-inline-flex align-items-center"
                    >  
                        <span ref={ref} className="ms-1">Taken By</span>
                    </Button>
                    )}
                </OverlayTrigger>
                </div>
            </div>
        </div>
        </>
        }
      
        </>}
          
        </>
    )
}

export default SingleProduct