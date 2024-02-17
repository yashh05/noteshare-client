import DocCard from "@/components/DocCard";

const Dashboard = () => {
  return (
    <div className=" flex gap-[1.5vw] px-[4vw] py-[6vw] flex-wrap">
      <DocCard role="admin" name="first file" desc="this is my first file" />
      <DocCard
        role="read-only"
        name="first file"
        desc="this is my first file"
      />
      <DocCard role="admin" name="first file" desc="this is my first file" />
      <DocCard role="admin" name="first file" desc="this is my first file" />
      <DocCard role="admin" name="first file" desc="this is my first file" />
      <DocCard
        role="read-write"
        name="first file"
        desc="this is my first file"
      />
      <DocCard role="admin" name="first file" desc="this is my first file" />
      <DocCard role="admin" name="first file" desc="this is my first file" />
    </div>
  );
};

export default Dashboard;
