import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(`server start in port ${process.env.PORT}`);
});
