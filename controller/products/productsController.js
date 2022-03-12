import Product from "../../models/Product";


const productsController = {
    async setProducts(req,res){
        const newProducts = new Product(req.body);
        try{
            const saveProduct = await newProducts.save();
            res.status(200).json(saveProduct);
        }catch(err){
            res.status(500).json("Error in product controller");
        }
    },

    /* updated product */
    async updateProducts(req,res){
        try{
            const updatedProduct = await Product.findByIdAndUpdate( req.params.id, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedProduct);
        }catch(err){
            res.status(500).json("error in updated product");
        }
    },

    /* delete product */
    async deleteProducts(req,res){
        try{
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("product has been deleted");
        }catch(err){
            res.status(500).json("error in delete product");
        }
    },

    /* get all products */
    async getAllProducts(req,res){
        try{
            const getProducts = await Product.find();
            res.status(200).json(getProducts);
        }catch(err){
            res.status(500).json("error in get all product");
        }
    }
}

export default productsController;