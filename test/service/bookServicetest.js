const chai = require('chai');
const sinon = require('sinon');
const bookService = require('../../services/bookServices');
const BookModel = require("../../models/bookModels");
const customerDetailModel=require('../../models/customerDetails');
let nodeMailer=require("../../middleware/email");
const constantParam = require('../../static');
let sandbox;
let bookModelStub;
let nodeMailerStub;
describe("getBooksDetailsService service", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub = sandbox.stub(BookModel, "getBooks");
    });
    after(function () {
        BookModel.getBooks.restore();
    });

    it("should return proper json array", (done) => {
        let expectedListOfBook = {
            "data":[{
                "id": 1,
                "author": "suraj",
                "title": "abc",
                "image": "http",
                "price": 12560,
                "description": "what is difference"
            }]
            }
        bookModelStub.returns(Promise.resolve(expectedListOfBook));
        bookService.getBooksDetailsService().then(data => chai.expect(data).to.be.eql(expectedListOfBook.data));
        done();
    });

    it("should return error", (done) => {
        bookModelStub.returns(Promise.reject(500));
        bookService.getBooksDetailsService().catch(data => chai.expect(data).to.be.eql(constantParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR.errorResponseCode));
        done();
    });
});

describe("createBookDetailsService service", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub = sandbox.stub(BookModel, "createBookDetails");
    });
    after(function () {
        BookModel.createBookDetails.restore();
    });

    it("should return proper json array", (done) => {
        let givenBook = {
            "id": 1,
            "author": "suraj",
            "title": "abc",
            "image": "http",
            "price": 12560,
            "description": "what is difference"
        };
        let expectedBook = {
            "_id": "jfjsdhfjjooa12198384",
            "id": 1,
            "author": "suraj",
            "title": "abc",
            "image": "http",
            "price": 12560,
            "description": "what is difference"
        };
        bookModelStub.returns(Promise.resolve(expectedBook));
        bookService.createBookService(givenBook).then(data => chai.expect(data).to.be.eql(expectedBook));
        done();
    });



    it("should return status code  400 for wrong entry", (done) => {
        bookModelStub.returns(Promise.reject(500));
        bookService.createBookService(500).catch(data => chai.expect(data).to.be.eql(500));
        done();
    });
});

describe("getBooksByTitle service", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub = sandbox.stub(BookModel, "getBooksByTitle");
    });
    after(function () {
        BookModel.getBooksByTitle.restore();
    });

    it("should return proper json array", (done) => {
        let givenSearchData = {
            "title": "abc",
        };

        let expectedBook = {
            "_id": "jfjsdhfjjooa12198384",
            "id": 1,
            "author": "suraj",
            "title": "abc",
            "image": "http",
            "price": 12560,
            "description": "what is difference"
        };
        bookModelStub.returns(Promise.resolve(expectedBook));
        bookService.searchBookByTitleService(givenSearchData).then(data => chai.expect(data).to.be.eql(expectedBook));
        done();
    });

    it("should return error 500", (done) => {
        bookModelStub.returns(Promise.reject(500));
        bookService.searchBookByTitleService(500).catch(data => chai.expect(data).to.be.eql(500));
        done();
    });
});

