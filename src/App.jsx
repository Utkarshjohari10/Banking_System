import Customers from "./pages/customers/Customers";
import Transaction from "./pages/Transaction/Transaction";
import Nav from "./pages/Nav";
import Middlepart from "./pages/Middlepart";
import Endpart from "./pages/Endpart"
import History from "./pages/history";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Middlepart/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/transaction" element={<Transaction/>} />
          <Route path="/history" element={<History/>} />
        </Routes>
      </BrowserRouter>
      <Endpart/>
    </div>
  );
}

export default App;
