import FeatureClassic from "../components/FeatureClassic";
import Features from "../components/Features";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="flex flex-col my-[5vh]">
      <Hero />
      <Features />
      <FeatureClassic />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
