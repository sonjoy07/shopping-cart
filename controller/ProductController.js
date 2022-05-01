
const db = require("../models");
const Product = db.products;

//Create a new object
exports.create = (req, res) => {
    console.log(req);
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Product
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        sku: req.body.sku,
        images:req.body.images,
        color:req.body.color,
        size: req.body.size,
        price: req.body.price,
        quantity:req.body.quantity,
    });
    // Save Product in the database
    product
        .save(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        });
};

//Retrieve objects (with condition)
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

//   Retrieve objects (with condition)

exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Product with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id=" + id });
        });
};

// Update an object

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

//   Delete an object

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

//   Find all objects by condition

exports.findAllPublished = (req, res) => {
    Product.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
}

