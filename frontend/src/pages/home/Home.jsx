import { useNavigate } from "react-router-dom";
import Footer from "../../components/shared/Footer";
import Features from "./Features";
import Header from "./Header";
import PublicPosts from "./PublicPosts";
import Reviews from "./Reviews";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <Header navigate={navigate}></Header>
      <Features></Features>
      <Reviews></Reviews>
      {/* topTrendings */}
      <PublicPosts navigate={navigate}></PublicPosts>
      <Footer></Footer>
    </div>
  );
}

export default Home;
