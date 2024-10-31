import * as Yup from "yup";

export const signUpSchemas = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile_number: Yup.string()
    .required("Mobile Number is required")
    .matches(/^\d{10}$/, "Phone number must be 10 digits "),
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Password is not matching"),
});
