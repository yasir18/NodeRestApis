var mongoose=require('mongoose');
module.exports = mongoose.model('Review',
                    {
                        productId: String,
                        name: String,
                        rating : String,
                        heading: String,
                        message: String
                    })