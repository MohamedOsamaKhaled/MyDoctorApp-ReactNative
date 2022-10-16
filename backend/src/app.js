import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';



const app = express();



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Request Info 
app.use(morgan('dev'));


// Validation
app.use(expressValidator());


// Routings
app.use('/', routes);

// Error Handling
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})
// Error Handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message
    })
});


export default app;