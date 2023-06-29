import { login, register, loginRequired, registerAdmin, adminLogin} from '../controllers/userController.js';
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  } from "../controllers/toursController.js";
  
  import {
    getAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
  } from "../controllers/toursController.js";
  
  import {
    getTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    testTour
  } from "../controllers/toursController.js";
  
  import {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
  } from "../controllers/toursController.js";
  
  import {
    getMessages,
    getMessage,
    createMessage,
    
  } from "../controllers/toursController.js";

  

export const userRoutes = (app) => {
    app.route('/users')
        .get(getUsers)
        .post(createUser);

    app.route('/user/:id')
        .put(loginRequired, updateUser)
        .get(loginRequired, getUser)
        .delete(loginRequired, deleteUser);

    app.route('/admins')
        .get( getAdmins)
        .post(createAdmin);

    app.route('/admin/:id')
        .put(loginRequired, updateAdmin)
        .get(loginRequired, getAdmin)
        .delete(loginRequired, deleteAdmin);
        
    app.route('/auth/registerAdmin')
        .post(registerAdmin);


    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);

    app.route('/auth/loginAdmin')
        .post(adminLogin);

    app.route('/tours')
        .get(getTours)
        .post( createTour);
    
    app.route('/tour/:id')
        .get( getTour)
        .post(testTour)
        .put( updateTour)
        .delete( deleteTour);

    app.route('/bookings')
        .get(getBookings)
        .post(createBooking);

    app.route('/booking/:id')
        .get(getBooking)
        .put(loginRequired, updateBooking)
        .delete(loginRequired, deleteBooking);

    app.route('/messages')
        .get(getMessages)
        .post(createMessage);
    
    app.route('/message/:id')
        .get(getMessage)
        
};
