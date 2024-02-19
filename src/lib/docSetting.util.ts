import { Role } from "@/tsTypes";
import axios from "axios";

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
