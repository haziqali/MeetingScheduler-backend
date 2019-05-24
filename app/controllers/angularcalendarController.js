const mongoose = require('mongoose');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');
const mailer = require('../libs/sendmailLib');


/* Models */
const UserModel = mongoose.model('User');



let addEvent = (req, res) => {
    console.log(req.body.resizableafterEnd)
    UserModel.update({ 'userName':req.body.userName}, {$push: {events: {title:req.body.title, start:req.body.start, end: req.body.end, 
        description: req.body.description, createdBy: req.body.createdBy, draggable: req.body.draggable, 
        resizable: { beforeStart: req.body.resizablebeforeStart, afterEnd: req.body.resizableafterEnd }}}}).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Calendar Controller: addEvent', 10)
            let apiResponse = response.generate(true, 'Failed To add Calendar details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
          
            logger.info('No User Found', 'Calendar Controller: addEvent')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Event added', 200, result)
            res.send(apiResponse)
        }
    });
}

let deleteEvent = (req, res) => {

    UserModel.update({ 'userName':req.body.userName}, {$pull: 
        {events: {_id:req.body.id}}}).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Calendar Controller: deleteEvent', 10)
            let apiResponse = response.generate(true, 'Failed To edit List details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'Calendar Controller: deleteEvent')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Event deleted', 200, result)
            res.send(apiResponse)
        }
    });
}


let updateEvent = (req, res) => {
    console.log(req.body.description)
    UserModel.update({ name: req.body.name, "events._id": req.body.id }, 
    { "$set": { "events.$.title" :req.body.title, "events.$.start":req.body.start, "events.$.end": req.body.end, 
    "events.$.description": req.body.description}}).exec((err, result) => {
        
        if (err) {
            console.log(err)
            logger.error(err.message, 'Angular Controller: updateEvent', 10)
            let apiResponse = response.generate(true, 'Failed to update event details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
        
            logger.info('No Event Found', 'Angular Controller: updateEvent')
            let apiResponse = response.generate(true, 'No Event Found', 404, null)
            res.send(apiResponse)
        } else {
            
            let apiResponse = response.generate(false, 'Event updated', 200, result)
            res.send(apiResponse)
        }
    });
}

let meetingAdded = (req, res) => {
    mailer.meeting_added(req, res);
    }

let meetingUpdated = (req, res) => {
    mailer.meeting_updated(req, res);
    }


module.exports = {
    meetingAdded: meetingAdded,
    addEvent: addEvent,
    deleteEvent: deleteEvent,
    updateEvent: updateEvent,
    meetingUpdated: meetingUpdated
   
}// end exports