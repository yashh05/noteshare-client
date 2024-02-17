import { Link } from "react-scroll";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <nav className=" w-2/3 flex justify-between px-[1.2vw] py-[1.5vw] m-auto items-center shadow-lg rounded-md border bg-white animate-fade-up mt-[2vh]">
      <div className=" cursor-pointer flex items-center gap-[0.3vw]">
        <img
          src="./assets/logo2.svg"
          alt=""
          className=" inline-block max-w-[2.7vw] animate-logo-smooth"
        />
        <h3 className=" inline-block text-[2vw] font-title tracking-wider font-semibold">
          NoteShare
        </h3>
      </div>
      {/* <div className="flex gap-8 items-center">
        <Link
          to="features"
          spy={true}
          smooth={true}
          className="underline-component cursor-pointer"
        >
          Features
        </Link>
        <Link
          activeClass="active"
          to="explore"
          spy={true}
          smooth={true}
          className="underline-component cursor-pointer"
        >
          Explore
        </Link>

        <a href="#">
          <button className=" px-[1em] py-[0.5em] border border-slate-400  rounded-md">
            <h1 className=" transition-all hover:scale-110"> Sign Up</h1>
          </button>
        </a>
        <a href="#">
          {" "}
          <button className="px-[1em] py-[0.5em] border border-slate-400  rounded-md">
            <h1 className=" transition-all hover:scale-110">Log In</h1>
          </button>
        </a>
      </div> */}
      <div className="flex justify-center items-center gap-[1vw]">
        <Dialog>
          <DialogTrigger>
            <Button className="px-[1.5vw] py-[1vw] text-[1.2vw]">
              <img src="/assets/add-file.png" alt="" className=" w-[2vw]" />
              <span className="ml-[0.3vw]"> Add Doc</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Doc</DialogTitle>
              <DialogDescription>
                Enter the Name of Doc{" "}
                <span>
                  {" "}
                  <b>(Name should be unique)*</b>
                </span>
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="File Name"
                  className="col-span-3"
                />
              </div>
              <Button>Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
        <a href="#">
          <button className=" px-[1vw] py-[0.5vw] border border-slate-400  rounded-md">
            <h1 className=" transition-all hover:scale-110 text-[1vw]">
              {" "}
              Log Out
            </h1>
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
