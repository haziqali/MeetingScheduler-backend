'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    unique: true
  },
  userName: {
    type: String,
    default: '',
  },

  password: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    unique: true
  },
  mobileNumber: {
    type: String,
    default: ''
  },
  createdOn :{
    type:Date,
    default:''
  },
  role: {
    type: String,
    default:''
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: String,
    default: ''
  },
  events: 
  [
    {
      createdBy: String,
      start: Date,
      end: Date,
      title: String,
      description: String,
      resizable: {
        beforeStart: Boolean,
        afterEnd: Boolean
      },
      draggable: Boolean
    } 
  ]
})


mongoose.model('User', userSchema);