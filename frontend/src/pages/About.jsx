import '../styles/About.css';
import missionImage from "../images/missionImage.png";
import historyImage from "../images/history.jpg";
import beliefsImage from "../images/beliefs.png";
import worshipImage from "../images/worship.jpg";
import outreachImage from "../images/outreachImage.jpg";
import leadershipImage from "../images/leadershipImage.jpg";
import facilitiesImage from "../images/facility.jpg";
import invitationImage from "../images/welcome.jpg";

const AboutUs = () => {
    return (
        <section className="about-us mt-5">
            <div className="container">
                <h2 className="text-center underlined big">Know Our Church</h2>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card mb-4">
                            <img src={missionImage} className="card-img-top" alt="Mission and Purpose" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Mission and Purpose</b></h3>
                                <p className="card-text"><b>
                                    Our mission is to glorify God by making disciples of Jesus Christ who are transformed by the Gospel, connected to one another in authentic community, and engaged in mission locally and globally.
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={leadershipImage} className="card-img-top" alt="Leadership and Staff" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Church Leadership</b></h3>
                                <p className="card-text"><b>
                                    Our church is led by a team of dedicated pastors, elders, deacons, and staff members who are committed to serving God and serving His people. They provide spiritual guidance, pastoral care, and leadership in various ministries.
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={worshipImage} className="card-img-top" alt="Worship and Services" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Worship and Services</b></h3>
                                <p className="card-text"><b>
                                    Our worship style is a blend of traditional hymns and contemporary music, designed to engage people of all ages and backgrounds. We gather for Sunday worship services, as well as midweek gatherings for prayer and fellowship.
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={outreachImage} className="card-img-top" alt="Outreach and Missions" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Outreach and Missions</b></h3>
                                <p className="card-text"><b>
                                    We are passionate about reaching out to our local community and beyond with the love of Christ. Through missions, social justice initiatives, and humanitarian efforts, we seek to make a positive impact and share the hope of the Gospel.
                                </b></p>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-6">

                        <div className="card mb-4">
                            <img src={historyImage} className="card-img-top" alt="History and Background" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Church History and Background</b></h3>
                                <p className="card-text"><b>
                                    Founded in 1999, our church has been a beacon of hope and faith in the community for over [number] years. It was started by [founder(s)], with a vision to [vision or purpose].
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={beliefsImage} className="card-img-top" alt="Beliefs and Doctrines" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Our Doctrine</b></h3>
                                <p className="card-text"><b>
                                    We adhere to the core doctrines of the Christian faith, as expressed in the [name of denomination] tradition. Our beliefs are grounded in the authority of Scripture, the deity of Christ, the Trinity, salvation by grace through faith, and the importance of living out our faith in love and service to others.
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={facilitiesImage} className="card-img-top" alt="Facilities and Location" />
                            <div className="card-body">
                                <h3 className="card-title"><b>Our Location</b></h3>
                                <p className="card-text"><b>
                                    Our church building is located at [address], with ample parking and modern facilities for worship, fellowship, and ministry. We welcome you to join us for a service and experience the warmth and hospitality of our church family.
                                </b></p>
                            </div>
                        </div>

                        <div className="card mb-4">
                            <img src={invitationImage} className="card-img-top" alt="Invitation" />
                            <div className="card-body">
                                <h2 className="card-title"><b>Invitation</b></h2>
                                <p className="card-text"><b>
                                    Whether you are new to the area, exploring faith for the first time, or looking for a church home, we invite you to join us on this journey of faith. Come as you are, and discover the joy of knowing Jesus and belonging to His family.
                                </b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
