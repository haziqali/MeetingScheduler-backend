const listController = require("../controllers/angularcalendarController");
const appConfig = require("../../config/appConfig");
const auth = require('../middlewares/auth');

module.exports.setRouter = (app) => {

    
    let baseUrl = `${appConfig.apiVersion}/events`;

    app.post(`${baseUrl}/addEvent`, auth.isAuthorized, listController.addEvent);

    app.post(`${baseUrl}/deleteEvent`, auth.isAuthorized, listController.deleteEvent);

    app.post(`${baseUrl}/updateEvent`, auth.isAuthorized, listController.updateEvent);

    app.post(`${baseUrl}/meetingAddedMail`, auth.isAuthorized, listController.meetingAdded);

    app.post(`${baseUrl}/meetingUpdatedMail`, auth.isAuthorized, listController.meetingUpdated);
    




    



   
   


    

    

   

}
