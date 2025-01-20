import { Link } from "react-router-dom";
import logoimg from "../../assets/airbnb.png";  

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1 cursor-pointer rounded-3xl">
      <img src={logoimg} alt="" className="w-9"/>
      <div className="text-xl hidden md:flex font-bold text-primary">BookMyVenue</div>
    </Link>
  );
};

export default Logo;
