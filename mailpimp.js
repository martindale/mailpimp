'use strict';

var Maki = require('maki');
var mailpimp = new Maki( require('./config') );

var Passport = require('maki-passport-local');
var passport = new Passport({
  resource: 'Person'
});

mailpimp.use( passport );

var schedule = require('node-schedule');

var Person = mailpimp.define('Person', {
  attributes: {
    username: { type: String , max: 35 },
    email: { type: String , max: 200 },
    created: { type: Date , default: Date.now }
  }
});

var Subscription = mailpimp.define('Subscription', {
  attributes: {
    email: { type: String , max: 200 },
    validated: { type: Date },
    _list: { type: mailpimp.mongoose.SchemaTypes.ObjectId , ref: 'List' },
    created: { type: Date , default: Date.now }
  }
});

var List = mailpimp.define('List', {
  attributes: {
    name: { type: String , required: true , max: 200 },
    source: { type: String },
    created: { type: Date , default: Date.now }
  }
});

var Mail = mailpimp.define('Mail', {
  attributes: {
    subject: { type: String , max: 200 },
    content: { type: String },
    created: { type: Date , default: Date.now },
    _list:   { type: mailpimp.mongoose.SchemaTypes.ObjectId , ref: 'List' },
  }
});

var Task = mailpimp.define('Task', {
  attributes: {
    status: { type: String , enum: ['pending', 'sending', 'sent', 'failed'], default: 'pending' },
    recipient: { type: String , max: 200 },
    subject: { type: String , max: 200 },
    content: { type: String },
    _mail: { type: mailpimp.mongoose.SchemaTypes.ObjectId , ref: 'Mail' }
  }
});

Mail.on('create', function(mail) {
  Subscription.query({ _list: mail._list }, function(err, subscriptions) {
    if (err) return console.error(err);
    subscriptions.forEach(function(subscription) {
      Task.create({
        recipient: subscription.email,
        subject: mail.subject,
        content: mail.content,
        _mail: mail._id
      });
    });
  });

});

mailpimp.start(function() {
  
});
