import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="h-12 w-11/12 m-auto flex items-center">
        <Link to={'/'}>
          <div className="text-2xl font-bold">TOKOPEDIA PLAY</div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
