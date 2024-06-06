import Link from 'next/link';

const LoginForm = () => {
  return(
    <main className="h-screen flex flex-col justify-center items-center bg-white bg-cover bg-center bg-no-repeat font-serif">
      <header>
        <img src="/images/trinity logo.png" alt="Trinity Logo" className="h-13" />
      </header>
      <div className="flex justify-center items-center flex-1">
        <aside className="bg-gray w-full max-w-md rounded-xl bg-opacity-20 shadow-black shadow-2xl">
          <h1 className="text-center text-peach font-light text-4xl bg-darkgreen rounded-t-xl m-0 py-4">
            Sign In
          </h1>
        <form className="p-6" >
          <input 
            type="text" 
            name="" 
            placeholder="E-mail" 
            className="py-2 px-3 w-full text-black text-lg font-light outline-none"
            />
          <input 
            type="Password" 
            name="" 
            placeholder="Password" 
            className="py-2 px-3 w-full text-black text-lg font-light outline-none mt-3"
          />
          <div className="flex mt-5 justify-between items-center">
            <Link
              href="/sign-up" 
              className="text-darkgreen cursor-pointer transition hover:text-white">
              Not Yet Registered?
            </Link>
            <Link href="/dashboard">
              <button type="submit" className="bg-darkgreen text-peach font-medium py-2 px-8 transition hover:text-white">
                Sign In
              </button>
            </Link>
            
          </div>
        </form>
        </aside>
      </div>
    </main>
  );
};

export default LoginForm;