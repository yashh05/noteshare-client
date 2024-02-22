const Hero = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-[3vh] md:gap-0 font-poppins tracking-wide font-bold">
      <div className=" flex flex-col justify-center gap-[4vh] px-[5vw] md:px-[18%]">
        <h1 className=" text-[8vw] md:text-[5vw] leading-[5vw] font-title font-light text-dark-grey">
          Simplify Your Study
        </h1>
        <p className=" text-light-grey ">
          Discover the easiest way to share and access study notes from
          anywhere. Get started for free, collaborate, and boost your learning!
        </p>
        <div className=" flex gap-[1vw]">
          <button className=" border-2 px-[1em] py-[0.5vw] rounded-md hover:bg-slate-300 transition">
            Start Sharing
          </button>
          <button className=" border-2 px-[0.7em] py-[0.4vw] rounded-md hover:bg-slate-300 transition">
            See How It works
          </button>
        </div>
      </div>
      <div className="border-black p-3 ">
        <img
          src="./assets/landing.jpeg "
          alt=""
          className=" h-full w-ful object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
