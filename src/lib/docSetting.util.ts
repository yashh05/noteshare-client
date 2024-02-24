import { Role } from "@/tsTypes";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const handleRemoveRole = async ({
  docId,
  email,
  role,
}: {
  docId?: string;
  email: string;
  role: Role;
}) => {
  try {
    await axios.post(`${import.meta.env.VITE_BACKEND_PATH}/doc/removeRole`, {
      docId,
      email,
      role,
    });

    window.location.reload();
  } catch (error: any) {
    alert(error.message);
  }
};

export const handleDeleteDoc = async ({
  docId,
  navigate,
}: {
  docId: string;
  navigate: NavigateFunction;
}) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_PATH}/doc/deleteDoc`, {
      data: { docId },
    });

    navigate("/dashboard");
    window.location.reload();
  } catch (error: any) {
    alert(error.message);
  }
};
