import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import InvoiceDetails from "./components/invoicesDetail/InvoiceDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Payment from "./components/Payment";

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Main />}
      >
        <Route
          index
          element={<Home />}
        />
        <Route
          path='/:id'
          element={<InvoiceDetails />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/payment'
          element={<Payment />}
        />
      </Route>
    </Routes>
  );
}

export default App;
