const Header = () => {
  return (
    <header className='bg-white shadow-md flex py-4 items-center relative z-50'>
        <div className='logo w-1/5'>PH231244</div>
        <div className='navbar flex justify-between w-4/5 items-center'>
            <form>
                <input className='border w-[350px] p-2 rounded-md' type='text' placeholder='Tìm kiếm'/>
            </form>
            <nav>
                <ul>
                    <li>
                        Xin chào admin
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header