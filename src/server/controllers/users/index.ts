import * as signIn from "./SignIn";
import * as signUp from "./Signup";

export const UsersController = {
    ...signIn,
    ...signUp,
};
