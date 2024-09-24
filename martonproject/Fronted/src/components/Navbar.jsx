import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaSearch,
  FaBars,
  FaRegFileAlt,
} from "react-icons/fa";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      alert(data.message);
    } else {
      alert('Error: ' + data.message);
    }
  };
  return (
    <div className=" w-full  fixed z-50">
      <nav className="bg-[#367DA7] w-full flex gap-[100px] justify-between md:justify-start items-center  px-8 py-6">
        <div>
          <Link to="/home">
            <p
              className="text-[#FFA030] text-[16px] md:text-[22px] ml-[40px] md:ml-[0px] cursor-pointer"
              onClick={() => setActiveIndex(0)}
            >
              Betmarci.online
            </p>
          </Link>
        </div>
        <div
          className="flex md:hidden text-white "
          onClick={() => setToggle(!toggle)}
        >
          {!toggle ? <FaBars size={25} /> : <FaTimes size={25} />}
        </div>
        {toggle && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: toggle ? "0%" : "-100%" }}
            animate1={{ y: !toggle ? "-100%" : "0%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 1,
            }}
            className="bg-[#183B50] px-2 md:hidden  py-2  fixed top-[73px] w-full left-0"
          >
            <div className="flex flex-col justify-center items-center">
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Live arbitrage
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Pre Match arbitrage
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  Pre Match POSITIVE EV
                </p>
              </div>
              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <p className="text-[18px] text-white uppercase">
                  LIVE POSITIVE EV
                </p>
              </div>

              <div className="bg-[#183B50]  border py-1 border-blue-200 w-[90%] rounded-md flex justify-center">
                <div className=" flex gap-2 py-2 items-center ">
                  <form className="flex flex-col gap-2 items-center">
                    <input
                      placeholder="E-mail"
                      name="email"
                      type="Email"
                      className="outline-none py-1 w-[200px] px-2 rounded-lg border-none bg-[#2D6281]"
                      required
                    />
                    <div className="flex items-center">
                      <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        className="outline-none  w-[200px] py-1 px-2 rounded-lg border-none bg-[#2D6281]"
                        required
                      />
                      {/* <FaQuestionCircle size={20} className="absolute mr-[-190px] text-white "/> */}
                    </div>

                    <button
                      className="bg-[#58A5D1] p-1 px-2 rounded-lg text-white hover:bg-[#8258d1] transition-all ease-in-out duration-300"
                      type="submit"
                    >
                      login
                    </button>
                   
                  </form>
                  <Link to='/registration'>
                  <button
                      className="bg-[#FBE800] p-1 px-2 rounded-lg text-white hover:bg-[#d1bf58] transition-all ease-in-out duration-300"
                      
                    >
                      Registor
                    </button>
                  </Link>
                 
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className="hidden gap-4 text-center text-[14px] md:flex ">
          <Link to="/prematch" onClick={() => setActiveIndex(1)}>
            <p
              className={`${
                activeIndex === 1
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              PRE-match <br /> arbitrage
            </p>
          </Link>
          <Link to="/livearbitrage" onClick={() => setActiveIndex(2)}>
            <p
              className={`${
                activeIndex === 2
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              Live
              <br /> arbitrage
            </p>
          </Link>
          <Link to="/preMatchpositiveEV" onClick={() => setActiveIndex(3)}>
            <p
              className={`${
                activeIndex === 3
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              PRE-match <br /> positive ev
            </p>
          </Link>
          <Link to="/livepositiveEV" onClick={() => setActiveIndex(4)}>
            <p
              className={`${
                activeIndex === 4
                  ? "text-white uppercase border-b-4 border-blue-800"
                  : "text-white uppercase"
              }`}
            >
              LIVE <br />
              positive ev
            </p>
          </Link>
        </div>
        <div className="hidden gap-2 items-center md:flex">
        <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <input
        placeholder="E-mail"
        name="email"
        type="email"
        className="outline-none py-1 w-[200px] px-2 rounded-lg border-none bg-[#2D6281]"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex items-center">
        <input
          placeholder="Password"
          name="password"
          type="password"
          className="outline-none w-[200px] py-1 px-2 rounded-lg border-none bg-[#2D6281]"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-[#58A5D1] p-1 px-2 rounded-lg text-white hover:bg-[#8258d1] transition-all ease-in-out duration-300"
        type="submit"
      >
        Login
      </button>
    </form>
          <Link to='/registration'>
                  <button
                      className="bg-[#FBE800] p-1 px-2 rounded-lg text-white hover:bg-[#d1bf58] transition-all ease-in-out duration-300"
                      
                    >
                      Registor
                    </button>
                  </Link>
        </div>
      </nav>
      <div className="bg-[#478FB7] flex md:flex w-full items-center justify-between py-6 md:py-4 px-4 md:px-12">
       
        <div className="flex gap-2 items-center">
          <p className="text-white ">GMT+00:00</p>
          <FaChevronDown size={15} className="text-white " />
        </div>
        <div className="flex md:hidden gap-2 items-center">
            <p className="text-white ">English</p>
            <FaChevronDown size={15} className="text-white " />
          </div>
          <div className="flex md:hidden gap-2 items-center">
            <p className="text-white ">EU Odds (2.5) </p>
            <FaChevronDown size={15} className="text-white " />
          </div>
        <div className=" hidden md:flex gap-4">
          <div className="flex gap-2 items-center">
            <p className="text-white ">English</p>
            <FaChevronDown size={15} className="text-white " />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white ">EU Odds (2.5) </p>
            <FaChevronDown size={15} className="text-white " />
          </div>
          <div className=" hidden md:flex items-center">
            <FaSearch size={25} className="text-white z-50 mr-[-30px]" />
            <input
              placeholder="Search"
              className=" bg-[#2D6281] text-[18px] outline-none border-none rounded-lg py-2 px-8"
            />
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Navbar;
