'use client'
 
import { useState, ReactNode } from 'react'
 
export default function ShowMoreButton({ children }: { children: ReactNode }) {
  const [isMoreShown, updateMoreShown] = useState(false);

  return (
    <>
        <button className='showMoreButton' onClick={() => updateMoreShown(!isMoreShown)}>
            {isMoreShown ? "Hide" : "Show More"}
        </button>
        {isMoreShown && children}
    </>
  )
}