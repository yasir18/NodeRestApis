var express=require("express");
var productsCtrl=require('../controllers/products.ctrl');
var router=express.Router();

router.get('/',productsCtrl.getproducts);
router.get('/:id',productsCtrl.getById);

router.post('/',productsCtrl.save);
router.delete('/:id',productsCtrl.delete);
router.put('/:id',productsCtrl.update);

module.exports=router;