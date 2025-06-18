// Validate with yup
import { object, ref, string } from 'yup';

export const registerSchema = object({
  email: string()
    .required("Please input your Email")
    .email("Email invalid"),
  name: string()
    .required("Please input nick name")
    .min(3, "Need more than 3 characters"),
  password: string()
    .required("Please input password")
    .min(6, "Need more than 6 characters"),
  confirmPassword: string()
    .required("Please input password again")
    .oneOf([ref("password"), null], "Password is not matched"),
});

export const loginSchema = object({
  email: string()
    .required("Please input your Email")
    .email("Email invalid"),
  password: string()
    .required("Please input password")
    .min(6, "Need more than 6 characters"),
});

export const validate = (schema) => async (req, res, next) => {
  // code body
  try {
    await schema.validate(req.body, { abortEarly : false});
    next();
  } catch (error) {
    // console.log(error.errors);
    const errMsg = error.errors.map((item) => item);
    // console.log('errMsg  ', errMsg);
    const errTxt = errMsg.join(',');
    // console.log('errTxt : ', errTxt );
    const mergeError = new Error(errTxt);
    // console.log('mergeError ', mergeError );
    next(mergeError);
  }
};

