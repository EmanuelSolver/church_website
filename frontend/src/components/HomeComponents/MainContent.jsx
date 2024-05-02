import video from "../../images/bg-video.mp4"; // Import your video file
import { FaQuoteLeft } from 'react-icons/fa'; 
import "../../styles/MainContent.css"; 
import WeeklyEvents from "./WeeklyEvents";

const MainContent = () => {
  return (
    <section
      className="main-content d-flex flex-column justify-content-center align-items-center text-center position-relative"
      style={{
        height: 600,
      }}
    >
        {/* Video background */}
        <video
          className="position-absolute top-0 start-0 w-100 h-100"
          src={video}
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: 'cover',
          }}>

        </video>
      
      {/* Content */}
      <div className="content-wrapper position-relative" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', textShadow: '5px 5px 2px rgba(0, 0, 0, 0.6)', borderRadius: '10px' }}>
        <h2 className="mb-4 text-light"><b>Welcome to KASARANI CHURCH</b></h2>
        <h4 className="text-light">We gather here with just a single agenda to worship Yahweh.</h4>
        <h4 className="text-light">We are glad to worship the Lord with you.</h4>
        <h4 className="text-light">Welcome...</h4>
      </div>

      
      {/* Message Card - Holiness (Visible on large screens) */}
      <div className="d-none d-lg-block"> {/* Hide on screens smaller than lg (large) */}
        <div className="message-card position-absolute top-0 end-0 bg-light p-3 mb-3 text-dark animate__animated animate__fadeInUp" style={{ width: '250px', borderRadius: '10px' }}> {/* Position the card at the top-right */}
          <div className="container">
            <h5 className="card-title text-center mb-3">Faith & Holiness</h5>
            <div className="d-flex justify-content-center align-items-center">
              <FaQuoteLeft className="quote-icon me-2" />
              <p className="card-text">We preach Faith for <b>Romans 14:23 says</b><q>Anything that is not done in faith is sin.</q>
                <br/>We preach Faith for <b>1 Peter 1:16 says</b><q>...Be holy, for I am holy</q>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Message Card - True Gospel (Visible on large screens) */}
      <div className="d-none d-lg-block"> {/* Hide on screens smaller than lg (large) */}
        <div className="message-card position-absolute bottom-0 start-0 bg-light p-3 mb-3 text-dark animate__animated animate__fadeInUp" style={{ width: '250px', borderRadius: '10px' }}> {/* Position the card at the bottom-left */}
          <div className="container">
            <h5 className="card-title text-center mb-3">True Gospel</h5>
            <div className="d-flex justify-content-center align-items-center">
              <FaQuoteLeft className="quote-icon me-1" />
              <p className="card-text">We preach the True Gospel for<br/> 
              <b>Romans 1:16 says,</b><q> For I am not ashamed of the gospel [a]of Christ, for it is the power of God to salvation for everyone who believes...</q>
              </p>
            </div>
          </div>
        </div>
      </div>
      <WeeklyEvents />
    </section>
  );
};

export default MainContent;
