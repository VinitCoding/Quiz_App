import React, { useEffect, useState } from 'react'
import laptop_img from '../assets/laptop_bg.svg'
import { ChakraProvider, Input, PinInputInput } from "@chakra-ui/react"
import { Field } from "../components/ui/field"
import { PasswordInput } from "../components/ui/password-input"
import logo from '../assets/logo.svg'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { signUpSchemas, loginSchemas } from '../schemas/auth_schema.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PinInput } from '../components/ui/pin-input.jsx'
import { Provider } from '../components/ui/provider.jsx'
import OtpInput from 'react-otp-input';


const AuthenticationPage = () => {
    const otpSwal = withReactContent(Swal)
    const [signIn, setSignIn] = useState(false)
    const [otp, setOtp] = useState('')
    const [timer, setTimer] = useState(30); // Timer set for 30 seconds
    const handleForm = () => {
        setSignIn(!signIn)
    }
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    // Use Effect for timer
    // Start countdown
    const countdown = setInterval(() => {
        setTimer((prevTimer) => {
            if (prevTimer <= 1) {
                clearInterval(countdown);
                setIsButtonDisabled(false); // Enable button after timer expires
                return 0;
            }
            return prevTimer - 1;
        });
    }, 1000);
    
    const showOtpModal = () => {
        otpSwal.fire({
            title: 'OTP verification',
            html: (
                <Provider>
                    <div className='flex flex-col items-center justify-center gap-y-4'>
                        <h2 className='text-sm'>OTP has been sent to registered email ID. Please verify it</h2>
                        <PinInput onChange={(e) => setOtp(e.target.value)} />
                        <div>
                            <p>{`OTP will expire in ${timer} seconds`}</p>
                        </div>
                        <button className='px-4 py-2 text-base text-white bg-dark-blue'>Verify OTP</button>
                    </div>
                </Provider>
            ),
            allowOutsideClick: false,
            showConfirmButton: false
        })
    }

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
        onSubmit: (values, action) => {
            console.log(values.full_name);
            setTimeout(() => {
                setTimeout(() => {
                    showOtpModal()
                }, 2000);
                toast.success("OTP sent Successful");
            }, 1000);
            setSignIn(false)
            action.resetForm()
        }
    })

    // Using for Sign in form
    const signInFormik = useFormik({
        initialValues: LoginInitialValues,
        validationSchema: loginSchemas,
        onSubmit: (values, action) => {
            console.log(values.email);
            toast.success('Login successfully')
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
            <div className={`flex justify-center ${signIn ? 'mt-20' : 'mt-10'}`}>
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

                        // <form className='bg-white py-3 w-[30%] px-4 shadow-md rounded-lg' onSubmit={handleSubmit}>
                        //     <div className='flex flex-col items-center justify-center mt-5 text-center'>
                        //         <img src={logo} alt="logo" className='w-[16%]' />
                        //         <h2 className='mt-3 text-2xl font-semibold'>Sign Up</h2>
                        //         <h4>Let's sign up quickly to get started.</h4>
                        //     </div>
                        //     <div className='flex flex-col mt-2 gap-y-4'>
                        //         <Field label="Full Name" required >
                        //             <Input variant='subtle' className='pl-2' name='full_name' value={values.full_name} onChange={handleChange} onBlur={handleBlur} />
                        //             {errors.full_name && touched.full_name ? (<p className='text-sm font-semibold text-red-400'>{errors.full_name}</p>) : null}
                        //         </Field>
                        //         <Field label="Email" required>
                        //             <Input variant='subtle' className='pl-2' name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        //             {errors.email && touched.email ? (<p className='text-sm font-semibold text-red-400'>{errors.email}</p>) : null}
                        //         </Field>
                        //         <Field label="Mobile Number" required>
                        //             <Input variant='subtle' className='pl-2' name='mobile_number' value={values.mobile_number} onChange={handleChange} onBlur={handleBlur} />
                        //             {errors.mobile_number && touched.mobile_number ? (<p className='text-sm font-semibold text-red-400'>{errors.mobile_number}</p>) : null}
                        //         </Field>
                        //         <Field label="Password" required>
                        //             <PasswordInput variant='subtle' className='pl-2' name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} />
                        //             {errors.password && touched.password ? (<p className='text-sm font-semibold text-red-400'>{errors.password}</p>) : null}
                        //         </Field>
                        //         <Field label="Confirm Password" required>
                        //             <PasswordInput variant='subtle' className='pl-2' name='confirm_password' value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
                        //             {errors.confirm_password && touched.confirm_password ? (<p className='text-sm font-semibold text-red-400'>{errors.confirm_password}</p>) : null}
                        //         </Field>
                        //     </div>

                        //     <div className='flex flex-col items-center justify-center mt-4 gap-y-4'>
                        //         <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400'>SignUp</button>
                        //         <p>Already have account? <span className='font-medium cursor-pointer text-dark-blue hover:underline' onClick={handleForm}>Sign In</span></p>
                        //     </div>
                        // </form>
                        <form className='bg-white py-3 w-[30%] px-4 shadow-md rounded-lg' onSubmit={handleSubmit}>
                            <div className='flex flex-col items-center justify-center mt-5 text-center'>
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
                                <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400'>SignUp</button>
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