import { userSignedInAtom } from "@/atoms/atoms";
import { LoadingSpinner } from "@/components/ui/icons";
import { signInSchema } from "@/zod/schema";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ZodError } from "zod";

axios.defaults.withCredentials = true;

const Signin = () => {
  const [loading, setLoading] = useState(false);

  const inititalError = {
    emailError: "",
    passwordError: "",
    other: "",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState(inititalError);

  const setUserSigned = useSetRecoilState(userSignedInAtom);

  const navigate = useNavigate();

  async function handleSignin(e: any): Promise<void> {
    e.preventDefault();

    try {
      setLoading(true);
      setFormError(inititalError);
      const res = signInSchema.parse({
        email: form.email,
        password: form.password,
      });
      const { email, password } = res;

      const data = await axios.post(
        `${import.meta.env.VITE_BACKEND_PATH}/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(data);

      setUserSigned(() => {
        return { loggedin: true, email: data.data.email };
      });
      localStorage.setItem("email", data.data.email);
      setLoading(false);
      // navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      if (error instanceof ZodError) {
        const err = error.errors.map((indiErr) => {
          return {
            path: indiErr.path[0],
            message: indiErr.message,
          };
        });
        err.forEach((error) => {
          console.log(error);
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
    } finally {
      setLoading(false);
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
      <div className="flex flex-col gap-[3vw] md:gap-[1.2vw] justify-center items-center w-[80vw] md:w-2/5 m-auto shadow-md text-light-grey border-2 rounded-md p-3 font-poppins ">
        <img
          src="/assets/vector.png"
          alt=""
          className="w-9 animate-logo-smooth"
        />
        <h1 className=" text-dark-grey text-2xl font-bold"> WELCOME BACK</h1>
        {formError.other !== "" && (
          <p className=" text-red-500">{formError.other}</p>
        )}
        <h5>
          Don't have an account yet?{" "}
          <Link to="/signup" className="text-black underline cursor-pointer">
            signup
          </Link>
        </h5>
        <form className=" flex flex-col w-full gap-3" onSubmit={handleSignin}>
          <input
            type="text"
            placeholder="email address"
            name="email"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
            onChange={handleChange}
          />
          {formError.emailError !== "" && (
            <p className=" text-red-500">{formError.emailError}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-2 bg-[#ebe9e9] py-2 rounded-md outline-none"
            onChange={handleChange}
          />
          {formError.passwordError !== "" && (
            <p className=" text-red-500">{formError.passwordError}</p>
          )}

          <button
            type="submit"
            className=" bg-[#0272D8] font-semibold tracking-wide text-white py-2 rounded-md"
          >
            {loading ? <LoadingSpinner className=" m-auto" /> : "Login"}
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
