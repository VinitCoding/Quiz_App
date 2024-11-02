import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const OTPVerification = () => {
    const [otp, setOtp] = useState('')
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(10)

    const resendOTP = () => {
        console.log('Resend OTP');
        setMinutes(0)
        toast.success('OTP resend')
        setSeconds(15)
    }

    // Timer functions
    useEffect(() => {
        const interval = setInterval(() => {
            // Decrease the seconds if greater than 0
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            // When seconds reach 0, decrease minutes if greater than 0
            if (seconds === 0) {
                if (minutes === 0) {
                    // Stop the countdown when both seconds and minutes are 0
                    clearInterval(interval)
                } else {
                    // Reset seconds to 59 and decrease minutes by 1
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            }
        }, 1000)

        return () => {
            // cleanup functions = Stop the interval when component is unmounts
            clearInterval(interval)
        }
    }, [seconds]) // Re-run this effects whenever the seconds is changed

    // Verify OTP
    const verify_otp = () => {
        if (otp === '1234') {
            toast.success('OTP verified')
            console.log(otp);
            setOtp(' ')
            setMinutes(0)
            setSeconds(0)
        } else {
            toast.error('You entered wrong otp')
        }
    }
    
    return (
        <section className='bg-gradient-to-t from-slate-50 to-[#d6eaff] w-screen h-screen overflow-hidden flex justify-center'>
            <Toaster />
            <div className='flex flex-col justify-center p-6 mt-20 text-center bg-white rounded-md shadow-md w-[30%] h-fit'>
                <h2 className='text-3xl font-bold text-center '>
                    OTP Verification
                </h2>
                <p className='mt-2 text-xl'>
                OTP has been send to <span className='font-semibold'>test@gmail.com</span> <br />Please verify it
                </p> 

                <div className='mt-4'>
                    <input type="text" maxLength={4} className='px-2 py-1 text-center border-black rounded-md border-[0.3px]' onChange={(e) => setOtp(e.target.value)}/>
                </div>

                <div className='flex justify-between mt-3 text-lg'>
                    <p>OTP will expire in 
                        <span className='font-bold'>
                            {minutes < 10 ? ` 0${minutes}:`: minutes}
                            {seconds < 10 ? `0${seconds}`: seconds}
                        </span>
                    </p>

                    <button disabled={seconds > 0 || minutes > 0} className={`${seconds > 0 || minutes > 0 ? 'text-[#adadad] disabled:cursor-not-allowed' :' text-dark-blue cursor-pointer'}`} onClick={resendOTP}>Resend OTP</button>
                </div>

                <div className='flex justify-center mt-3'>
                    <button className='px-4 py-2 font-medium text-white rounded-sm bg-dark-blue w-fit' onClick={verify_otp}>Verify OTP</button>
                </div>
            </div>
        </section>
    )
}

export default OTPVerification