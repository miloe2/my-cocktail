'use client'
import { testPhone } from '@/api';
import React, { useState } from 'react'

const testpage = () => {
const [ testword, setTestword ] = useState(false);
const callTestApi = async()  => {
  try {
    const rsp = await testPhone();
    setTestword(!testword)
    return rsp
  } catch (error) {
    console.log(error)    
  }

}

  return (
    <div>
      <button onClick={callTestApi}>callTEstAPi</button>
      <div className='mt-40 bg-red-500'>
        {testword.toString()}
      </div>
    </div>
  )
}

export default testpage