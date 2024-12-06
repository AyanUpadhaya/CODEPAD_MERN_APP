import React from 'react'
import { Link } from 'react-router-dom';
import { code } from '../../assets/getAssets';

const Footer = () => {
  return (
    <div>
      <div className="w-full bg-white border-tertiary-50 py-3  text-neutral-900 shadow-md ">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex gap-2 items-center justify-between">
            <Link to={"/"} className="flex gap-1 items-center">
              <img src={code} className="w-8 h-8" alt="" />
              <h2 className="font-poppins text-xl font-semibold">CodePad</h2>
            </Link>

            <div>
                <h3 className='font-poppins text-xl font-semibold'>CodePad created 2024</h3>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer