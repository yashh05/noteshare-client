import axios from "axios";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Role } from "@/tsTypes";
import { addNewUserSchema } from "@/zod/schema";
import { ZodError } from "zod";

const AddNewRole = ({ id }: { id: string | undefined }) => {
  const [form, setForm] = useState({
    email: "",
    role: "readOnly",
  });
  const inititalError = {
    emailError: "",
    other: "",
  };
  const [error, setError] = useState(inititalError);

  const handleNewRole = async () => {
    try {
      const { email, role } = form;
      addNewUserSchema.parse({ email, role });

      await axios.post(`${import.meta.env.VITE_BACKEND_PATH}/doc/grantRole`, {
        docId: id,
        email,
        role,
      });

      window.location.reload();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const err = error.errors.map((indiErr) => {
          return {
            path: indiErr.path[0],
            message: indiErr.message,
          };
        });
        err.forEach((error) => {
          console.log(error);
          setError(inititalError);
          setError((formError) => {
            return { ...formError, [error.path + "Error"]: error.message };
          });
        });
      } else {
        setError(inititalError);
        setError((formError) => {
          return { ...formError, other: error.response.data.error };
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex px-[4vw] text-[2vw] md:px-[1.5vw] md:py-[1vw] md:text-[1.2vw]"
          onClick={() => {
            setForm({ email: "", role: "readOnly" });
            setError(inititalError);
          }}
        >
          <img src="/assets/add-user.png" alt="" className=" w-[1.5vw]" />
          <span className="ml-[0.3vw]"> Add New User</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doc</DialogTitle>
          <DialogDescription>Enter the Email of new User</DialogDescription>
          <p className=" text-red-500">{error.other}</p>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleNewRole();
          }}
        >
          <div className="flex flex-col justify-center gap-4">
            <div>
              <div>
                <Label htmlFor="AddNewUSerName" className="text-right">
                  Email
                </Label>
                <Input
                  id="AddNewUSerName"
                  placeholder="srk@gmail.com"
                  className="col-span-3"
                  onChange={(e) =>
                    setForm((form) => {
                      return { ...form, email: e.target.value };
                    })
                  }
                />
              </div>
              <h1 className=" text-red-700"> {" " + error.emailError}</h1>
            </div>
            <Select
              onValueChange={(e) => {
                setForm((form) => ({ ...form, role: e }));
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value={Role.readOnly}>{Role.readOnly}</SelectItem>
                  <SelectItem value={Role.readWrite}>
                    {Role.readWrite}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRole;
