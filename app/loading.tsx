import React from 'react'

function loading() {
  return (
    <div className="w-[100%] flex items-center justify-center h-[100vh] bg-[rgba(0,0,0,0.1)] absolute">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  )
}

export default loading