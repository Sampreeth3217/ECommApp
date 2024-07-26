const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const ProductsApp = express.Router();

// Middleware
ProductsApp.use(express.json());



ProductsApp.get('/products', expressAsyncHandler( async (req, res) => {
  let productsCollection=req.app.get('productsCollection')
  let productList=await  productsCollection.find().toArray()
  res.send({message:'products',payload:productList})
}));

ProductsApp.get('/products/:id',expressAsyncHandler(async (req, res) => {
  let productsCollection=req.app.get('productsCollection');
  let  productID=Number(req.params.id)
  let product=await productsCollection.findOne({id:productID})
  res.send({message:'product',payload:product})
}));

ProductsApp.post('/products', (req, res) => {
  let product = req.body;
  productList.push(product);
  res.send({
    message: 'product added successfully',
    payload: productList
  });
});

ProductsApp.put('/products', (req, res) => {
  let product = req.body;
  let id = product.id;
  let index = productList.findIndex(product => product.id == id);
  if (index == -1) {
    res.send({ message: 'product not found' });
  } else {
    productList[index] = product;
    res.send({
      message: 'product updated successfully',
      payload: productList
    });
  }
});

ProductsApp.delete('/products', (req, res) => {
  let product = req.body;
  let id = product.id;
  let index = productList.findIndex(product => product.id == id);
  if (index == -1) {
    res.send({ message: 'product not found' });
  } else {
    productList.splice(index, 1);
    res.send({
      message: 'product deleted successfully',
      payload: productList
    });
  }
});

module.exports = ProductsApp;
