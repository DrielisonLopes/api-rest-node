import Router from "express";
import { CitiesController, PeopleController } from "./../controllers";

const router = Router();

router.get("/", (_, res) => {
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
// Cities routes
router.get(
    "/cities",
    CitiesController.getAllValidation,
    CitiesController.getAll,
);
router.get(
    "/cities/:id",
    CitiesController.getByIdValidation,
    CitiesController.getById,
);
router.post(
    "/cities",
    CitiesController.createValidation,
    CitiesController.create,
);
router.put(
    "/cities/:id",
    CitiesController.updateByIdValidation,
    CitiesController.updateById,
);
router.delete(
    "/cities/:id",
    CitiesController.deleteByIdValidation,
    CitiesController.deleteById,
);

// People routes
router.get(
    "/pessoas",
    PeopleController.getAllValidation,
    PeopleController.getAll,
);
router.get(
    "/pessoas/:id",
    PeopleController.getByIdValidation,
    PeopleController.getById,
);
router.post(
    "/pessoas",
    PeopleController.createValidation,
    PeopleController.create,
);
router.put(
    "/pessoas/:id",
    PeopleController.updateByIdValidation,
    PeopleController.updateById,
);
router.delete(
    "/pessoas/:id",
    PeopleController.deleteByIdValidation,
    PeopleController.deleteById,
);

export { router };
