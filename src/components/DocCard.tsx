import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

export default function DocCard({
  role,
  name,
  desc,
}: {
  role: "admin" | "read-only" | "read-write";
  name: string;
  desc: string;
}) {
  return (
    <Card className="w-[350px] hover:bg-primary/5 cursor-pointer">
      <CardHeader>
        <button className=" text-start">
          <CardTitle className="flex uppercase justify-between items-center mb-[2vh]">
            {name}
            <Badge variant="secondary" className=" px-[0.2vw]">
              {role}
            </Badge>
          </CardTitle>
          <CardDescription>{desc}</CardDescription>
        </button>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button disabled={role !== "admin"}>Settings</Button>
        <Button variant="outline">Open</Button>
      </CardFooter>
    </Card>
  );
}
