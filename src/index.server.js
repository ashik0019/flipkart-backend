const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')


//routes import from route file
const authRoutes = require('./routes/auth');
const authAdminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

//environment variable 
env.config();

//middleware
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
//route assign................................
app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes)
app.use('/api', authAdminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)

//mongodb connection 
//mongodb+srv://mern-ecom-user:<password>@cluster0.zyu41.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zyu41.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected!');
})




app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello form server'
    })
})

app.post('/data', (req, res, next) => {
    res.status(200).json({
        message: req.body
    })
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})
