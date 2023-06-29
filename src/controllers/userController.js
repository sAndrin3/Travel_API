import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if it's a valid user or admin
    if (decoded.user) {
      req.user = decoded.user;
    } else if (decoded.admin) {
      req.admin = decoded.admin;
    } else {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    next();
  });
};


export const register = async (req, res) => {
  const { Name, Password, Email, ContactNumber } = req.body;
  console.log(Password, Email, Name);
  const hashedPassword = bcrypt.hashSync(Password, 10);
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Email', sql.VarChar, Email)
      .query('SELECT * FROM users WHERE Name = @Name OR Email = @Email');
    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ error: 'User already exists' });
    } else {
      await pool
        .request()
        .input('Name', sql.VarChar, Name)
        .input('hashedpassword', sql.VarChar, hashedPassword)
        .input('Email', sql.VarChar, Email)
        .input('ContactNumber', sql.VarChar, ContactNumber)
        .query(
          'INSERT INTO users (Name, Password, Email, ContactNumber) VALUES (@Name, @hashedpassword, @Email, @ContactNumber)'
        );
      res.status(200).send({ message: 'User created successfully' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};


export const registerAdmin = async (req, res) => {
  const { Name, Password, Email} = req.body;
  console.log(Password, Email, Name);
  const hashedPassword = bcrypt.hashSync(Password, 10);
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .input('Email', sql.VarChar, Email)
      .query('SELECT * FROM Admins WHERE Name = @Name OR Email = @Email');
    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ error: 'Admin already exists' });
    } else {
      await pool
        .request()
        .input('Name', sql.VarChar, Name)
        .input('hashedpassword', sql.VarChar, hashedPassword)
        .input('Email', sql.VarChar, Email)
        .query(
          'INSERT INTO Admins (Name, Password, Email) VALUES (@Name, @hashedpassword, @Email)'
        );
      res.status(200).send({ message: 'Admin created successfully' });
    }
  } catch (error) {
    res.status(500).json(error.message);
  } finally {
    sql.close();
  }
};


export const login = async (req, res) => {
  const { Name, Password } = req.body;
  let pool = await sql.connect(config.sql);
  const result = await pool
    .request()
    .input('Name', sql.VarChar, Name)
    .query('SELECT * FROM Users WHERE Name = @Name');
  const user = result.recordset[0];
  if (!user) {
    res.status(401).json({ error: 'Invalid Name or Password' });
  } else {
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid Name or Password' });
    } else {
      const token = `JWT ${jwt.sign(
        { id: user.ID, Name: user.Name, Email: user.Email },
        config.jwt_secret
      )}`;
      res
        .status(200)
        .json({ Email: user.Email, Name: user.Name, id: user.UserID, token: token });
    }
  }
};


export const adminLogin = async (req, res) => {
  const { Name, Password } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('Name', sql.VarChar, Name)
      .query('SELECT * FROM Admins WHERE Name = @Name');
    const admin = result.recordset[0];
    if (!admin) {
      res.status(401).json({ message: 'Invalid name or password' });
    } else {
      if (!bcrypt.compareSync(Password, admin.Password)) {
        res.status(401).json({ error: 'Invalid Name or Password' });
      } else {
        const token = `JWT ${jwt.sign(
          { Name: admin.Name, Email: admin.Email },
          config.jwt_secret
        )}`;
        res.status(200).json({ Email: admin.Email, Name: admin.Name, id: admin.AdminID, token: token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};
