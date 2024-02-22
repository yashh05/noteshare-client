const FeatureClassic = () => {
  const featureClassicArray = [
    {
      id: 1,
      icon: "/assets/fire-icon.png",
      title: "Quick Sync",
      desc: "Instantly synchronize your notes across all devices, so you can pick up where you left off anytime.",
    },
    {
      id: 2,
      icon: "/assets/timer-icon.png",
      title: "Collaborate",
      desc: "Work with peers with in-app collaboration tools. Ask questions, offer help, and build a community.",
    },
    {
      id: 3,
      icon: "/assets/cloud-icon.png",
      title: "Always On",
      desc: "Access your notes 24/7, with our reliable platform that's always available when you need it.",
    },
  ];

  return (
    <div
      id="explore"
      className="px-[6vw] py-[9vh] font-poppins text-light-grey"
    >
      <h1 className=" font-title text-[10vw] md:text-[4vw] text-dark-grey">
        Why Choose Us?
      </h1>
      <p className=" mt-4 text-xl">
        NoteShare stands out as your go-to platform for academic collaboration,
        offering a suite of features designed to enhance your study habits.
      </p>
      <div className="flex flex-col md:flex-row mt-[4vh] justify-between gap-[4vh] md:gap-5">
        {featureClassicArray.map((feature) => {
          return (
            <FeatureClassicCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          );
        })}
      </div>
    </div>
  );
};

function FeatureClassicCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className=" flex flex-col gap-2 flex-wrap">
      <div className="flex md:flex-col flex-row items-center gap-[2vw] md:gap-[1vw]">
        <img src={icon} alt="" className=" w-8" />
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p>{desc}</p>
    </div>
  );
}

export default FeatureClassic;
