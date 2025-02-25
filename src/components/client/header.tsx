import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <div className="bg-[#4E7C32] px-4 py-2 flex text-white justify-center items-center">
      <input
        type="text"
        placeholder="Suchen Sie nach Produkten, Marken und mehr"
        className="px-4 py-3 rounded-md bg-white w-120 text-black"
      />
      <span className="pl-60 py-1">
        <div className="flex items-center space-x-4">
          <button className="hover:underline">
            Language
          </button>
          <Link to={'/account'} className="hover:underline">
            Account
          </Link>
          <button className="hover:underline">Cart</button>
        </div>
      </span>
    </div>

    <div className="bg-[#4E7C32] px-4 py-3 flex justify-center items-center">
      <div className="flex space-x-35">
        <ul className="flex space-x-35">
          <li>
            <Link to={'/'} className="text-white font-bold hover:text-blue-600 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/products'} className="text-white font-bold hover:text-blue-600 transition duration-300">
              Products
            </Link>
          </li>
          <li>
            <Link to={'/about'} className="text-white font-bold hover:text-blue-600 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to={'/contact'} className="text-white font-bold hover:text-blue-600 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
