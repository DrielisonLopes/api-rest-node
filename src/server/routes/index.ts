import Router from "express";
import {
    CitiesController,
    PeopleController,
    UsersController,
} from "./../controllers";
import { ensureAuthenticated } from "../shared/middleware";

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
    ensureAuthenticated,
    CitiesController.getAllValidation,
    CitiesController.getAll,
);
router.get(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.getByIdValidation,
    CitiesController.getById,
);
router.post(
    "/cities",
    ensureAuthenticated,
    CitiesController.createValidation,
    CitiesController.create,
);
router.put(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.updateByIdValidation,
    CitiesController.updateById,
);
router.delete(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.deleteByIdValidation,
    CitiesController.deleteById,
);

// People routes
router.get(
    "/people",
    ensureAuthenticated,
    PeopleController.getAllValidation,
    PeopleController.getAll,
);
router.get(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.getByIdValidation,
    PeopleController.getById,
);
router.post(
    "/people",
    ensureAuthenticated,
    PeopleController.createValidation,
    PeopleController.create,
);
router.put(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.updateByIdValidation,
    PeopleController.updateById,
);
router.delete(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.deleteByIdValidation,
    PeopleController.deleteById,
);

// Users routes
router.post("/enter", UsersController.signInValidation, UsersController.signIn);
router.post(
    "/register",
    UsersController.signUpValidation,
    UsersController.signUp,
);

export { router };
