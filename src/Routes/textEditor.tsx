import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import { useParams } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import "../styles/textEditor.css";
import "quill/dist/quill.snow.css";

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
  const { fileId: documentId } = useParams<{ fileId: string }>();
  const [quill, setQuill] = useState<Quill>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const s = io(`${import.meta.env.BACKEND_PATH}`);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

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

  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;
