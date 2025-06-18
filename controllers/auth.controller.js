import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    // code body
    // TODO Overview Register
    /*
     0. Validate with yup
     1. Check Body
     2. Check Email in DB
     3. Ecrypt Password => bcryptjs
     4. Save to DB -> Prisma
     5. Response  
    */
    const { email, password, name } = req.body;
    // console.log(`email: ${email}/passowrd : ${password}/name :  ${name}`);

    // Step 2 Check Email in DB
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });
    console.log(user);
    if (user) {
      createError(400, 'Email already existed!!!');
    }
    // Step 3 Encrypt Password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log('hashPassword : ', hashPassword);

    // Step 4 Save to DB
    const result = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      }
    })

    res.json({ message: `Register ${result.name} Success` });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // TODO
    /*
      1. Validate body
      2. Check body
      3. Check Email in DB
      4. Check password
      5. Create token
      6. Response
    */
    const { email, password } = req.body;

    // Step 3 Check Email in DB
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    if (!user) createError(400, 'Email or Password is invalid!!!');

    // Step 4 Check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) createError(400, "Email or Password is invalid!!!");

    // Step 5 Generate Token
    const payload = {
      id: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, process.env.SIGN_KEY, {expiresIn: '1h'});
    // console.log("token is ", token);
    res.json({ message: `Welcome back ${user.name}`, payload, token });
  } catch (error) {
    next(error);
  }
};