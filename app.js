var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require('nodemailer');


var indexRouter = require('./routes/index');
var personsRouter = require('./routes/persons');


var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/persons', personsRouter);

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {


  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'davidbiton2@gmail.com',
      clientId: '144787911536-apf003ki7gkji0bahn0368hnoo4tavds.apps.googleusercontent.com',
      clientSecret: 'mn8e9z2ddmPNMnglKmueWgKt',
      refreshToken: '1//04LupkJFezemhCgYIARAAGAQSNwF-L9Ird5y7OjjygVFxfwS8czcUacDq7_DV1fnu8PjpavCLH_MG02hdt85e1AbBr_qjDEegPG0',
      accessToken: 'ya29.Il-7B64gkseSLKntrpx7IwtdjF0TQGySLd7axPO50kN4zd4wkDrmfLJwGMzK7a9_1SzHtEuDNXgwM-Ui8iQzI1NTVogM2BxUIhXUbuECqMjp1UUISdmiFrhE6hfW3rgyKA'
    }
  });


  let mailOptions = {
    from: 'אבי אמסלם - החבר שלך בעירייה', // sender address
    to: user.email, // list of receivers
    subject: "פנייתך לאבי אמסלם התקבלה", // Subject line
    html: "שלום " + user.name + '<br>' + " קיבלנו את תרומתך" + ',<br>' + "תודה רבה על התרומה הנכבדת." + '<br>' + "בימים הקרובים תקבל שי צנוע הביתה." + '<br>' + 'אני כאן תמיד בשבילך אבי אמסלם וצוות פניות הציבור של ש"ס'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
