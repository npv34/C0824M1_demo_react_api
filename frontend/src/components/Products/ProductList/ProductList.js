import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useEffect, useState} from "react";
import ProductService from "../../../services/product.service";
import {Col, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addToCart} from "../../../redux/features/cartSlice";

function ProductList() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        ProductService.getAllProducts().then(res => {
            console.log(res.data)
            setProducts(res.data)
        })
    }, []);


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <>
            <Row>
                { products.length > 0 && products.map(((product, index) => (
                   <Col md={3} className="justify-content-center mt-3">
                       <Card style={{ width: '18rem' }}>
                           <Card.Img variant="top" src={product.image_url} />
                           <Card.Body>
                               <Card.Title>{product.name} - ${product.price}</Card.Title>
                               <Card.Text>
                                   {product.description}
                               </Card.Text>
                               <Button variant="primary" onClick={() => handleAddToCart(product)}>Add to cart</Button>
                           </Card.Body>
                       </Card>
                   </Col>
                )))}
            </Row>

        </>
    )
}

export default ProductList;