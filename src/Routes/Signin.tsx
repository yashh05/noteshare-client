import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className=" pt-28">
      <div className="flex flex-col gap-5 justify-center items-center w-1/3 m-auto shadow-md text-light-grey border-2 rounded-md p-3 font-poppins ">
        <img
          src="/assets/vector.png"
          alt=""
          className="w-9 animate-logo-smooth"
        />
        <h1 className=" text-dark-grey text-2xl font-bold"> WELCOME BACK</h1>
        <h5>
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-black underline cursor-pointer">
            signup
          </Link>
        </h5>
        <form className=" flex flex-col w-full gap-3">
          <input
            type="text"
            placeholder="email address"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
          />
          <button className=" bg-[#0272D8] font-semibold tracking-wide text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <hr className=" w-full" />
        <div className="flex justify-between w-full">
          <LoginWithButton src="/assets/google-icon.png" />
          <LoginWithButton src="/assets/github-icon.png" />
          <LoginWithButton src="/assets/twitter-icon.png" />
        </div>
      </div>
    </div>
  );
};

function LoginWithButton({ src }: { src: string }) {
  return (
    <button className="border-2 rounded-md w-[30%] py-2 ">
      <img src={src} alt="" className=" w-8 block m-auto" />
    </button>
  );
}

export default Signin;
