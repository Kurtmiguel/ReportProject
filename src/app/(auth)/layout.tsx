import React from 'react'

type Props = {
    children: React.ReactNode;
  };
  

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-dvh flex flex-col  ">
      <main className="flex-1  flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout