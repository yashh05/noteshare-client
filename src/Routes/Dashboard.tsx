import { allDocsAtom, userSignedInAtom } from "@/atoms/atoms";
import DocCard from "@/components/DocCard";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { Doc } from "@/tsTypes";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const allDocs = useRecoilValueLoadable(allDocsAtom);
  const setUserSigned = useSetRecoilState(userSignedInAtom);

  if (allDocs.state === "loading") {
    return (
      <div className=" w-[100vw] mt-[20vh] flex flex-col gap-[5vh]">
        <Skeleton className="h-4 w-[50vw] m-auto bg-slate-400" />
        <Skeleton className="h-4 w-[60vw] m-auto bg-slate-400" />
        <Skeleton className="h-4 w-[70vw] m-auto bg-slate-400" />
      </div>
    );
  } else if (allDocs.state === "hasError") {
    setUserSigned(() => {
      return { loggedin: false, email: "" };
    });
    localStorage.removeItem("email");
    navigate("/");
  } else {
    const docArray = allDocs.contents;

    return (
      <div className=" flex justify-center md:justify-start items-center gap-[2vh] px-[4vw] py-[6vw] flex-wrap">
        {docArray.length === 0 && (
          <p>No Document Found, Please Create One (your top right corner)!</p>
        )}
        {docArray.map((doc: Doc) => {
          return (
            <DocCard
              key={doc.docId}
              id={doc.docId}
              role={doc.role}
              name={doc.name}
              desc={doc.desc}
            />
          );
        })}
      </div>
    );
  }
};

export default Dashboard;
