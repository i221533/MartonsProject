import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SureBeats  from './SureBeats';

const Home = () => {
  return (
    <div className='flex '>
      
      <div className='flex w-full'>
      <Sidebar/>
      <SureBeats/>
      </div>
    </div>
  )
}

export default Home;
