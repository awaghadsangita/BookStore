const service = require('../services/bookServices');
const constantParam = require('../static');
class BookController {

    createBooksController(req, res) {
        let responseResult = {};
        req.checkBody('author', 'author name is required').notEmpty();
        req.checkBody('title', 'title is required').notEmpty();
        req.checkBody('image', 'image url is required').isURL();
        req.checkBody('price', 'price is required').notEmpty();
        req.checkBody('description', 'description is required').notEmpty();
        let error = req.validationErrors();
        if (error) {
            responseResult.sucess = false;
            responseResult.message = "Please enter proper value";
            responseResult.errors = error;
            res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(error)
        } else {
            let reqBody = {
                author: req.body.author,
                title: req.body.title,
                image: req.body.image,
                price: req.body.price,
                description: req.body.description
            };
            service.createBookService(reqBody).then((result) => {
                responseResult.sucess = true;
                responseResult.message = "Registration success";
                responseResult.result = result;
                res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult)

            }).catch((error) => {
                responseResult.sucess = false;
                responseResult.message = "Error while saving data";
                responseResult.error = error;
                res.status(constantParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult)

            })
        }
    }

    getBookDetailsController(req, res) {
        let responseResult = {};
        service.getBooksDetailsService().then(result => {
            if (result.length == 0) {
                responseResult.sucess = true;
                responseResult.message = "No Book available";
                responseResult.result = result;
            } else {
                responseResult.sucess = true;
                responseResult.message = "Successfully fetched data from DB";
                responseResult.result = result;
            }
            res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult)
        }).catch(error => {
            responseResult.sucess = false;
            responseResult.message = "Error while retrieving books details";
            responseResult.errors = error;
            res.status(constantParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult)
        })
    }

    searchBookByTitleController(req, res) {
         let searchData={
            title:req.query.title!=undefined?req.query.title:""
        }
        let responseResult = {};
        service.searchBookByTitleService(searchData).then((result) => {
            responseResult.sucess = true;
            if(result.length!=0)
                responseResult.message = "Successfully fetched data from DB";
            else
                responseResult.message = "No Book Found";
            responseResult.result = result;
            res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult)
        }).catch((error) => {
            responseResult.sucess = false;
            responseResult.message = "Error while retrieving books details";
            responseResult.errors = error;
            res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult)
        });
    }

    createCustomerDetails(req, res) {
        let responseResult = {};
        req.checkBody("Name", "Name should not be  empty").notEmpty();
        req.checkBody("Name", "Name should be minimum 3 letters or maximum 20 letters").isLength({ min: 2, max: 20 })
        req.checkBody("Phone_Number", "phone_number cannot be empty").notEmpty();
        req.checkBody("Pincode", "pincode cannot be empty").isInt();
        req.checkBody("Pincode", "pincode should be 6 digit number").isLength({ min: 6, max: 6 });
        req.checkBody("Address", "address field cannot be empty").notEmpty();
        req.checkBody("city", "city name cannot be empty").isAlpha();
        req.checkBody("LandMark", "LandMark should be specified").notEmpty();
        req.checkBody("Type", "Type should be specified").isAlpha();
        req.checkBody("Email", "email should be specified").isEmail();
        req.checkBody("userName","username should be specified").notEmpty();
        req.checkBody("password","password should be specified").notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            responseResult.sucess = false;
            responseResult.message = "Please enter proper inputs";
            responseResult.errors = errors;
            res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            let reqBody = {
                Name: req.body.Name,
                Phone_Number: req.body.Phone_Number,
                Pincode: req.body.Pincode,
                Address: req.body.Address,
                city: req.body.city,
                LandMark: req.body.LandMark,
                Email: req.body.Email,
                Type: req.body.Type,
                userName:req.body.userName,
                Books:req.body.Books,
                password:req.body.password
            };

            service.createCustomerDetailsService(reqBody)
                .then((data) => {
                    responseResult.sucess = true;
                    responseResult.message = "Registration success";
                    responseResult.result = data;
                    res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult);
                })
                .catch((error) => {
                    responseResult.status = error.status;
                    responseResult.sucess = false;
                    responseResult.message = "Validation Error";
                    responseResult.errors = error.data;
                    res.status(constantParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode).send(responseResult);
                })
        }
    }
    sortByAttributeController(req,res){
        req.check('attribute', 'attribute is required').notEmpty();
        let responseResult = {};
        let attribute={attribute:req.query.attribute}
        service.sortBookByAttributeService(attribute).then((result) => {
            responseResult.sucess = true;
            responseResult.message = "Successfully fetched sorted data from DB";
            responseResult.result = result;
            res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult)
        }).catch((error) => {
            responseResult.sucess = false;
            responseResult.message = "Error while retrieving books details";
            responseResult.errors = error;
            res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult)
        });
    }

    getCustomerDetailsController(req,res) {
        console.log("reqqqqqq",req.body);
        let responseResult = {};
        req.checkBody('userName', 'user name is required').notEmpty();
        req.checkBody('password', 'password is required').notEmpty();
        const errors = req.validationErrors();
        if (errors) {
            responseResult.sucess = false;
            responseResult.message = "Please enter proper inputs";
            responseResult.errors = errors;
            res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult);
        } else {
            let reqBody = {
              userName:req.body.userName,
              password:req.body.password
            };
            service.getCustomerDetailsService(reqBody).then((result) => {
                responseResult.sucess = true;
                responseResult.message = "Here is your Details";
                responseResult.result = result;
                res.status(constantParam.staticHTTPSuccessMessages.OK.successResponseCode).send(responseResult)
            }).catch((error) => {
                responseResult.sucess = false;
                responseResult.message = "Error while retrieving customer details";
                responseResult.errors = error;
                res.status(constantParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode).send(responseResult)
            });
        }
    }
}

module.exports = new BookController();


