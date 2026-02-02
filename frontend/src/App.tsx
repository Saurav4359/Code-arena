import "./App.css";
// import { CodeEditor } from "../pages/Editor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Signup } from "../Components/Signup";
import {Section} from "../Components/section"
// import { useRef, useState } from "react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}> 
          <Route index element={<Section/>} />
          <Route path="/signup" element={<Signup />} />
          </Route>  
        </Routes>
      </BrowserRouter>
       
    </>
  );
}

export default App;

// <div className="h-screen bg-black/50 flex justify-center items-center">
//   <div className="grid justify-center">
//     <div className="h-10 w-150 bg-amber-300">
//       <select ref={lanRef} onChange={select} defaultValue="cpp">
//         <option value="javascript">Javascript</option>
//         <option value="java">Java</option>
//         <option value="cpp">C++</option>
//       </select>
//     </div>

//     <CodeEditor language={language} />
//   </div>
// </div>

//    const lanRef = useRef<HTMLSelectElement>(null);
// const [language, setlanguage] = useState("cpp");

// function select() {
//   if (!lanRef.current) return;
//   setlanguage(lanRef.current?.value);
// }
