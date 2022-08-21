
import './App.css';
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard";
import AddTask from "./Components/AddTask";
import UpdateTask from "./Components/UpdateTask";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
