var express=require("express");
var productsCtrl=require('../controllers/products.ctrl');
var reviewsCtrl= require('../controllers/review.ctrl');
var router=express.Router();
var upload= require('../utilities/uploader');

router.get('/', productsCtrl.getproducts);
router.get('/:pageIndex/:pageSize',productsCtrl.getproducts);
router.get('/:id',productsCtrl.getById);

//router.post('/',productsCtrl.save);
router.post('/', upload.single('image'), productsCtrl.save);
router.delete('/:id',productsCtrl.delete);
router.put('/:id',productsCtrl.update);

router.post('/review',reviewsCtrl.save);
module.exports=router;