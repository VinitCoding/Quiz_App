import React, { useEffect, useRef, useState } from "react";
import laptop_img from "../assets/laptop_bg.svg";
import logo from "../assets/logo.svg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { signUpSchemas, loginSchemas } from "../schemas/auth_schema.js";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import axios from "axios";
import auth_bg from '../assets/auth_bg.svg'

const AuthenticationPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const handleForm = () => {
    setSignIn(!signIn);
  };

  const URL = 'http://127.0.0.1:8000/exam'



  const SignUpInitialValues = {
    full_name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
  };
  const LoginInitialValues = {
    email: "",
    password: "",
  };

  // Using for sign up form
  const signUpFormik = useFormik({
    initialValues: SignUpInitialValues,
    validationSchema: signUpSchemas,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post(`${URL}/send_otp`, {
            "email": values.email,
        })
        if (response) {
            console.log(response);
            setTimeout(() => {
                setTimeout(() => {
                    navigate('/otp_verify', {
                        state: {
                            data: {
                               values
                            }
                        }
                    })
                }, 2000);
                toast.success(`${response.data}`);
            }, 1000);
        }
        // setTimeout(() => {
        //   setTimeout(() => {
        //     navigate("/otp_verify", {
        //       state: {
        //         data: {
        //           values,
        //         },
        //       },
        //     });
        //   }, 2000);
        //   toast.success("OTP sent Successful");
        //   localStorage.setItem('sign_up_user_email', values.email)
        // }, 1000);
        setSignIn(false);
        action.resetForm();
      } catch (error) {
        console.log(error);
        toast.error;
      }
    },
  });

  // Using for Sign in form
  const signInFormik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: loginSchemas,
    onSubmit: (values, action) => {
      console.log(values.email);
      toast.success("Login successfully");
      localStorage.setItem('sign_up_user_email', values.email)
      setTimeout(() => {
        navigate("/candidate_dashboard");
      }, 3000);
      action.resetForm();
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    signIn ? signInFormik : signUpFormik;
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  // const sendOTP = async() => {
  //   try {
  //     const response = await axios.post(`${URL}/send_otp`, {
  //       'email': values.email
  //     })
  //     if (response) {
  //       toast.success(`${response.data}`)
  //     }
  //   } catch (error) {
      
  //   }
  // }

  return (
    <section className="w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-y-auto sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover " style={{ backgroundImage: `url(${auth_bg})`}}>
      <Toaster />
      {/* Bg-img */}
      <div className="">
        <img
          src={laptop_img}
          alt=""
          className="xl:w-[18%] lg:w-[24%] xl:block lg:block md:hidden sm:hidden hidden absolute top-[50%] left-[5%] h-auto"
        />
      </div>

      {/* Auth_section */}
      <div className={`flex justify-center ${signIn ? "mt-20" : "xl:mt-5 lg:mt-8 md:mt-10 sm:mt-14 mt-14"}`}>
        {signIn ? (
          // SignIn
          <form
            className="bg-white py-3 xl:w-[30%] lg:w-[40%] md:w-[60%] sm:w-[80%] xl:mx-0 lg:mx-0 md:mx-0 sm:mx-0 mx-8 w-full  px-4 shadow-md rounded-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center justify-center mt-5 text-center">
              <img src={logo} alt="logo" className="w-[16%]" />
              <h2 className="mt-6 text-3xl font-semibold">Welcome</h2>
              <h4>
                Dive back into your world with simple Sign-in. Your next
                adventure awaits - let’s get started
              </h4>
            </div>
            <div className="flex flex-col mt-2 gap-y-4">
              <Input
                variant="subtle"
                isRequired
                className="pl-2"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                labelPlacement={"outside"}
                label="Email"
                placeholder="Enter your email"
                isInvalid={errors.email && touched.email}
                errorMessage={`${errors.email}`}
              />
              <Input
                className="pl-2"
                name="password"
                isRequired
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                labelPlacement={"outside"}
                isInvalid={errors.password && touched.password}
                errorMessage={`${errors.password}`}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <BiHide className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <BiShow className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              {errors.password && touched.password ? (
                <p className="text-sm font-semibold text-red-400">
                  {errors.password}
                </p>
              ) : null}
              <p className="text-base cursor-pointer text-end hover:underline hover:underline-offset-2">
                Forgot Password
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mt-4 gap-y-4">
              <button
                type="submit"
                className="px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400"
              >
                SignIn
              </button>
              <p>
                Don't have account?{" "}
                <span
                  className="font-medium cursor-pointer text-dark-blue hover:underline"
                  onClick={handleForm}
                >
                  Sign Up Now
                </span>
              </p>
            </div>
          </form>
        ) : (
          // SignUp
          <form
            className="bg-white py-3 xl:w-[30%] lg:w-[40%] md:w-[70%] sm:w-[80%] w-full xl:mx-0 lg:mx-0 md:mx-0 sm:mx-0 mx-6  px-4 shadow-md rounded-lg"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center justify-center text-center lg:mt-1 md:mt-2">
              <img src={logo} alt="logo" className="w-[16%]" />
              <h2 className="mt-1 text-2xl font-semibold">Sign Up</h2>
              <h4>Let's sign up quickly to get started.</h4>
            </div>
            <div className="flex flex-col gap-y-1">
              <Input
                isRequired
                variant="subtle"
                className="pl-2"
                name="full_name"
                value={values.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                labelPlacement={"outside"}
                label="Full Name"
                placeholder="Enter your full name"
                isInvalid={errors.full_name && touched.full_name}
                errorMessage={`${errors.full_name}`}
              />

              <Input
                isRequired
                variant="subtle"
                className="pl-2"
                name="email"
                label="Email"
                placeholder="Enter your email"
                labelPlacement="outside"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.email && touched.email}
                errorMessage={`${errors.email}`}
              />
              <Input
                isRequired
                variant="subtle"
                className="pl-2"
                name="mobile_number"
                label="Mobile Number"
                placeholder="Enter your mobile number"
                value={values.mobile_number}
                onChange={handleChange}
                onBlur={handleBlur}
                labelPlacement={"outside"}
                isInvalid={errors.mobile_number && touched.mobile_number}
                errorMessage={`${errors.mobile_number}`}
              />
              <Input
                isRequired
                className="pl-2"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Password"
                placeholder="Enter your password"
                labelPlacement={"outside"}
                isInvalid={errors.password && touched.password}
                errorMessage={`${errors.password}`}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <BiHide className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <BiShow className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}

              />
              
              <Input
                isRequired
                className="pl-2"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Confirm Password"
                placeholder="Enter your confirm password"
                labelPlacement={"outside"}
                isInvalid={errors.confirm_password && touched.confirm_password}
                errorMessage={`${errors.confirm_password}`}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    
                  >
                    {isVisible ? (
                      <BiHide className="text-2xl pointer-events-none text-default-400" />
                    ) : (
                      <BiShow className="text-2xl pointer-events-none text-default-400" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>

            <div className="flex flex-col items-center justify-center mt-1 gap-y-1">
              <button
                type="submit"
                className="px-5 py-1.5 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400"
              >
                SignUp
              </button>
              {/* <OTPModal /> */}
              <p>
                Already have account?{" "}
                <span
                  className="font-medium cursor-pointer text-dark-blue hover:underline"
                  onClick={handleForm}
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default AuthenticationPage;
