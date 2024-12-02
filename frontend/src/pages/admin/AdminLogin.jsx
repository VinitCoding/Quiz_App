import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminLoginSchemas } from "../../schemas/auth_schema";
import { Input } from "@nextui-org/react";
import { BiHide, BiShow } from "react-icons/bi";
import laptop_img from "../../assets/laptop_bg.svg";
import logo from "../../assets/logo.svg";
import auth_bg from "../../assets/auth_bg.svg";
import { useFormik } from "formik";

const AdminLogin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  //   const URL = "http://127.0.0.1:8000/exam";
  const handleForm = () => {
    toast.success("Registration done...");
  };

  // Initial Login credentials
  const LoginInitialValues = {
    email: "",
    password: "",
  };

  // Using for Sign in form
  const signInFormik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: adminLoginSchemas,
    onSubmit: async (values, action) => {
      if (
        values.email === "atharvganla@chistats.com" &&
        values.password === "atharv123"
      ) {
        sessionStorage.setItem("login_admin", values.email);
        setTimeout(() => {
          navigate("/admin_dashboard");
        }, 2000);
        toast.success("Admin login successfull");
        action.resetForm();
      } else {
        toast.error("Invalid credentials for admin login..");
      }

      //   try {
      //   const response = await axios.post(`${URL}/login`, {
      //     email: values.email,
      //     password: values.password,
      //   });
      //   console.log(response.data);

      //   if (!response) {
      //     toast.error("Something went wrong");
      //     console.error(response);
      //   }
      //   setTimeout(() => {
      //     navigate("/candidate_dashboard");
      //   }, 2000);
      //   toast.success("Login Successfully");
      //   sessionStorage.setItem("login_user", values.email);

      //   action.resetForm();
      // }
      // catch (error) {
      //   console.error("Something went wrong in login page");
      //   toast.error("Login failed");
      // }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    signInFormik;

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <section
      className="w-screen h-screen overflow-y-auto bg-cover xl:overflow-hidden lg:overflow-hidden md:overflow-y-auto sm:overflow-y-auto lg:bg-center md:bg-center sm:bg-none xl:bg-center xl:bg-cover md:bg-cover sm:bg-cover "
      style={{ backgroundImage: `url(${auth_bg})` }}
    >
      <Toaster />
      {/* Bg-img */}
      <div className="">
        <img
          src={laptop_img}
          alt=""
          className="xl:w-[18%] lg:w-[24%] xl:block lg:block md:hidden sm:hidden hidden absolute top-[50%] left-[5%] h-auto"
        />
      </div>

      <div className="flex justify-center mt-20">
        <form
          className="bg-white py-3 xl:w-[30%] lg:w-[40%] md:w-[60%] sm:w-[80%] xl:mx-0 lg:mx-0 md:mx-0 sm:mx-0 mx-8 w-full  px-4 shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center justify-center mt-5 text-center">
            <img src={logo} alt="logo" className="w-[16%]" />
            <h2 className="mt-6 text-3xl font-semibold">Welcome Admin</h2>
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
      </div>
    </section>
  );
};

export default AdminLogin;