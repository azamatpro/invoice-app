
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Invoices from "./Invoices";
import Auth from "./Auth";
const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <section className="home">
      {currentUser && <Header />}
      {currentUser ? <Invoices /> : <Auth />}
    </section>
  );
};

export default Home;
