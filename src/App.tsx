import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound";
import Navbar from './components/Navbar'
import Orders from "./pages/orders";
import UserManagement from "./pages/userManagment";

const App = () => {
  return (<Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>)
    ;
};

export default App;
