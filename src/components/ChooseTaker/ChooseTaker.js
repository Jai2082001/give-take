import classes from './ChooseTaker.module.css'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import SingleTaker from '../SingleTaker/SingleTaker';
import { Modal, Spinner } from 'react-bootstrap'
import Navbar from '../Navbar/Navbar';
import Bounce from 'react-reveal/Bounce'


const ChooseTaker = () => {
    const [product, changeProduct] = useState(false);
    const [takeReq, changeTakeReq] = useState(false);
    const [loading, changeLoading] = useState(false);
    const history = useHistory();
    const takeReqHandler = () => {
        changeTakeReq((prevState)=>{
            return !prevState
        })
    }

    const btnHandler = (taker) => {
        changeLoading(true);
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takerFinal`, {
            headers: {
                product: product._id,
                taker: taker
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            changeLoading(false);
            history.push('/profile');
            console.log(response);
        })
    }

    const params = useParams();

    console.log(params.productId)

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_FETCH_LINK}/productDisplay`, {
          headers: {
              productId: params.productId
          }
      }).then((response)=>{
          return response.json()
      }).then((response)=>{
          console.log(response);
          changeProduct(response);
      })  
    }, [])

    return (
        <>
        <Modal show={loading} >
        <Modal.Body>
            <Spinner animation='border' variant='dark'></Spinner></Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
        <div className={classes.parentDiv}>
            <div className={classes.overlayDiv}></div>
            <div className={classes.upperDiv}>
            <Navbar></Navbar>
            <div className={classes.itemDiv}>
                <div className={classes.childItemDiv}>
                    <div className={classes.productDiv}>
                        <div className={classes.imgDiv}>
                            {product && <img src={product.image[0]}></img>}
                        </div>
                        <div className={classes.nameDiv}>
                            <p>Name of the Product:- {product.name}</p>
                            <p>Quantity of Product:- {product.quantity}</p>
                        </div>
                    </div>
                </div>
                
                {product &&                 
                <div className={classes.takerDiv}>    
                {
                    product.takers && 
                    <> 
                    
                    {product.takers.length > 0 && 
                        <>
                        <button onClick={takeReqHandler} className={classes.takeReqs}>See Take Requests</button>
                             {
                                 takeReq && 
                                 <Bounce  bottom>
                                 <div className={classes.takersDiv}>
                                     <div className={classes.reqBy}>
                                         {
                                             product.takers.map((singleItem)=>{
                                                 return (
                                                     <div className={classes.singleReq}>
                                                         <SingleTaker btnHandler={btnHandler} takerId={singleItem}></SingleTaker>
                                                     </div>
                                                 )
                                             })
                                         }
                                     </div>
                                 </div>
                                 </Bounce> 
                             }
                            
                        
                        
                        </>                     
                    }
                    </>
                }
                {!product.takers && 
                <>
                    <div className={classes.takersNone}>No one has applied for your product</div>
                </>}
                    </div>}
            </div>
            
            </div>
            
        </div> 
        </>
    )
}

export default ChooseTaker