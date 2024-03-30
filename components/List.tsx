import React, { ReactNode } from 'react'

function List({ children }: { children: ReactNode }) {
  return (
    <div className='px-2 sm:px-0 flex flex-col py-8 lg:flex-row gap-8 lg:gap-x-4'>
      {children}
    </div>
  )
}

export function ListItem({
  count, primary, secondary
}: {
  count: number, primary: string, secondary: string
}) {
  return (
    <div className='flex justify-start items-center'>
      <div className='min-w-8 mr-4 flex items-center justify-center border rounded-full border-gray-500'>
        <span className='text-lg font-bold text-gray-500'>{count}</span>
      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-lg'> {primary}</span>
        <span className='text-slate'>{secondary}</span>
      </div>
    </div>
  )
}

export default List