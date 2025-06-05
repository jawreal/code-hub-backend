import express, { Express, Request, Response } from 'express';

const app = express();
const PORT: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Hello World"})
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})