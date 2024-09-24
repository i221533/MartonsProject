import React, { useEffect, useState } from "react";
import { FaStar, FaDollarSign, FaChevronUp, FaTableTennis, FaChevronDown } from "react-icons/fa";
import bets from '../assets/bets.png';
import bets1 from '../assets/bets1.png';
import image from '../assets/Image.png';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
const SureBeats = () => {
  const [sureBets, setSureBets] = useState([]);
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(true);
  const months = [
    "Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ]; 

  // Function to format date-time without updating state
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return {
      monthDay: `${months[date.getMonth()]}-${day}`,
      time: `${hours}:${minutes < 10 ? '0' + minutes : minutes}` // Add leading zero to minutes if needed
    };
  };

  useEffect(() => {
    const fetchSureBets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/surebeats');
        setSureBets(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surebets:', error);
        setLoading(false);
      }
    };
    fetchSureBets();
  }, []);

  return (
    <div className="mt-[170px] w-full">
      <div className="flex flex-wrap lg:flex-nowrap gap-14 w-full px-2 lg:px-4">
        <div className="w-full flex flex-col gap-4">
          <p className="pt-[20px] text-[#2679B5] text-[22px] pb-[35px] border-b border-blue-300">
            Surebets
          </p>

          {/* Filter section started */}
          <div className="border rounded-lg border-gray-[#D9D9D9]">
            <div className="flex items-center bg-[#F1F1F1] justify-between">
              <div className="flex gap-4 items-center   px-6 py-2">
                <FaChevronUp size={20} />
                <p className="text-[26px] font-semibold">Filter</p>
              </div>

              <div className="pe-4 flex items-center gap-4 ">
                <p className="text-[18px] text-[#555555]">Saved Filters</p>
                <FaChevronDown className="text-[#555555]" size={20} />
              </div>
            </div>

            <div className="p-4 grid  sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
              <div className="mx-3 my-3 text-[#999999]">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">
                  Select include Bookmakers
                </p>
              </div>
              <div className="mx-3 my-3 text-[#999999]">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">
                  Select Exclude BookMakers
                </p>
              </div>
              <div>
                <div className="flex gap-4 px-3 items-center">
                  <div className="h-5 w-5 bg-[#DDD] border rounded-full"></div>
                  <p className="text-[#DDD] text-[20px]">
                    Include All Selected
                  </p>
                </div>
                <div className="flex gap-4 px-3 items-center">
                  <div className="h-5 w-5 bg-[#DDD] border rounded-full"></div>
                  <p className="text-[#DDD] text-[20px]">
                    Include At Least One
                  </p>
                </div>
              </div>
              <div className="mx-3 my-3 text-[#999999]">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2  ">
                  Select Surebet Type
                </p>
              </div>
              <div className="mx-3 my-3">
                <p className="bg-[#f4f4f4] border-2 rounded-xl px-2 py-2 ">
                  Volleyball, Table Tennis
                </p>
              </div>
            </div>

            <div className="grid  p-6  xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
              <div className=" items-center gap-4 justify-end  sm:flex-none md:flex-none lg:flex">
                <div className="text-[#428bd4] text-[20px]">Time period</div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  All
                </div>
              </div>

              <div className=" items-center gap-4 justify-end sm:flex-none md:flex-none lg:flex ">
                <div className="text-[#428bd4] text-[20px]">Min. Profit</div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  No Set
                </div>
              </div>

              <div className=" items-center gap-4 justify-end sm:flex-none md:flex-none lg:flex">
                <div className="text-[#428bd4]  lg:text-[20px]  ">
                  Max. Profit
                </div>
                <div className="pe-20 px-2 py-2 border-2 rounded-lg bg-[#F4F4F4]">
                  No Set
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end mr-2 px-3 mb-4">
              <button className="border-2 rounded-lg px-8 py-2 bg-[#f7f7f7] text-[#dddddd]">
                Save
              </button>
              <button className="border-2 rounded-lg px-8 py-2 bg-[#ffb359] text-white">
                Apply
              </button>
            </div>
          </div>

          {/* Filter section Ended */}

          {/* Data Retrieval Section Started */}
        {
          loading ? (
            <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
    <TailSpin
      height="100"
      width="100"
      color="#428BCA"
      ariaLabel="loading"
    />
  </div>
          ) : (

sureBets.map((bet, index) => {
              const { monthDay, time } = formatDateTime(bet.lastUpdate[0]);
              return (
              
            <div key={index} className="grid lg:grid-cols-2  sm:grid-cols-1 mb-4">
              <div>
                <div className="flex items-center bg-[#E8EBF1]">
                  <FaTableTennis size={25} className="py-1" />
                  <p className="bg-[#E8EBF1] py-1 text-[#468CC8]">
                    Soccer » US » {bet.title}
                  </p>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <div className="ps-3">
                    <p>{monthDay}</p>
                    <p>{time}</p>
                  </div>

                  <div>
                    <p className="text-[18px]">
                      {bet.team1} - {bet.team2} </p>
                    <p className="text-[#837f7f]">Odd/Even</p>
                    <p className="text-[12px] mt-2 text-[#a5a0a0]">
                      Another 5 combinations »{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="justify-between text-center bg-[#E8EBF1] pe-3 grid grid-cols-4">
                  <div className="py-1 ">
                    <p>Odd</p>
                  </div>

                  <div className="py-1">
                    
                  </div>

                  <div className="py-1  ">
                    <p>Even</p>
                  </div>

                  <div className="py-1 ">
                    <p>Profit</p>
                  </div>
                </div>

                <div>
                  <div className=" justify-between pe-2 text-center grid grid-cols-4 mt-4">
                    <div>
                      <p>{bet.odds[0]}</p>
                    </div>
                    <div>
                      
                    </div>
                    <div>
                      <p>{bet.odds[1]}</p>
                    </div>
                    <div>
                      <p  className="text-[blue]">{bet.profit.toFixed(2)}%</p>
                    </div>
                  </div>

                  <div className=" justify-between pe-3 flex mt-4 ">
                    
                    <div>
                      <img
                        src={bets1}
                        className="w-[auto] h-[25px] "
                        alt=""
                      />
                    </div>

                    <div>  
                     </div>

                    <div> 
                      <img
                        src={bets}
                        className="w-[auto] h-[25px] "
                        alt=""
                      />
                    </div>

                    
                    <div >
                      <img
                        src={image}
                        className="w-[auto]  h-[25px] "
                        alt=""
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>

              )})
              )}







          {/* <div>
            {sureBets.map((bet, index) => {
              const { monthDay, time } = formatDateTime(bet.lastUpdate[0]);
              return (
                <div key={index} className="bg-white flex justify-between items-center py-1">
                  <div className="flex gap-4">
                    <p className="text-[#67696C] text-[14px]">{monthDay}</p>
                    <p className="py-1">
                      {bet.team1} - {bet.team2}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="ml-[200px] text-[#67696C] text-[16px]">{bet.odds[0]}</p>
                    <p className="w-[100px] p-4 ml-[20px] bg-[#dddbe3]"></p>
                    <p className="ml-[20px] text-[#67696C] text-[16px]">{bet.odds[1]}</p>
                    <p className="p-1 px-4 ml-[60px] text-[#67696C] text-[16px]">{bet.profit.toFixed(2)}%</p>
                  </div>
                </div>
              );
            })}
          </div> */}



          {/* Data Retrieval Section Ended */}

          <div></div>
        </div>

        {/* Top Events Section Started */}
        <div className="w-full lg:px-0 lg:w-[350px] flex flex-col gap-12 mt-[150px]">
          <div>
            <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
              <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
                <FaStar className="text-white" size={25} />
              </div>
              <div className="px-1 bg-[#D48426]"></div>
              <div className="text-white text-[24px] font-bold flex items-center">
                <p>Top Events</p>
              </div>
            </div>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Premier League
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              FA Community Shield
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Ligue 1
            </p>
            <p className="text-[#478FB7] text-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4">
              Serie A
            </p>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white" size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Bonuses</p>
            </div>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white" size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Partners</p>
            </div>
          </div>
        </div>
        {/* Top Events Section Ended */}
      </div>
    </div>
  );
};

export default SureBeats;
