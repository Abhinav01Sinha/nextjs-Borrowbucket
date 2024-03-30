import { cn } from '@/lib/utils'
import React , {ReactNode} from 'react'

function MaxWidthContainer( 
    {children , classes} : {
        children : ReactNode ,
        classes ? : string
    }
) {
  return (
    <div className={cn('container max-w-2xl md : max-w-4xl' , `${classes}`) }>{children}</div>
  )
}

export default MaxWidthContainer