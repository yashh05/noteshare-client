import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Signin from "./Routes/Signin";
import Signup from "./Routes/Signup";
import Home from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";
import { RecoilRoot } from "recoil";
import DocSettings from "./Routes/DocSettings";
import TextEditor from "./Routes/textEditor";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/doc/settings/:id" element={<DocSettings />} />
          <Route path="/doc/:fileId" element={<TextEditor />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
