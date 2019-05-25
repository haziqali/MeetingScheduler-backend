const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;


    app.post(`${baseUrl}/view/all`, auth.isAdmin, userController.getAllUser);


   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/userDetails api for user getting a single user.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User Details found",
            "status": 200,
            "data": {
                createdOn: "2019-05-22T17:01:52.000Z"
                email: "sam.was.sammy@gmail.com"
                events: [{…}, {…}]
                mobileNumber: " 918130372242"
                resetPasswordExpires: ""
                resetPasswordToken: ""
                role: "user"
                userId: "1OtUgv0Vgr2"
                userName: "Haziqali"
            }
        }
    */
    app.post(`${baseUrl}/userDetails`, auth.isAuthorized, userController.getSingleUser);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user signup.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} username username  of the user. (body params) (required)
     * @apiParam {string} role role of the user. (body params) (required)
     * @apiParam {string} mobile mobile of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User created",
            "status": 200,
            "data": {
                "__v": 0,
                "_id": "5cd71b9b75a9f33a70094334",
                "events" = "[]"
                "resetPasswordToken": "",
                "createdOn": "2019-05-11T18:59:39.000Z",
                "mobileNumber": "",
                "email": "hgh@gf.com",
                "userName":"hgf"
                "userId": "72UylR956"
            }
        }
    */
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login Successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUertyuiopojhgfdwertyuVCJ9.MCwiZXhwIjoxNTIwNDI29tIiwibGFzdE5hbWUiE4In19.hAR744xIY9K53JWm1rQ2mc",
                "userDetails": {
                "mobileNumber": 2234435524,
                "email": "someone@mail.com",
                "userName": "someone",
                "userId": "-E9zxTYA8",
                "events": "[]"

            }

        }
    */
    app.post(`${baseUrl}/login`, userController.loginFunction);


   
    /**
    * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for user logout.
     * 
     *
     * @apiParam {string} userid userid of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null
        }
    */
    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);




    /**
    * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/sendMail api for attaching a token to the user and sending it in mail.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Kindly check your email for further instructions",
            "status": 200,
            "data": null
        }
    */

    app.post(`${baseUrl}/sendMail`, auth.isAuthorized, userController.sendMail);


    /**
    * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/resetpassword api for sending a mail with new token on password reset.
     *
     * @apiParam {string} token token of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam {string} confirmPassword confirm password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
        {
            "error": false,
            "message": "Password reset successfully",
            "status": 200,
            "data": null
        }
    */

    app.post(`${baseUrl}/resetpassword`, auth.isAuthorized, userController.resetPassword);

}
