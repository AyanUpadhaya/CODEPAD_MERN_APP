import Features from "./Features";
import Header from "./Header";
import PublicPosts from "./PublicPosts";
import Reviews from "./Reviews";

function Home() {
  return (
    <div>
      <Header></Header>
      <Features></Features>
      <Reviews></Reviews>
      <PublicPosts></PublicPosts>
    </div>
  );
}

export default Home;
