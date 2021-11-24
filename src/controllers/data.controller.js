const rp = require("request-promise");
const cheerio = require("cheerio");
const productModel = require('../models/product.model');
let listCategoryProduct = [];
let count = 1;
const crawler = async (req, res) => {
    if (!req.params.category_product) {
        return res.status(400).send({ success: false, message: 'Params Category Product null' });
    }

    if (listCategoryProduct.indexOf(req.params.category_product) === -1) {
        while (count < req.params.count) { 
            console.log(count)
            const URL = "https://www.dangquangwatch.vn/sp/" + req.params.category_product + '.html?&page=' + count;
            const options = {
                uri: URL,
                transform: (body) => cheerio.load(body)
            };
            try {
                var $ = await rp(options);
            } catch (error) {
                console.log('error', error)
                //return error;
            }
            const ItemContent = $(".product .group .item");
            for (let i = 0; i < ItemContent.length; i++) {
                let item = $(ItemContent[i]);
                let name = item.find(".name > h3").text().trim();
                let image = item.find(".wImage .image .lazy").attr("data-src");
                let price = item.find(".price .new ").text().trim();
                price = parseInt(price.slice(0, price.length - 2).replace(".", '').replace(".", ''))
                await productModel.createProduct({ name, image, price });
            }
            // listCategoryProduct.push(req.params.category_product);
            count = count + 1;
        }
        count = 1;
        res.status(200).send({ success: true, listCategoryProduct });
    }
    else {
        res.status(400).send({ success: false, message: "Category Product Already Exist" });
    }



};

module.exports = {
    crawler
}