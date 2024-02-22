import { Link as ScrollLink } from "react-scroll";
import { Button } from "./ui/button";
import { useRecoilState } from "recoil";
import { userSignedInAtom } from "@/atoms/atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AddNewDoc from "./dialogs/addNewDoc";

const Navbar = () => {
  const [userSignedIn, setUserSignedIn] = useRecoilState(userSignedInAtom);

  const location = useLocation();

  const navigate = useNavigate();

  const handleSignout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_PATH}/auth/signout`);
    localStorage.removeItem("email");
    setUserSignedIn({ loggedin: false, email: null });
    navigate("/");
  };

  return (
    <nav className=" w-full flex justify-around md:justify-between px-[3vw] py-[1.5vw] m-auto items-center shadow-lg rounded-md border bg-white animate-fade-up">
      <div className=" cursor-pointer flex items-center gap-[2vw] md:gap-[0.3vw]">
        <img
          src="./assets/logo.png"
          alt=""
          className=" inline-block max-w-[7vw] md:max-w-[2.7vw] animate-logo-smooth"
        />
        {/* <h3 className=" hidden md:inline-block text-[5vw] md:text-[2vw] font-title tracking-wider font-semibold">
          NoteShare
        </h3> */}
      </div>
      <div className="flex justify-around md:justify-center items-center text-[2.5vw] md:text-[1.2vw] gap-[2vw] md:gap-[1vw]">
        {location.pathname === "/" && (
          <>
            <ScrollLink
              to="features"
              spy={true}
              smooth={true}
              className="underline-component cursor-pointer "
            >
              Features
            </ScrollLink>
            <ScrollLink
              activeClass="active"
              to="explore"
              spy={true}
              smooth={true}
              className="underline-component cursor-pointer"
            >
              Explore
            </ScrollLink>
            {userSignedIn.loggedin && (
              <Link
                to="/dashboard"
                className="underline-component cursor-pointer"
              >
                Dashboard
              </Link>
            )}
          </>
        )}
        {userSignedIn.loggedin ? (
          <>
            {location.pathname === "/dashboard" && <AddNewDoc />}
            <Button
              className="transition-all hover:scale-110 px-[4vw] text-[2vw] md:px-[1.5vw] md:py-[1vw] md:text-[1.2vw]"
              onClick={handleSignout}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/signup">
              <Button className="transition-all hover:scale-110 text-[3vw] md:text-[1vw]">
                Sign Up
              </Button>
            </Link>
            <Link to="/signin">
              <Button className="transition-all hover:scale-110 text-[3vw] md:text-[1vw]">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
