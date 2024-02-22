import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

export const userSignedInAtom = atom({
  key: "userSignedInAtom",
  default:
    localStorage.getItem("email") && localStorage.getItem("email") !== ""
      ? {
          loggedin: true,
          email: localStorage.getItem("email"),
        }
      : {
          loggedin: false,
          email: "",
        },
});

export const allDocsAtom = atom({
  key: "allDocsAtom",
  default: selector({
    key: "allDocsSelector",
    get: async ({ get }) => {
      const userSignedIn = get(userSignedInAtom);
      if (userSignedIn.loggedin) {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_PATH}/doc/getAllDocs`
        );

        return res.data.docs;
      } else {
        throw new Error("User is not Signed in");
      }
    },
  }),
});

export const DocSettingAtom = atomFamily({
  key: "docSettingAtom",
  default: selectorFamily({
    key: "docSettingSelector",
    get:
      (id) =>
      async ({ get }) => {
        console.log(id);

        const userSignedIn = get(userSignedInAtom);
        if (userSignedIn.loggedin) {
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_PATH}/doc/getAllUser`,
            {
              docId: id,
            }
          );

          return res.data.users;
        } else {
          throw new Error("User is not Signed in");
        }
      },
  }),
});
