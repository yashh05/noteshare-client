import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { addNewDocSchema } from "@/zod/schema";
import { ZodError } from "zod";
import axios from "axios";
import { LoadingSpinner } from "../ui/icons";

const AddNewDoc = () => {
  const [loading, setLoading] = useState(false);

  const inititalError = {
    addNewDocNameError: "",
    addNewDocDescError: "",
    other: "",
  };
  const [addNewForm, setAddNewForm] = useState({
    addNewDocName: "",
    addNewDocDesc: "",
  });
  const [addNewFormError, setAddNewFormError] = useState(inititalError);
  const handleAddNewDocOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddNewForm((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleAddNewDoc = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = addNewDocSchema.parse({
        addNewDocName: addNewForm.addNewDocName,
        addNewDocDesc: addNewForm.addNewDocDesc,
      });

      await axios.post(`${import.meta.env.VITE_BACKEND_PATH}/doc/addDoc`, {
        name: res.addNewDocName,
        desc: res.addNewDocDesc,
      });
      setLoading(false);
      window.location.reload();
    } catch (error: any) {
      setLoading(false);
      if (error instanceof ZodError) {
        const err = error.errors.map((indiErr) => {
          return {
            path: indiErr.path[0],
            message: indiErr.message,
          };
        });
        err.forEach((error) => {
          console.log(error);
          setAddNewFormError(inititalError);
          setAddNewFormError((formError) => {
            return { ...formError, [error.path + "Error"]: error.message };
          });
        });
      } else {
        console.log(error.response.data.error);
        setAddNewFormError(inititalError);
        setAddNewFormError((formError) => {
          return { ...formError, other: error.response.data.error };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => setAddNewFormError(inititalError)}
          className="px-[4vw] text-[2vw] md:px-[1.5vw] md:py-[1vw] md:text-[1.2vw]"
        >
          <img src="/assets/add-file.png" alt="" className=" w-[2vw]" />
          <span className="ml-[0.3vw]"> Add Doc</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doc</DialogTitle>
          <DialogDescription>
            Enter the Name of Doc{" "}
            <span>
              {" "}
              <b>(Name should be unique)*</b>
            </span>
            {addNewFormError.other !== "" && (
              <p className=" text-red-500">{addNewFormError.other}</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddNewDoc}>
          <div className="flex flex-col  gap-4">
            <div className="flex gap-[2vw] items-center">
              <Label htmlFor="addDocName" className="text-right">
                Name
              </Label>
              <Input
                id="addDocName"
                placeholder="School File"
                className="col-span-3"
                name="addNewDocName"
                onChange={handleAddNewDocOnChange}
              />
            </div>
            {
              <div className=" text-red-400 text-[1vw]">
                {addNewFormError.addNewDocNameError}
              </div>
            }

            <div className="flex gap-[2vw] items-center">
              <Label htmlFor="addDocDesc" className="text-right">
                Description
              </Label>
              <Input
                id="addDocDesc"
                placeholder="This is my school project doc"
                name="addNewDocDesc"
                className="col-span-3"
                onChange={handleAddNewDocOnChange}
              />
            </div>
            {addNewFormError.addNewDocDescError !== "" && (
              <div className=" text-red-400 text-[1vw]">
                {addNewFormError.addNewDocDescError}
              </div>
            )}
          </div>
          <Button className=" w-full mt-5">
            {loading ? <LoadingSpinner className=" m-auto" /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDoc;
