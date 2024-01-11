import Express from 'express';
const app = Express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// load routes from auth folder
app.use('/auth', require('./routes/auth'));

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
