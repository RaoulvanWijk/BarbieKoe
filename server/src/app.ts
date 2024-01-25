import Express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = Express();
app.use(Express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(Express.json());
// load routes from auth folder
app.use('/auth', require('./routes/auth'));
app.use("/booking", require("./routes/booking"));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
