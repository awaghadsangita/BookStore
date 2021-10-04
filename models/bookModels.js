const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    id: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    arrivalDate:{
        type:Date,
        required:true
    },
    cart:{
        type:Boolean,
        default:false
    }

}, {
    timestamps: true
});

const bookstore = mongoose.model('NewBookStore', bookSchema);

class BookModels {
    createBookDetails(data) {
        let book = new bookstore({
            "id": data.id,
            "author": data.author,
            "title": data.title,
            "image": data.image,
            "price": data.price,
            "description": data.description,
            "arrivalDate":new Date()
        });
        return new Promise((resolve, reject) => {
            bookstore.find({ 'title': data.title }).then(result => {
                if (result.length <= 0) {
                    book.save((err, result) => {
                       if (err) {
                            reject(500);
                        } else {
                            resolve({ message: "saved in database", result })
                        }
                    });
                } else {
                    reject(400);
                }
            }).catch(error => {
                reject(500)
            })
        });
    }

    getBooks(attribute) {
        return new Promise((resolve, reject) => {
            bookstore.find({}, (error, data) => {
                if (error) {
                    reject(500)
                } else {
                    console.log(data);
                    resolve({data:data,attribute:attribute});
                }
            })
        })
    }

    getBooksByTitle(field) {
        return new Promise((resolve, reject) => {
            bookstore.find(field, (error, result) => {
                if (error) {
                    reject(500)
                } else {
                    resolve(result);
                }
            })
        })
    }
}

module.exports = new BookModels();

