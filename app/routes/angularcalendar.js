const listController = require("../controllers/angularcalendarController");
const appConfig = require("../../config/appConfig");
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    
    let baseUrl = `${appConfig.apiVersion}/events`;


    /**
    * @apiGroup Calendar
     * @apiVersion  1.0.0
     * @api {post} /api/v1/events/addEvent api for adding a new meeting
     *
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} title title of the meeting. (body params) (required)
     * @apiParam {date} start start date of the meeting. (body params) (required)
     * @apiParam {date} end end date of the meeting. (body params) (required)
     * @apiParam {string} description description of the meeting. (body params) (required)
     * @apiParam {title} title title of the meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

            "error": false,
            "message": "Event added",
            "status": 200,
            {
            "data": n: 1
                nModified: 1
                ok: 1
            }
    */
    app.post(`${baseUrl}/addEvent`, auth.isAdmin, listController.addEvent);



     /**
    * @apiGroup Calendar
     * @apiVersion  1.0.0
     * @api {post} /api/v1/events/deleteEvent api for deleting the meeting.
     *
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} _id id of the meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

            "error": false,
            "message": "Event deleted",
            "status": 200,
            {
            "data": n: 1
                nModified: 1
                ok: 1
            }
    */
    app.post(`${baseUrl}/deleteEvent`, auth.isAdmin, listController.deleteEvent);


     /**
    * @apiGroup Calendar
     * @apiVersion  1.0.0
     * @api {post} /api/v1/events/updateEvent api for updating meeting
     *
     * @apiParam {string} userName userName of the user. (body params) (required)
     * @apiParam {string} title title of the meeting. (body params) (required)
     * @apiParam {date} start start date of the meeting. (body params) (required)
     * @apiParam {date} end end date of the meeting. (body params) (required)
     * @apiParam {string} description description of the meeting. (body params) (required)
     * @apiParam {title} title title of the meeting. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:

            "error": false,
            "message": "Event updated",
            "status": 200,
            {
            "data": n: 1
                nModified: 1
                ok: 1
            }
    */
    app.post(`${baseUrl}/updateEvent`, auth.isAdmin, listController.updateEvent);


     /**
    * @apiGroup Calendar
     * @apiVersion  1.0.0
     * @api {post} /api/v1/events/meetingAddedMail api for sending mail about the new meeting
     *
     * @apiParam {string} userName user name of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the admin. (body params) (required)
     * @apiParam {string} admin user name of the admin. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
            "error": false,
            "message": "Mail has been sent",
            "status": 200, 
            "data": null
            }
    */
    app.post(`${baseUrl}/meetingAddedMail`, auth.isAdmin, listController.meetingAdded);



     /**
    * @apiGroup Calendar
     * @apiVersion  1.0.0
     * @api {post} /api/v1/events/meetingUpdatedMail api for sending mail about the meeting update
     *
     * @apiParam {string} userName user name of the user. (body params) (required)
     * @apiParam {string} authToken authToken of the admin. (body params) (required)
     * @apiParam {string} admin user name of the admin. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
            {
            "error": false,
            "message": "Mail has been sent",
            "status": 200, 
            "data": null
            }
    */
    app.post(`${baseUrl}/meetingUpdatedMail`, auth.isAdmin, listController.meetingUpdated);
    




    



   
   


    

    

   

}
