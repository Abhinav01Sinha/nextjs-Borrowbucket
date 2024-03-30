'use client'

import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

function SignInButton() {
  return (
    <Button 
        variant={'ghost'} className='px-0 py-0' 
        onClick={() => signIn()}>
        Sign In
    </Button>
  )
}

export default SignInButton