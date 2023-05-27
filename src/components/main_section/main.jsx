import React from 'react';
import Header from '../header/header.jsx';
import Left from '../left_section/left.jsx';
import Body from '../body/body.jsx';
import './main.css';

const Main = () => {
  return (
    <div className='main'>
        <div className='main_header'><Header/></div>
        <div className='bottom'>
          <hr className='hr-h'/>
          <div className='main_left'><Left/></div><hr className='hr1'/> 
          <div className='main_body'><Body/></div><hr className='hr2'/> 
        </div>      
    </div>
  )
}

export default Main