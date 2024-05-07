import MainContent from "../components/HomeComponents/MainContent";
import Sermons from "../components/HomeComponents/Sermons";
import Ministries from "../components/HomeComponents/Ministries";
import Ministers from "../components/HomeComponents/Ministers";
import Gallery from "../components/Gallery";
import ShowArticles from "../components/HomeComponents/ShowArticles";

const Home = () => {

  return (
    <div className="body">    
      {/* Main Content */}
      <MainContent />
      
      {/* Sermons */}
      <Sermons />

      {/* Ministers */}
      <Ministers />

      {/* Ministries */}
      <Ministries />

      {/* Articles */}
      <ShowArticles />
  
      {/* Gallery */}
      <Gallery />

    </div>
  );
};

export default Home;
