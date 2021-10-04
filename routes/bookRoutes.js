const express = require('express');
const router = express.Router();
const controller = require('../controller/bookController');

router.post('/createBookDetails', controller.createBooksController);
router.get('/getBookDetails', controller.getBookDetailsController);
router.get('/searchBookByTitle', controller.searchBookByTitleController);
router.get('/sortBookByAttribute', controller.sortByAttributeController);
router.post('/customerDetails', controller.createCustomerDetails);
router.get('/getCustomer', controller.getCustomerDetailsController);

module.exports = router;
