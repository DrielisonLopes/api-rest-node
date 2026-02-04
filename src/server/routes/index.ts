import Router from 'express';
import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  const html = `
    <html>
      <head>
        <style>
          body {
            background-color: #333;
            color: #84c00b;
            font-family: Arial, sans-serif;
            padding: 16px;
          }
        </style>
      </head>
      <body>
        <h1>Hello, Node!!</h1>
      </body>
    </html>
  `;
  return res.send(html);
});

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);

router.post('/cities', CitiesController.createValidation, CitiesController.create);

router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);

router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

export { router };
