/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const passport = require("passport");
const checkLogin = require("../api/policies/checkLogin");
const UserController = require("../api/controllers/UserController");

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },
  "POST /signup": "UserController.createSignup",
  "POST /signin": "UserController.createSignin",
  "GET /current-user": [checkLogin, UserController.getCurrentUser],

  // PROJECT
  "GET /project": "ProjectController.getAllProject",
  "GET /project/:id": "ProjectController.getOneProject",
  "POST /project": "ProjectController.create",
  "PUT /project/:id": "ProjectController.updateProject",
  "DELETE /project/:id": "ProjectController.removeProject",

  // TASK
  // 'POST /task': "TaskController.create",
  // "GET /task/:id": "TaskController.getOneTask",
  "GET /task": "TaskController.getAllTask",
  // "PUT /task/:id": "TaskController.updateTask",
  // "DELETE /task/:id": "TaskController.removeTask",

  //CATEGORY
  "GET /category/:id": "CategoryController.getOneCategory",
  "GET /category": "CategoryController.getAllCategory",
  "POST /category": "CategoryController.create",
  "PUT /category/:id": "CategoryController.updateCategory",
  "DELETE /category/:id": "CategoryController.removeCategory",

  // LOGIN GOOGLE
  "GET /login/google": [passport.authenticate("google", { session: false })],
  "GET /auth/google/callback": [
    //  passport .authenticate("google", {
    //     session: false,
    //     successRedirect: "/auth/google/success",
    //     failureRedirect: "/auth/google/failure",
    //     failureMessage: (error) => {
    //       console.log(error.message);
    //     },
    //   }),
    UserController.createGoogle,
  ],

  // OTP
  //"POST /sigup": "UserController.userSendotp",
  "POST /send-otp": "SendEmailController.sendOTPByEmail",

  //SEARCH
  //"GET /search/:key": "SearchController.searchTaskTitle",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
