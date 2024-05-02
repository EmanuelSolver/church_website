import MainContent from "../components/HomeComponents/MainContent";
import Sermons from "../components/HomeComponents/Sermons";
import Ministries from "../components/HomeComponents/Ministries";
import Gallery from "../components/HomeComponents/Ministers";

const Home = () => {

  return (
    <div className="body">    
      {/* Main Content */}
      <MainContent />
      
      {/* Sermons */}
      <Sermons />

      {/* Ministries */}
      <Ministries />
  
      {/* Gallery */}
      <Gallery />

    </div>
  );
};

export default Home;
