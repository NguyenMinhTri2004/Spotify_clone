import React from 'react'

const Loading = () => {
  return (
    <div className="h-screen w-screen absolute z-50 bg-stone-900/50 ">
        <div className="loading">
            <div className="circle cyan"></div>
            <div className="circle magenta"></div>
            <div className="circle yellow"></div>
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default Loading