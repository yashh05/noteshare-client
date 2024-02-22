import { userSignedInAtom } from "@/atoms/atoms";
import { signUpSchema } from "@/zod/schema";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ZodError } from "zod";

const Signup = () => {
  const inititalError = {
    nameError: "",
    emailError: "",
    passwordError: "",
    other: "",
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(inititalError);

  const setUserSigned = useSetRecoilState(userSignedInAtom);

  const navigate = useNavigate();

  async function handleSignup(e: any): Promise<void> {
    e.preventDefault();

    try {
      setFormError(inititalError);
      const res = signUpSchema.parse({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      const { name, email, password } = res;

      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_PATH}/auth/signup`,
        {
          name,
          email,
          password,
        }
      );

      setUserSigned(() => {
        return { loggedin: true, email: data.data.email };
      });
      localStorage.setItem("email", data.data.email);

      navigate("/dashboard");
    } catch (error: any) {
      if (error instanceof ZodError) {
        const err = error.errors.map((indiErr) => {
          return {
            path: indiErr.path[0],
            message: indiErr.message,
          };
        });
        err.forEach((error) => {
          setFormError(inititalError);
          setFormError((formError) => {
            return { ...formError, [error.path + "Error"]: error.message };
          });
        });
      } else {
        setFormError(inititalError);
        setFormError((formError) => {
          return { ...formError, other: error.response.data.error };
        });
      }

      setUserSigned(() => {
        return { loggedin: false, email: "" };
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  return (
    <div className=" w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-[3vw] md:gap-[1.2vw] justify-center items-center w-[80vw] md:w-2/5 m-auto shadow-md text-light-grey border-2 rounded-md p-3 font-poppins">
        <img
          src="/assets/vector.png"
          alt=""
          className="w-9 animate-logo-smooth"
        />
        <h1 className=" text-dark-grey text-2xl font-bold"> WELCOME</h1>
        {formError.other !== "" && (
          <p className=" text-red-500">{formError.emailError}</p>
        )}
        <h5>
          Already have an account?{" "}
          <Link to="/signin" className="text-black underline cursor-pointer">
            Signin
          </Link>
        </h5>
        <form className=" flex flex-col w-full gap-3" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none "
          />
          {formError.nameError !== "" && (
            <p className=" text-red-500">{formError.emailError}</p>
          )}
          <input
            type="text"
            placeholder="email address"
            name="email"
            onChange={handleChange}
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
          />
          {formError.emailError !== "" && (
            <p className=" text-red-500">{formError.emailError}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
          />
          {formError.passwordError !== "" && (
            <p className=" text-red-500">{formError.emailError}</p>
          )}
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
