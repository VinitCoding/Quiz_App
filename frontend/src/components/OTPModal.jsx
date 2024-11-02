import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server';
import { PinInput } from './ui/pin-input.jsx'
import { Provider } from './ui/provider.jsx'
import toast, { Toaster } from 'react-hot-toast';

// With Timer functionality
// const OTPModal = () => {
//   const [otp, setOtp] = useState('');
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(30);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const otpInputRef = useRef(null); // Create a ref for the input field

//   const resendOTP = () => {
//     // Logic to resend OTP
//     console.log('Resending OTP...');
//   };

//   const handleOtpChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value) && value.length <= 6) { // Only allow numeric input and limit to 6 digits
//       setOtp(value);
//     }
//   };

//   // Timer function
//   const startTimer = () => {
//     setMinutes(0);
//     setSeconds(30);
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds > 0) return prevSeconds - 1;
//         if (minutes > 0) {
//           setMinutes((prevMinutes) => prevMinutes - 1);
//           return 59;
//         }
//         clearInterval(interval);
//         return 0;
//       });
//     }, 1000);
//     setTimerInterval(interval);
//   };

//   // Show OTP modal
//   const showOtpModal = () => {
//     startTimer();
//     Swal.fire({
//       title: 'OTP Verification',
//       html: ReactDOMServer.renderToString(generate_ui_for_otp()),
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       didOpen: () => {
//         // Delay the focus to ensure the input is available
//         setTimeout(() => {
//           if (otpInputRef.current) {
//             otpInputRef.current.focus();
//           }
//         }, 100); // Adjust the timeout if necessary
//       },
//       willClose: () => {
//         clearInterval(timerInterval); // Clear the timer on modal close
//         setOtp(''); // Reset OTP state on close
//       }
//     });
//   };

//   // Update SweetAlert content on each timer tick
//   useEffect(() => {
//     if (timerInterval) {
//       Swal.update({
//         html: ReactDOMServer.renderToString(generate_ui_for_otp()),
//       });
//     }
//   }, [minutes, seconds, timerInterval]);

//   const generate_ui_for_otp = () => (
//     <Provider>
//       <div className='flex flex-col items-center justify-center gap-y-4'>
//         <h2 className='text-[100%] font-medium'>OTP has been sent to your registered email ID.<br />Please verify it.</h2>
//         <div className='w-[80%]'>
//           <input
//             ref={otpInputRef} // Attach the ref to the input
//             id="otp-input"
//             type="text"
//             value={otp}
//             onChange={handleOtpChange}
//             maxLength="6"
//             className="w-full text-center text-black bg-white border border-black outline-none p-1.5 rounded-md"
//             placeholder="Enter OTP"
//           />
//         </div>
//         <div className='flex justify-between text-sm gap-x-24'>
//           <p>OTP will expire in
//             <span className='font-bold'>
//               {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
//             </span>
//           </p>
//           <button
//             disabled={seconds > 0 || minutes > 0}
//             className={`${seconds > 0 || minutes > 0 ? 'text-[#939393] disabled:cursor-not-allowed' : 'text-dark-blue'}`}
//             onClick={resendOTP}
//           >
//             Resend OTP
//           </button>
//         </div>
//         <button className='px-4 py-2 text-base text-white bg-dark-blue'>Verify OTP</button>
//       </div>
//     </Provider>
//   );


//   return (
//     <div>
//       <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400' onClick={showOtpModal}>Open OTP</button>
//     </div>
//   )
// }

// 

// Without timer functionality
const OTPModal = () => { // Without timer 
  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [timerInterval, setTimerInterval] = useState(null);
  const [resend, setResend] = useState(false)
  const otpInputRef = useRef(null); // Create a ref for the input field

  const resendOTP = () => {
    // Logic to resend OTP
    console.log('Resending OTP...');
  };

  const startTimer_v1 = () => {
    setResend(false)
    setTimeout(() => {
      setResend(true)
      toast.success('You can resend the OTP')
    }, 10000)

    return () => clearInterval(timerInterval); // Cleanup on modal close
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) { // Only allow numeric input and limit to 6 digits
      setOtp(value);
    }
  };

  // Timer function
  const startTimer = () => {
    setMinutes(0);
    setSeconds(30);
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) return prevSeconds - 1;
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        }
        clearInterval(interval);
        return 0;
      });
    }, 1000);
    setTimerInterval(interval);
  };

  // Show OTP modal
  const showOtpModal = () => {
    // startTimer();
    startTimer_v1()
    Swal.fire({
      title: 'OTP Verification',
      html: ReactDOMServer.renderToString(generate_ui_for_otp()),
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        // Delay the focus to ensure the input is available
        setTimeout(() => {
          if (otpInputRef.current) {
            otpInputRef.current.focus();
          }
        }, 100); // Adjust the timeout if necessary
      },
      willClose: () => {
        clearInterval(timerInterval); // Clear the timer on modal close
        setOtp(''); // Reset OTP state on close
      }
    });
  };

  // Update SweetAlert content on each timer tick
  // useEffect(() => {
  //   console.log(minutes, seconds);
  // }, [minutes, seconds, timerInterval]);

  const generate_ui_for_otp = () => (
    <Provider>
      <div className='flex flex-col items-center justify-center gap-y-4'>
        <h2 className='text-[100%] font-medium'>OTP has been sent to your registered email ID.<br />Please verify it.</h2>
        <div className='w-[80%]'>
          <input
            ref={otpInputRef} // Attach the ref to the input
            id="otp-input"
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength="6"
            className="w-full text-center text-black bg-white border border-black outline-none p-1.5 rounded-md"
            placeholder="Enter OTP"
          />
        </div>
        <div className='flex justify-between text-sm gap-x-24'>
          <p>OTP will expire in
            <span className='font-bold'>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </p>
          <button
            // disabled={seconds > 0 || minutes > 0}
            disabled={resend}
            className={`${resend ? 'text-dark-blue ' : 'text-[#939393] disabled:cursor-not-allowed'}`}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </div>
        <button className='px-4 py-2 text-base text-white bg-dark-blue'>Verify OTP</button>
      </div>
    </Provider>
  );


  return (
    <div>
      <Toaster />
      <button type='submit' className='px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-400' onClick={showOtpModal}>Open OTP</button>
    </div>
  )
}

export default OTPModal