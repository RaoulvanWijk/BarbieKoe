import Express from 'express';
const app = Express();

app.get('/', (req : any, res : any) => {
  req;
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});