describe("sort Book By price service", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub = sandbox.stub(BookModel, "getBooks");
    });
    after(function () {
        BookModel.getBooks.restore();
    });
    it("should return proper data for sorting by price low to high", (done) => {
        let data={
                attribute:-1
        };
        let expectedBook = {"data":[{
                "_id": "RRR",
                "id": "1",
                "author": "vishal",
                "title": "BBB",
                "image": "RRr",
                "quantity": "4",
                "price": "90",
                "description": "rrrrrr",
                "arrivalDate": "$5/45/45"
            },{
            "_id": "RRR",
            "id": "2",
            "author": "lalit",
            "title": "B3B",
            "image": "null",
            "quantity": "45",
            "price": "45",
            "description": "55555",
            "arrivalDate": "$5/45/45"
        },],
                "attribute":-1
        };

        let expectedData=[
            {
                "_id": "RRR",
                "id": "2",
                "author": "lalit",
                "title": "B3B",
                "image": "null",
                "quantity": '45',
                "price": 45,
                "description": "55555",
                "arrivalDate": "$5/45/45"
            },
            {
                "_id": "RRR",
                "id": "1",
                "author": "vishal",
                "title": "BBB",
                "image": "RRr",
                "quantity": "4",
                "price": 90,
                "description": "rrrrrr",
                "arrivalDate": "$5/45/45"
            }]

        bookModelStub.returns(Promise.resolve(expectedBook));
        bookService.sortBookByAttributeService(data).then(
            newData => chai.expect(newData).to.be.eql(expectedData));
        done()
});
    it("should return proper data for sorting by price high to low ", (done) => {
        let data={
            attribute:1
        };
        let expectedBook = {"data":[{
                "_id": "RRR",
                "id": "1",
                "author": "vishal",
                "title": "BBB",
                "image": "RRr",
                "quantity": "4",
                "price": "1800",
                "description": "rrrrrr",
                "arrivalDate": "$5/45/45"
            },{
                "_id": "RRR",
                "id": "2",
                "author": "lalit",
                "title": "B3B",
                "image": "null",
                "quantity": "45",
                "price": "4500",
                "description": "55555",
                "arrivalDate": "$5/45/45"
            },],
            "attribute":1
        };

        let expectedData=[
            {
                "_id": "RRR",
                "id": "2",
                "author": "lalit",
                "title": "B3B",
                "image": "null",
                "quantity": '45',
                "price": 4500,
                "description": "55555",
                "arrivalDate": "$5/45/45"
            },
            {
                "_id": "RRR",
                "id": "1",
                "author": "vishal",
                "title": "BBB",
                "image": "RRr",
                "quantity": "4",
                "price": 1800,
                "description": "rrrrrr",
                "arrivalDate": "$5/45/45"
            }]

        bookModelStub.returns(Promise.resolve(expectedBook));
        bookService.sortBookByAttributeService(data).then(
            newData => chai.expect(newData).to.be.eql(expectedData));
        done()
    });
    it("should return 500 error code for wrong values ", (done) => {

        bookModelStub.returns(Promise.reject(500));
        bookService.sortBookByAttributeService(500).catch(
            newData => chai.expect(newData).to.be.eql(500));
        done()
    });
});

describe("create customer details", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub = sandbox.stub(customerDetailModel, "createCustomerDetails");
    });
    after(function () {
       customerDetailModel.createCustomerDetails.restore();
    });
    it("should store proper data for customers", (done) => {

        let expectedCustomerDetails= {
                Name: 'vishal',
                Phone_Number: 9876543210,
                Pincode: '400040',
                Address: "gyririiri",
                city: "mumbai",
                Email: "gail@gmail.com",
                LandMark: "Worli",
                Type: "Home"

        };
        bookModelStub.returns(Promise.resolve(expectedCustomerDetails));
        bookService.createCustomerDetailsService(expectedCustomerDetails).then(
            newData => chai.expect(newData).to.be.eql(expectedCustomerDetails));
        done()
    });
    it("should throw status 422 for wrong phonenumber", (done) => {

        let expectedCustomerDetails= {
            Name: 'vishal',
            Phone_Number: 987654320,
            Pincode: '400040',
            Address: "gyririiri",
            city: "mumbai",
            Email: "gail@gmail.com",
            LandMark: "Worli",
            Type: "Home"

        };
        bookModelStub.returns(Promise.resolve(expectedCustomerDetails));
        bookService.createCustomerDetailsService(expectedCustomerDetails).catch(
            newData => chai.expect(newData).to.be.eql(422));
        done()
    });
    it("should throw status 500 ",(done)=>{
        let expectedCustomerDetails= {
            Phone_Number: 9876543210
        };
        bookModelStub.returns(Promise.reject(500));
        bookService.createCustomerDetailsService(expectedCustomerDetails).catch(
            newData => chai.expect(newData).to.be.eql(500));
        done()
    })
});
describe("mocking of nodemailer class", () => {
    before(function () {
        sandbox = sinon.createSandbox();
        bookModelStub=sandbox.stub(customerDetailModel,"createCustomerDetails");
        nodeMailerStub = sandbox.stub(nodeMailer, "nodemailer");
    });
    after(function () {
        customerDetailModel.createCustomerDetails.restore();
        nodeMailer.nodemailer.restore()
    });
    it("should throw error of nodemailer 500 ", (done) => {
        let expectedCustomerDetails= {
            Name: 'vishal',
            Phone_Number: 9876543250,
            Pincode: '400040',
            Address: "gyririiri",
            city: "mumbai",
            Email: "gail@gmail.com",
            LandMark: "Worli",
            Type: "Home"

        };

        bookModelStub.returns(Promise.resolve(expectedCustomerDetails));
        nodeMailerStub.returns(Promise.reject(500))
        bookService.createCustomerDetailsService(expectedCustomerDetails).catch(
            newData => chai.expect(newData).to.be.eql(500));
        done()
    })
})

