import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-full pt-24">
      <div className="flex flex-col gap-5  justify-center items-center w-1/3 m-auto shadow-md text-light-grey border-2 rounded-md p-3 font-poppins ">
        <img
          src="/assets/vector.png"
          alt=""
          className="w-9 animate-logo-smooth"
        />
        <h1 className=" text-dark-grey text-2xl font-bold"> WELCOME</h1>
        <h5>
          Already have an account?{" "}
          <Link to="/signin" className="text-black underline cursor-pointer">
            Signin
          </Link>
        </h5>
        <form className=" flex flex-col w-full gap-3">
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none "
          />
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
          <button className=" bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold tracking-wide text-white py-2 rounded-md">
            Signup
          </button>
        </form>
        <hr className=" w-full" />
        <div className="flex justify-between w-full">
          <SignupWithButton src="/assets/google-icon.png" />
          <SignupWithButton src="/assets/github-icon.png" />
          <SignupWithButton src="/assets/twitter-icon.png" />
        </div>
      </div>
    </div>
  );
};

function SignupWithButton({ src }: { src: string }) {
  return (
    <button className="border-2 rounded-md w-[30%] py-2 ">
      <img src={src} alt="" className=" w-8 block m-auto" />
    </button>
  );
}

export default Signup;
