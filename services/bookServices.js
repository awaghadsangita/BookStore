const models = require('../models/bookModels');
const customerDetailsModel = require("../models/customerDetails");
const nodemailer = require('../middleware/email');
const customer = require('../models/customerDetails');

class BookServices {
    createCustomerDetailsService(data) {
        return new Promise((resolve, reject) => {
            let phoneNumber = new RegExp("^[0-9]{10}$");
            if (phoneNumber.test(data.Phone_Number)) {

                customerDetailsModel.createCustomerDetails(data).then((result) => {
                    console.log(result)
                    nodemailer.nodemailer(result).then((info) => {
                        resolve({result, info})
                    }).catch((err) => {
                        reject(err);
                    })
                }).catch((error) => {
                    reject(error);
                })

            } else {
                reject(422);
            }
        })
    }
    createBookService(data) {
        return new Promise((resolve, reject) => {
            models.createBookDetails(data).then((result) => {
                console.log(result);
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    getBooksDetailsService() {
        return new Promise((resolve, reject) => {
            models.getBooks().then((result) => {
                console.log(result.data);
                resolve(result.data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    searchBookByTitleService(data) {
        let value = data.title;
        let findQuery = { "title": { $regex: value, $options: "i" } }
        return new Promise((resolve, reject) => {
            models.getBooksByTitle(findQuery).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            })
        });
    }
    sortBookByAttributeService(sortAttribute){
       return new Promise((resolve, reject) => {
            models.getBooks(sortAttribute.attribute).then((data) => {
                console.log(data.attribute);
                let books = new Array();
                for (let i = 0; i < data.data.length; i++) {
                    let book = {
                        "_id": data.data[i]._id,
                        "id": data.data[i].id,
                        "author": data.data[i].author,
                        "title": data.data[i].title,
                        "image": data.data[i].image,
                        "quantity": data.data[i].quantity,
                        "price": data.data[i] != undefined ? parseInt(data.data[i].price) : 0,
                        "description": data.data[i].description,
                        "arrivalDate":data.data[i].arrivalDate
                    }
                    books.push(book);
                }
                if (parseInt(data.attribute) ===1) {
                  books.sort((a, b) => (b.price) - (a.price))
                } else if(parseInt(data.attribute)==-1) {
                    books.sort((a, b) => (a.price) - (b.price))
                }
                console.log(" gg",books);
                resolve(books);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    getCustomerDetailsService(loginDetails){
        console.log(loginDetails);
        return new Promise((resolve,reject) => {
            customer.getCustomerDetails(loginDetails).then((data => {
                if (data.password == loginDetails.password) {
                    resolve(data.Books);
                } else {
                    reject({message:"password incorrect"});
                }
            })).catch((error) => {
                reject(error)
            })
        })
    }
}

module.exports = new BookServices();
