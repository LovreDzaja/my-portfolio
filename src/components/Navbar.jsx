import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to="/" className={"w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md"}>
        <p className='text-red-400 cursor-pointer'>LDZ</p>
      </NavLink>
      <nav className="flex gap-6 font-bold">
        <NavLink to="/about" className={({isActive}) => isActive ? 'text-red-500 cursor-pointer' : 'text-black'}>
          <p className='text-red-400 cursor-pointer'>/About</p>
        </NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? 'text-red-500 cursor-pointer' : 'text-black'}>
          <p className='text-red-400 cursor-pointer'>/Projects</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar;