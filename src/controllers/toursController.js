import sql from 'mssql';
import config from '../db/config.js';


// User functions

export const getUsers = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM users");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Users not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving users' });
  } finally {
    sql.close();
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input("userId", sql.Int, id)
      .query("SELECT * FROM userData WHERE id = @userId");
    !result.recordset[0]
      ? res.status(404).json({ message: 'User not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving user' });
  } finally {
    sql.close();
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, contactNumber, tourId } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("Name", sql.VarChar, name)
      .input("Email", sql.VarChar, email)
      .input("Password", sql.VarChar, password)
      .input("ContactNumber", sql.VarChar, contactNumber)
      .input("TourID", sql.VarChar, tourId)
      .query("INSERT INTO users ( Name, Email, password, ContactNumber, TourID) VALUES (@Name, @Email, @Password, @ContactNumber, @TourID)");
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("userId", sql.Int, id)
      .input("userName", sql.VarChar, name)
      .query("UPDATE userData SET name = @name WHERE id = @userId");
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  } finally {
    sql.close();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("userId", sql.Int, id)
      .query("DELETE FROM userData WHERE id = @userId");
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  } finally {
    sql.close();
  }
};

// Admin functions

export const getAdmins = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM admins");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Admins not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving admins' });
  } finally {
    sql.close();
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input("AdminId", sql.Int, id)
      .query("SELECT * FROM Admins WHERE AdminID = @AdminID");
    !result.recordset[0]
      ? res.status(404).json({ message: 'Admin not found' })
      : res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Email', sql.VarChar, Email)
      .input('Password', sql.VarChar, Password)
      .query('INSERT INTO Admins (Name, Email, Password) VALUES (@Name, @Email, @Password)');

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};


export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("adminId", sql.Int, id)
      .input("adminName", sql.VarChar, name)
      .query("UPDATE Admins SET Name = @adminName WHERE id = @adminID");
    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the admin' });
  } finally {
    sql.close();
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Admins WHERE AdminID = @id");
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};


export const getTours = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM Tour");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Tours not found' });
    }

    res.status(200).json({ success: true, tours: result.recordset });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving tours' });
  } finally {
    sql.close();
  }
};

export const getTour = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query('SELECT * FROM Tour WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json(error.message);
    }

    res.status(200).json({ success: true, tour: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the tour' });
  } finally {
    // sql.close();
  }
};


// Create a new tour
export const createTour = async (req, res) => {
  try {
    const { title, description, duration, price } = req.body;
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("Title", sql.VarChar, title)
      .input("Description", sql.VarChar, description)
      .input("Duration", sql.VarChar, duration)
      .input("Price", sql.Float, price)
      .query("INSERT INTO Tour (Title, Description, Duration, Price) VALUES (@Title, @Description, @Duration, @Price)");
    res.status(201).json({ message: 'Tour created successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

export const testTour = async(req,res)=>{
  console.log('working fine')
}

// Update an existing tour
export const updateTour = async (req, res) => {
  // console.log(req.body)
  // console.log('updates');
  // res.status(200).json({message:"update"});
  try {
    const { id } = req.params;
    const { title, description, duration, price } = req.body;
    console.log(title, description, duration, price );
    let pool = await sql.connect(config.sql);
    console.log(pool);
    const result = await pool
      .request()
      .input("TourID", sql.VarChar, id)
      .input("Title", sql.VarChar, title)
      .input("Description", sql.VarChar, description)
      .input("Duration", sql.Int, duration)
      .input("Price", sql.Decimal, price)
      .query("UPDATE Tour SET Title = @Title, Description = @Description, Duration = @Duration, Price = @Price WHERE TourID = @TourID");
console.log(result);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: 'Tour not found' });
    }
    
    res.json({ success: true, message: 'Tour updated successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    // sql.close();
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("TourID", sql.Int, id)
      .query("DELETE FROM Tour WHERE TourID = @TourID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json(error.message);
    }

    res.json({ success: true, message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};

// ...

// Booking functions

export const getBookings = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query("SELECT * FROM bookings");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Bookings not found' });
    }

    res.status(200).json({ success: true, bookings: result.recordset });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving bookings' });
  } finally {
    sql.close();
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config.sql);
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query('SELECT * FROM bookings WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ success: true, booking: result.recordset[0] });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the booking' });
  } finally {
    sql.close();
  }
};

export const createBooking = async (req, res) => {
  try {
    const {  userId} = req.query;
    const {tourId} = req.body
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("TourId", sql.Int, tourId)
      .input("UserId", sql.Int, userId)
      // .input("BookingDate", sql.Date, bookingDate)
      .query("INSERT INTO bookings (tour_id, user_id) VALUES (@TourId, @UserId)");
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the booking' });
  } finally {
    sql.close();
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { tourId, userId} = req.body;
    
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("TourId", sql.Int, tourId)
      .input("UserId", sql.Int, userId)
      // .input("BookingDate", sql.Date, bookingDate)
      .query("UPDATE bookings SET tour_id = @TourId, user_id = @UserId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }
    
    res.json({ success: true, message: 'Booking updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while updating the booking' });
  } finally {
    sql.close();
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM bookings WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred while deleting the booking' });
  } finally {
    sql.close();
  }
};



// Get messages for a specific admin
export const getMessagesByAdminId = async (req, res) => {
  const { adminId } = req.query;

  try {
    const messages = await Message.find({
      $or: [{ senderId: adminId }, { receiverId: adminId }],
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

// Get messages based on criteria
export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;
  const query = {};

  if (senderId) {
    query.senderId = senderId;
  }

  if (receiverId) {
    query.receiverId = receiverId;
  }

  try {
    const messages = await Message.find(query);

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json(error.message);
  }
};


// Get a single message by ID
export const getMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Error fetching message' });
  }
};


// Create a new message
export const createMessage = async (req, res) => {
  const { senderId, receiverId, messageText } = req.body;

  try {
    const newMessage = new Message({
      senderId,
      receiverId,
      messageText,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully', savedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
};





