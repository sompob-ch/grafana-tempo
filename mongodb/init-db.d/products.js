db = db.getSiblingDB('products');
db.products.drop();
db.products.insertMany([
    {
        "_id": ObjectId("67ae091615d4bca297a00aa1"),
        "name": "Product A",
        "price": 100,
        "quantity": 10,
    }
]);