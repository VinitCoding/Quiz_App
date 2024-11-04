import { Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useNavbar, User } from '@nextui-org/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import logo from "../assets/logo.svg";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ExamPage = () => {
  const getUser = localStorage.getItem("sign_up_user_email");
  const navigate = useNavigate('/')
  const handleLogout = () => {
    localStorage.removeItem('sign_up_user_email')
    navigate('/')
  }
  return (
    <section className='w-screen h-screen bg-[#c9eafe]'>
      {/* Nav */}
      <nav className="flex justify-between w-full p-3 bg-white border-b-2 gap-x-1">
        <div className="flex gap-x-2">
          <img src={logo} alt="" className="w-[60%]" />
          <h2 className="text-2xl font-bold">Quizly</h2>
        </div>

        <Dropdown>
          <DropdownTrigger className="">
            <button>
              <FaUser />
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem>
              <User
                name="Jane Doe"
                description={`${getUser}`}
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                }}
              />
            </DropdownItem>
            <DropdownItem>
            <Divider />
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              onClick={handleLogout}
            >
              <p className="flex items-center gap-x-2">
                <RiLogoutBoxRLine className="text-lg"/>
                <span>LogOut</span>
              </p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>

      {/* Main Content */}
      <div>
        Exam Page
      </div>
    </section>
  )
}

export default ExamPage