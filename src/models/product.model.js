const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    name: String,
    content: String,
    amount: { type: Number, default: 1 },
    image: String,
    price : { type: Number, default: 1000000 },
    createAt: { type: Number, default: Date.now() },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
});

ProductSchema.statics = {
    createProduct(item){
        return this.create(item);
    },
    getProduct(){
        return this.find({}).exec();
    },
    _getProduct(limit, page){
        return this.find({}).skip((page - 1)* limit).limit(limit);
    },
    findProductByID(id){
        return this.findOne({"_id": id }).exec();
    },
    findProductsByName(name){
        return this.find({"name":  {'$regex': name} });
    },
    findProductByIDAndUpdateProduct(id, Product){
        return this.findOneAndUpdate({"_id": id},{ "name":Product.name,"content " :Product.content ,"amount" :  Product.amount, "image": Product.image,"price": Product.price,  "updateAt": Date.now()})
    },
    removeProductByID(id){
        return this.findByIdAndRemove(id).exec();
    },
}
module.exports = mongoose.model("product",ProductSchema);
