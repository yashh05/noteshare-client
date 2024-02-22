import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Role } from "@/tsTypes";
import { Link, useNavigate } from "react-router-dom";

export default function DocCard({
  id,
  role,
  name,
  desc,
}: {
  id: string;
  role: Role;
  name: string;
  desc: string | undefined;
}) {
  const nav = useNavigate();
  return (
    <Card className=" w-[88vw] md:w-[28vw] hover:bg-primary/5 cursor-pointer">
      <CardHeader>
        <button className=" text-start">
          <CardTitle className="flex uppercase justify-between items-center mb-[2vh]">
            <h1 className=" text-[3.5vw] md:text-[1.2vw]">
              {name.length > 20 ? name.substring(0, 20) + "..." : name}
            </h1>
            <Badge variant="default" className=" text-[2vw] md:text-[0.8vw]">
              {role}
            </Badge>
          </CardTitle>
          <CardDescription>
            {desc
              ? desc.length > 20
                ? desc.substring(0, 20) + "..."
                : desc
              : "No Description"}
          </CardDescription>
        </button>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button
          disabled={role !== Role.Admin}
          onClick={() => nav(`/doc/settings/${id}`)}
        >
          Settings
        </Button>
        <Link to={`/doc/${id}`}>
          {" "}
          <Button variant="outline">Open</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
