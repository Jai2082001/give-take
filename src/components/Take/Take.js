import classes from './Take.module.css'
import {useState, useEffect} from 'react';
import Bounce from 'react-reveal/Bounce'
import {Container, Row} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import TakeElement from './TakeElement/TakeElement';
import Navbar from '../Navbar/Navbar'
import { FormControl } from 'react-bootstrap';

const Take = () => {

    const [hoverState, changeHoverState] = useState('');
    const [takeProduct, changeTakeProduct] = useState(false);
    const [product, changeProduct] = useState([]) 
    const [loading, changeLoading] = useState(false);
    const [search, setSearch] = useState('')
    const history = useHistory();
    const userState = useSelector((state)=>{
        return state.user.user
    })

    console.log(search)
    const takeHandler = (productId) => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takeProduct`, {
            headers: {
                productid: productId,
                userid: userState._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            history.push('/profile');
            changeLoading(false)
        })
    }

    const changeHandler = () => {
        if(!userState.status){
            history.push('/login')
        }else{
            changeTakeProduct((prevProduct)=>{
                return !prevProduct
            })
        }        
        
    }

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProduct`, {
            headers: {
                userid: userState._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            changeProduct(response)
        })
    }, [userState])

    return (
        <Fade>
        <div className={takeProduct ? classes.takeDivScrollable : classes.takeDiv}>
            <div className={classes.overlayDiv}>
            </div>
            <div className={classes.upperDiv}>
            <Navbar></Navbar>
            <div className={classes.bigBtn}>
                <button onClick={changeHandler}>{takeProduct && 'Hide'} { !takeProduct && 'Take A Look'}</button>
            </div>
                <Bounce bottom when={takeProduct}>
                    <div className={classes.takeProduct}>
                        {product.length > 0 &&  
                        <Container className={'pt-3'}>
                            <div className={classes.inputContainer}>
                                <FormControl
                                    onChange={(event)=>{

                                        let hm = event.target.value.trim();
                                        setSearch(hm);
                                        
                                    }}
                                    value={search}
                                    placeholder="Search Your Products"
                                />
                            </div>
                            <Row>
                                {product.map((singleItem)=>{
                                    if(!singleItem.takerFinal){
                                        if(search){
                                            const searchElement = `${singleItem.desc.toLowerCase()} ${singleItem.name.toLowerCase()}`
                                            if(searchElement.includes(search.trim().toLowerCase())){
                                                return (
                                                    <TakeElement singleItem={singleItem} userState={userState._id}></TakeElement>                                        
                                                )
                                            }
                                        }else{
                                            return (
                                                <TakeElement singleItem={singleItem} userState={userState._id}></TakeElement>                                        
                                            )
                                        }
                                        
                                    }
                                })}
                            </Row>
                        </Container>}                       
                    </div>
                </Bounce>
            </div>
            
        </div>
        </Fade>
    )
}

export default Take