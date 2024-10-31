import React from 'react'
import bg_img from '../assets/bg_rectangle.svg'
import underline from '../assets/underline.svg'
import online_test from '../assets/online_test_bg.svg'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'


const LandingPage = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/auth')
    }
    return (
        <section className='bg-gradient-to-t from-[#c8e3ff] to-slate-50 w-screen h-screen overflow-hidden'>
            {/* Bg-img */}
            <div className='relative'>
                <img src={bg_img} alt="" className='absolute w-screen' />
            </div>

            {/* Navbar */}
            <nav className='w-[90.6%] p-3 flex gap-x-1'>
                <img src={logo} alt="" className='w-[3%]' />
                <h2 className='text-3xl font-bold'>Quizly</h2>
            </nav>

            {/* Title */}
            <div className='relative flex justify-center mt-5 text-center'>
                <h1 className='w-[65%] text-6xl leading-[130%] z-10'>
                    Challenge Your Knowledge and Elevate Your Skills on <span className='font-semibold'>Quizly</span>
                </h1>
                <img src={underline} alt="underline_img" className='absolute top-[80%] right-[33%]' />
            </div>

            {/* About */}
            <div className='flex justify-center mt-6 text-center'>
                <p className='w-[50%] text-xl font-normal'>
                    <span className='font-medium'>Quizly</span> is an interactive quiz app that lets you test your knowledge across various topics while having fun. Complete each quiz and get instant feedback, with a personalized scorecard displayed at the end to track your performance.
                </p>
            </div>

            {/* Button */}
            <div className='mt-6 absolute left-[48%]'>
                <button className='bg-dark-blue text-white px-4 py-1.5 rounded text-lg font-medium shadow-md shadow-blue-400 hover:shadow-none cursor-pointer ' onClick={handleNavigate}>
                    Login
                </button>
            </div>

            <div className='flex justify-center mt-3'>
                <img src={online_test} alt="" className='w-[30%]' />
            </div>

        </section>
    )
}

export default LandingPage