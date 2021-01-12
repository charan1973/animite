import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-blue-400 text-white h-16 flex justify-between items-center px-5">
      <Link to="/">
        <h2 className="text-xl font-bold">Animite</h2>
      </Link>
      <ul>
          <li><Link to="/">Home</Link></li>
      </ul>
    </div>
  );
};

export default NavBar;
