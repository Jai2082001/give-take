import {useState} from 'react';
import { Col, Card, Button, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';


const TakeElement = ({singleItem, userState}) => {
    
    const [loading, changeLoading] = useState(false);
    const history = useHistory();

    const takeHandler = (productId) => {
        changeLoading(true)
        fetch(`${process.env.REACT_APP_FETCH_LINK}/takeProduct`, {
            headers: {
                productid: productId,
                userid: userState
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            history.push('/profile');
            changeLoading(false)
            console.log(response)
        })
    }

    return (
        <Col lg={'4'} md={'6'}>
            <Card className={'mb-3'}>
            <Card.Img variant="top" src={`${singleItem.image[0]}`} />
                <Card.Body>
                    <Card.Title>{singleItem.name}</Card.Title>
                        <Card.Text>
                            {singleItem.desc}
                        </Card.Text>
                        <Card.Text>
                            {`${singleItem.address1} ${singleItem.address2}, ${singleItem.city} ${singleItem.state}`}
                        </Card.Text>
                        <Button variant="dark" onClick={()=>{takeHandler(singleItem._id)}}>{!loading && 'Take It!'}{loading && <Spinner animation='border'></Spinner>}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TakeElement