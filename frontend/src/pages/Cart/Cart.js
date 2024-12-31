import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";

function Cart() {
    const cart = useSelector(state =>  state.cart);

    return (
        <div>
            <h1>Cart Information</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                { cart.items.map((product, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{product.name}</td>
                        <td><img src={product.image_url} width={50} alt={product.name}/></td>
                        <td>{product.price}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Total</td>
                        <td>${cart.totalPrice}</td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}

export default Cart;