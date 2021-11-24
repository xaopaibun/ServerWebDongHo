const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProductSchema = new Schema({
    name: String,
    content: {type : String, default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"},
    amount: { type: Number, default: 1 },
    image: String,
    price : { type: Number, default: 1000000 },
    createAt: { type: Number, default: Date.now() },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null },
});

ProductSchema.statics = {
    createProduct(data) {
        return this.create(data);
    },
    getProduct() {
        return this.find({}).sort({ "createAt": -1 }).exec();
    },
    _getProduct(limit, page) {
        return this.find({}).skip((page - 1) * limit).limit(limit).sort({ "createAt": -1 }).exec();
    },
    findProductByID(id) {
        return this.findOne({ "_id": id }).exec();
    },
    findProductsByName(name) {
        return this.find({ "name": { '$regex': name } });
    },
    findProductByIDAndUpdateProduct(id, Product) {
        return this.findOneAndUpdate({ "_id": id }, { $set: { "name": Product.name, "content ": Product.content, "amount": Product.amount, "image": Product.image, "price": Product.price, "updateAt": Date.now() } })
    },
    removeProductByID(id) {
        console.log(id)
        return this.findByIdAndRemove(id).exec();
    },
}
module.exports = mongoose.model("product", ProductSchema);
