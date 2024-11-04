import React, { useEffect, useRef, useState } from 'react'
import laptop_img from '../assets/laptop_bg.svg'
import { ChakraProvider, Input, PinInputInput } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { PasswordInput } from "../components/ui/password-input"
import logo from '../assets/logo.svg'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { signUpSchemas, loginSchemas } from '../schemas/auth_schema.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const AuthenticationPage = () => {
    const [signIn, setSignIn] = useState(false)
    const navigate = useNavigate()
    const handleForm = () => {
        setSignIn(!signIn)
    }
    // {
    //     "full_name": "string",
    //         "email": "string",
    //             "password": "string",
    //                 "confirm_password": "string",
    //                     "mobile_no": 0
    // }
    // const URL = 'http://127.0.0.1:8000/exam'


    const SignUpInitialValues = {
        full_name: '',
        email: '',
        mobile_number: '',
        password: '',
        confirm_password: ''
    }
    const LoginInitialValues = {
        email: '',
        password: '',
    }

    // Using for sign up form
    const signUpFormik = useFormik({
        initialValues: SignUpInitialValues,
        validationSchema: signUpSchemas,
        onSubmit: async (values, action) => {
            try {
                // const response = await axios.post(`${URL}/users`, {
                //     "full_name": values.full_name,
                //     "email": values.email,
                //     "password": values.password,
                //     "confirm_password": values.confirm_password,
                //     "mobile_no": parseInt(values.mobile_number)
                // })
                // if (response) {
                //     console.log(response);
                //     setTimeout(() => {
                //         setTimeout(() => {
                //             navigate('/otp_verify', {
                //                 state: {
                //                     data: {
                //                        values 
                //                     }
                //                 }
                //             })
                //         }, 2000);
                //         toast.success("OTP sent Successful");
                //     }, 1000);
                // }
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
                    toast.success("OTP sent Successful");
                }, 1000);
                setSignIn(false)
                action.resetForm()
            } catch (error) {
                console.log(error);
                toast.error
            }


        }
    })

    // Using for Sign in form
    const signInFormik = useFormik({
        initialValues: LoginInitialValues,
        validationSchema: loginSchemas,
        onSubmit: (values, action) => {
            console.log(values.email);
            toast.success('Login successfully')
            setTimeout(() => {
                navigate('/candidate_dashboard')
            }, 3000)
            action.resetForm()
        }
    })


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = signIn ? signInFormik : signUpFormik
    useEffect(() => {
        console.log(errors);
    }, [errors])

    return (
        <section className='bg-gradient-to-t from-slate-50 to-[#d6eaff] w-screen h-screen overflow-hidden'>
            <Toaster />
            {/* Bg-img */}
            <div className=''>
                <img src={laptop_img} alt="" className='w-[18%] absolute top-[50%] left-[5%] h-auto' />
            </div>

            {/* Auth_section */}
            <div className={`flex justify-center ${signIn ? 'mt-20' : 'mt-5'}`}>
                {
                    signIn ? (
                        // SignIn
                        <form className='bg-white py-3 w-[30%] px-4 shadow-md rounded-lg' onSubmit={handleSubmit}>
                            <div className='flex flex-col items-center justify-center mt-5 text-center'>
                                <img src={logo} alt="logo" className='w-[16%]' />
                                <h2 className='mt-6 text-3xl font-semibold'>Welcome</h2>
                                <h4>Dive back into your world with simple Sign-in. Your next adventure
                                    awaits - let’s get started</h4>
                            </div>
                            <div className='flex flex-col mt-2 gap-y-4'>
                                <Field label="Email" required>
                                    <Input variant='subtle' className='pl-2' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.email && touched.email ? (<p className='text-sm font-semibold text-red-400'>{errors.email}</p>) : null}
                                </Field>
                                <Field label="Password" required>
                                    <PasswordInput variant='subtle' className='pl-2' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.password && touched.password ? (<p className='text-sm font-semibold text-red-400'>{errors.password}</p>) : null}
                                </Field>
                                <p className='text-base cursor-pointer text-end hover:underline hover:underline-offset-2'>
                                    Forgot Password
                                </p>
                            </div>

                            <div className='flex flex-col items-center justify-center mt-4 gap-y-4'>
                                <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400'>SignIn</button>
                                <p>Don't have account? <span className='font-medium cursor-pointer text-dark-blue hover:underline' onClick={handleForm}>Sign Up Now</span></p>
                            </div>
                        </form>
                    ) : (
                        // SignUp
                        <form className='bg-white py-3 w-[30%] px-4 shadow-md rounded-lg' onSubmit={handleSubmit}>
                            <div className='flex flex-col items-center justify-center text-center lg:mt-3 md:mt-2'>
                                <img src={logo} alt="logo" className='w-[16%]' />
                                <h2 className='mt-3 text-2xl font-semibold'>Sign Up</h2>
                                <h4>Let's sign up quickly to get started.</h4>
                            </div>
                            <div className='flex flex-col mt-2 gap-y-4'>
                                <Field label="Full Name" required >
                                    <Input variant='subtle' className='pl-2' name='full_name' value={values.full_name} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.full_name && touched.full_name ? (<p className='text-sm font-semibold text-red-400'>{errors.full_name}</p>) : null}
                                </Field>
                                <Field label="Email" required>
                                    <Input variant='subtle' className='pl-2' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.email && touched.email ? (<p className='text-sm font-semibold text-red-400'>{errors.email}</p>) : null}
                                </Field>
                                <Field label="Mobile Number" required>
                                    <Input variant='subtle' className='pl-2' name='mobile_number' value={values.mobile_number} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.mobile_number && touched.mobile_number ? (<p className='text-sm font-semibold text-red-400'>{errors.mobile_number}</p>) : null}
                                </Field>
                                <Field label="Password" required>
                                    <PasswordInput variant='subtle' className='pl-2' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.password && touched.password ? (<p className='text-sm font-semibold text-red-400'>{errors.password}</p>) : null}
                                </Field>
                                <Field label="Confirm Password" required>
                                    <PasswordInput variant='subtle' className='pl-2' name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.confirm_password && touched.confirm_password ? (<p className='text-sm font-semibold text-red-400'>{errors.confirm_password}</p>) : null}
                                </Field>
                            </div>

                            <div className='flex flex-col items-center justify-center mt-4 gap-y-4'>
                                <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400' >SignUp</button>
                                {/* <OTPModal /> */}
                                <p>Already have account? <span className='font-medium cursor-pointer text-dark-blue hover:underline' onClick={handleForm}>Sign In</span></p>
                            </div>
                        </form>
                    )
                }
            </div>
        </section>

        // helperText="We'll never share your email."
    )
}

export default AuthenticationPage