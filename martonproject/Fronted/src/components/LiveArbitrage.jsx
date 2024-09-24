import React from "react";
import {
  FaStar,
  FaDollarSign,
  FaChevronUp,
  FaTableTennis,
} from "react-icons/fa";
import bets from "../assets/bets.png";
import bets1 from "../assets/bets1.png";
import image from "../assets/Image.png";
import { FaChevronDown } from "react-icons/fa";
import Sidebar from "./Sidebar";
const LiveArbitrage = () => {
  return (
    <div className="flex w-full">
    <Sidebar/>
    <div className="mt-[170px] w-full ">
      <div className="flex flex-wrap lg:flex-nowrap gap-14 w-full px-2 lg:px-4">
        <div className="w-full flex flex-col gap-4">
          <p className="pt-[20px] text-[#2679B5]  text-[22px] pb-[35px] border-b border-blue-300">
           Live Arbitrage
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

          {/* Data Retiverial Section Started */}

            <div className="grid lg:grid-cols-2  sm:grid-cols-1 mb-4">
              <div>
                <div className="flex items-center bg-[#E8EBF1]">
                  <FaTableTennis size={25} className="py-1" />
                  <p className="bg-[#E8EBF1] py-1 text-[#468CC8]">
                    Table Tennis » Ukraine » Setka Cup
                  </p>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <div className="ps-3">
                    <p>Jul 24</p>
                    <p>05: 30</p>
                  </div>

                  <div>
                    <p className="text-[18px]">
                      Yannick Vostes - Carlos Muhlbach
                    </p>
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
                    <p>Home</p>
                  </div>

                  <div className="py-1">
                    
                  </div>

                  <div className="py-1  ">
                    <p>Away</p>
                  </div>

                  <div className="py-1 ">
                    <p>Profit</p>
                  </div>
                </div>

                <div>
                  <div className=" justify-between pe-2 text-center grid grid-cols-4 mt-4">
                    <div>
                      <p>4.03</p>
                    </div>
                    <div>
                      
                    </div>
                    <div>
                      <p>2.41</p>
                    </div>
                    <div>
                      <p  className="text-[blue]">4.12%</p>
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

            <div className="grid lg:grid-cols-2  sm:grid-cols-1">
              <div>
                <div className="flex items-center bg-[#E8EBF1]">
                  <FaTableTennis size={25} className="py-1" />
                  <p className="bg-[#E8EBF1] py-1 text-[#468CC8]">
                    Table Tennis » Ukraine » Setka Cup
                  </p>
                </div>

                <div className="flex gap-4 items-center mt-4">
                  <div className="ps-3">
                    <p>Jul 24</p>
                    <p>05: 30</p>
                  </div>

                  <div>
                    <p className="text-[18px]">
                      Yannick Vostes - Carlos Muhlbach
                    </p>
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
                    <p>Home</p>
                  </div>

                  <div className="py-1">
                    
                  </div>

                  <div className="py-1  ">
                    <p>Away</p>
                  </div>

                  <div className="py-1 ">
                    <p>Profit</p>
                  </div>
                </div>

                <div>
                  <div className=" justify-between pe-2 text-center grid grid-cols-4 mt-4">
                    <div>
                      <p>4.03</p>
                    </div>
                    <div>
                      
                    </div>
                    <div>
                      <p>2.41</p>
                    </div>
                    <div>
                      <p  className="text-[blue]">4.12%</p>
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

                    
                    <div>
                      <img
                        src={image}
                        className="w-[auto] h-[25px] "
                        alt=""
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          

          {/* Data Retiverial Section Ended */}
          
        </div>

        {/* Top Events Section Started */}
        <div className=" w-full  lg:px-0 lg:w-[350px] flex flex-col gap-12 lg:mt-[90px] sm:mt-[30px]">
          <div>
            <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
              <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
                <FaStar className="text-white " size={25} />
              </div>
              <div className="px-1 bg-[#D48426]"></div>
              <div className="text-white text-[24px] font-bold flex items-center">
                <p>Top Events</p>
              </div>
            </div>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Premier League
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              FA Community Shield
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Ligue 1
            </p>
            <p className="text-[#478FB7] textt-[12px] py-2 cursor-pointer border-b border-blue-400 hover:border-4  ">
              Serie A
            </p>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white " size={25} />
            </div>
            <div className="px-1 bg-[#D48426]"></div>
            <div className="text-white text-[24px] font-bold flex items-center">
              <p>Bonuses</p>
            </div>
          </div>

          <div className="flex bg-[#FFA030] gap-4 px-2 rounded-lg">
            <div className="flex items-center mb-2 mt-2 p-2 border-2 border-white rounded-full">
              <FaDollarSign className="text-white " size={25} />
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
    </div>
  );
};

export default LiveArbitrage;