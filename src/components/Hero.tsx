const Hero = () => {
  return (
    <div className=" grid grid-cols-2 h-[100vh] font-poppins tracking-wide font-bold">
      <div className=" flex flex-col justify-center gap-8 px-[18%]">
        <h1 className=" text-6xl font-title font-light text-dark-grey">
          Simplify Your Study
        </h1>
        <p className=" text-light-grey ">
          Discover the easiest way to share and access study notes from
          anywhere. Get started for free, collaborate, and boost your learning!
        </p>
        <div className=" flex gap-5">
          <button className=" border-2 px-[0.7em] py-[0.4em] rounded-md hover:bg-slate-300 transition">
            Start Sharing
          </button>
          <button className=" border-2 px-[0.7em] py-[0.4em] rounded-md hover:bg-slate-300 transition">
            See How It works
          </button>
        </div>
        {/* Start Sharing See How It Works */}
      </div>
      <div>
        <img src="./assets/landing.jpeg " alt="" className=" h-full w-full" />
      </div>
    </div>
  );
};

export default Hero;
