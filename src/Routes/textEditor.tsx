import { useCallback, useEffect, useState } from "react";
import Quill, { TextChangeHandler } from "quill";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import "quill/dist/quill.snow.css";
import { Role } from "@/tsTypes";

const SAVE_INTERVAL_MS = 2000;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor() {
  const { fileId } = useParams<{ fileId: string }>();
  const [quill, setQuill] = useState<Quill>();
  const [userRole, setUserRole] = useState<Role>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const s = io(`${import.meta.env.VITE_BACKEND_PATH}`, {
      withCredentials: true,
      query: {
        docId: fileId,
      },
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;
    socket.emit("get-doc");
    socket.on("load-doc", (document, userRole) => {
      console.log(userRole);
      console.log("load document", document);
      quill.setContents(document);
      setUserRole(userRole);
      if (userRole !== Role.readOnly) {
        quill.enable();
      }
    });
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const saveDocInterval = setInterval(() => {
      socket.emit("save-doc", { docData: quill.getContents() });
    }, SAVE_INTERVAL_MS);

    return () => clearInterval(saveDocInterval);
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;

    const saveDocInterval = setInterval(() => {
      socket.emit("save-doc", { docData: quill.getContents() });
    }, 2000);

    return () => clearInterval(saveDocInterval);
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta: any) => {
      console.log("receive ", delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler: TextChangeHandler = (delta, oldDelta, source) => {
      console.log(oldDelta);

      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: HTMLElement | null) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  return (
    <div
      className={`container ${
        userRole === Role.readOnly ? "cursor-not-allowed" : ""
      }`}
      ref={wrapperRef}
    ></div>
  );
}

export default TextEditor;
