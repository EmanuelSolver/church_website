import minister2 from "../images/minister2.jpg";
import minister3 from "../images/minister3.jpg";
import minister1 from "../images/minister1.jpg";
import youthMinistryImage1 from "../images/youthImage1.jpg";
import youthMinistryImage2 from "../images/youthImage2.jpg"
import youthMinistryImage3 from "../images/youthImage3.jpg"
import "../styles/YouthMinistry.css"; // Import the CSS file
import { Carousel } from 'react-bootstrap'; // Import the Carousel component from Bootstrap

const YouthMinistry = () => {
    // Information about the Youth Ministry
    const ministryInfo = {
        name: "Kasarani Church Youth Ministry",
        description1: "Our Youth Ministry is dedicated to empowering young people to grow in their faith, develop meaningful relationships, and make a positive impact in the society.",
        description2: "Are you a young person, looking for a family to join? Feel free, you are in the right place. Welcome to the family...",
        description3: "Many are the distractions to a young person, but I want you to know you are exceptional. You are strong and have overcome the evil one!",

        leaders: [
            { name: "Dennis Sart", position: "Youth Pastor", image: `${minister2}` },
            { name: "Purity Jane", position: "Chairperson", image: `${minister3}` },
            { name: "Nick Kenny", position: "Vice chairperson", image: `${minister1}` },
        ],
        activities: [
            "Weekly Bible Study",
            "Street Praise",
            "Youth Retreats",
            "Worship Nights",
            "Sports Events",
            "Social Gatherings"
        ]
    };

    return (
        <section className="youth-ministry position-relative">
            <Carousel>
                <Carousel.Item>
                        <img
                            style={{ height: "90vh" }}
                            className="d-block w-100"
                            src={youthMinistryImage1}
                            alt="First slide"
                        />

                        <Carousel.Caption>
                        <h2 className="ministry-name">{ministryInfo.name}</h2>

                        <div style={{textAlign: 'left', position: "absolute", bottom: "200px", left: "15%", transform: "translateX(-25%)", padding:"20px"}}>
                            <h3 style={{ fontWeight: "600", color: "white", lineHeight: "2" }}>{ministryInfo.description1}</h3>
                        </div>
                        </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        style={{ height: "90vh" }}
                        className="d-block w-100"
                        src={youthMinistryImage2}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    <h2 className="ministry-name">{ministryInfo.name}</h2>

                        <div style={{textAlign: 'left', position: "absolute", bottom: "200px", left: "15%", transform: "translateX(-25%)", padding:"20px"}}>
                            <h3 style={{ fontWeight: "600", color: "white", lineHeight: "2" }}>{ministryInfo.description2}</h3>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        style={{ height: "90vh" }}
                        className="d-block w-100"
                        src={youthMinistryImage3}
                        alt="First slide"
                    />

                    <Carousel.Caption>
                    <h2 className="ministry-name">{ministryInfo.name}</h2>

                    <div style={{textAlign: 'left', position: "absolute", bottom: "200px", left: "15%", transform: "translateX(-25%)", padding:"20px"}}>
                        <h3 style={{ fontWeight: "600", color: "white", lineHeight: "2" }}>{ministryInfo.description3}</h3>
                    </div>
                    </Carousel.Caption>
            </Carousel.Item>

                {/* Add additional Carousel.Item for more slides */}
            </Carousel>

            <div className="container">
            <h2 className="mt-4 mb-3" style={{ color:"white", background: 'linear-gradient(to top right, rgba(0, 0, 255, 0.879), rgba(255, 255, 235, 0.4))', paddingLeft: '15px', borderRadius: "10px", boxShadow:"2px 2px 2px #075cfa"}}> Youth Leaders </h2>
                <div className="row">
                    {/* Senior Pastor */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <img src={ministryInfo.leaders[0].image} className="card-img-top img-fluid h-100" alt={ministryInfo.leaders[0].name} />
                            <div className="card-body">
                                <h5 className="card-title">{ministryInfo.leaders[0].name} - {ministryInfo.leaders[0].position}</h5>
                            </div>
                        </div>
                    </div>

                    {/* Other Leaders */}
                    {ministryInfo.leaders.slice(1).map((leader, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card h-50"> {/* Adjusted height */}
                                <img src={leader.image} className="card-img-top img-fluid" alt={leader.name} />
                                <div className="card-body">
                                    <p className="card-title"><b>{leader.name} - {leader.position}</b></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2 className="mt-4 mb-3" style={{ color:"white", background: 'linear-gradient(to top right, rgba(0, 0, 255, 0.879), rgba(255, 255, 235, 0.4))', paddingLeft: '15px', borderRadius: "10px", boxShadow:"2px 2px 2px #075cfa"}}> Youth Activities </h2>
                <div className="row">
                    {ministryInfo.activities.map((activity, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card shadow fadeInUp">
                                <div className="card-body">
                                    <h5 className="card-title">{activity}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default YouthMinistry;
