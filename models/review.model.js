var mongoose=require('mongoose');
module.exports = mongoose.model('Review',
                    {
                        productId: {type: String, required:true },
                        name: {type: String, required:true },
                        rating :{type: Number, required:true },
                        heading: String,
                        message: String
                    })