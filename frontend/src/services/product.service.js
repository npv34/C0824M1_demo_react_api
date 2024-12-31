import {instance} from "../configs/axios.config";

class ProductService {
    static async getAllProducts() {
        return await instance.get('/products');
    }
}

export default ProductService;