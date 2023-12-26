import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from '@faker-js/faker';
import slow from 'connect-slow';

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});
app.use(slow({ delay: 5000 }));

const news = [
  {
    id: faker.string.uuid(),
    heading: faker.lorem.sentence(3),
    image: faker.image.abstract(200, 200, true),
    body: faker.lorem.paragraph(),
  },
  {
    id: faker.string.uuid(),
    heading: faker.lorem.sentence(3),
    image: faker.image.abstract(200, 200, true),
    body: faker.lorem.paragraph(),
  },
  {
    id: faker.string.uuid(),
    heading: faker.lorem.sentence(3),
    image: faker.image.abstract(200, 200, true),
    body: faker.lorem.paragraph(),
  },
];
    

app.get('/', async (request, response) => {
  const result = news;
  
  response.status(200).send(JSON.stringify(result)).end();
});

const port = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();