import minister2 from "../images/minister2.jpg";
import minister3 from "../images/minister3.jpg";
import minister1 from "../images/minister1.jpg";
import youthMinistryImage from "../images/worship.jpg";
import "../styles/YouthMinistry.css"; // Import the CSS file

const YouthMinistry = () => {
    // Information about the Youth Ministry
    const ministryInfo = {
        name: "Kasarani Church Youth Ministry",
        description: "Our Youth Ministry is dedicated to empowering young people to grow in their faith, develop meaningful relationships, and make a positive impact in their communities. Are you a young person looking for a family to be part of? This is your home...",
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
            <div className="bg-image position-relative" style={{backgroundImage: `url(${youthMinistryImage})`, backgroundSize: 'cover', height: '500px'}}>
                {/* Semi-transparent overlay */}
                <div className="bg-overlay position-absolute top-0 start-0 w-100 h-100" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></div>

                {/* Content */}
                <div className="container text-center text-white position-relative" style={{zIndex: 1, paddingTop: '50px', lineHeight:"60px"}}>
                    <h2>{ministryInfo.name}</h2>
                    <h3 style={{fontWeight: "600", lineHeight:"2"}}>{ministryInfo.description}</h3>
                </div>
            </div>
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
