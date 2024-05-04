import MainContent from "../components/HomeComponents/MainContent";
import Sermons from "../components/HomeComponents/Sermons";
import Ministries from "../components/HomeComponents/Ministries";
import Ministers from "../components/HomeComponents/Ministers";
import Gallery from "../components/Gallery";

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
  
      {/* Gallery */}
      <Gallery />

    </div>
  );
};

export default Home;
