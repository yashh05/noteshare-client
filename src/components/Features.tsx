const Features = () => {
  const featureArray = [
    {
      title: "Secure Login",
      desc: "Safety and privacy come first with our secure login system,ensuring your notes stay private.",
      icon: "./assets/cloud-icon.png",
    },
    {
      title: "Easy Sharing",
      desc: "Share notes with classmates or study groups simply and swiftly, no matter where you are.",
      icon: "./assets/eye-icon.png",
    },
    {
      title: "Personalized Dashboard",
      desc: "Organize your study materials with a customizable dashboard tailored to your needs.",
      icon: "./assets/shopping-cart-icon.png",
    },
  ];
  return (
    <div
      id="features"
      className="grid grid-cols-2 px-[7vw] py-[19vh] font-poppins "
    >
      <div className="flex flex-col gap-5 p-[1vw] text-light-grey">
        <h3 className="text-4xl font-title text-dark-grey">Key Features</h3>
        <p>
          Elevate your learning experience with our robust features that help
          you create, share, and manage notes effectively.
        </p>
        {featureArray.map((feature) => {
          return (
            <div className="flex gap-2">
              <div>
                <img src={feature.icon} alt="" className=" w-10" />
              </div>
              <div>
                <h1 className=" text-dark-grey font-roboto font-semibold text-xl">
                  {feature.title}
                </h1>
                <p className="mt-1 ">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" border-[20px] border-slate-800 rounded-md border-b-2 border-b-white feature-component">
        <img
          src="./assets/feautures.jpeg"
          alt=""
          className=" w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Features;
