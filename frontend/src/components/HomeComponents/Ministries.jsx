import youthImage from "../../images/leadershipImage.jpg";
import sanctuaryImage from "../../images/facility.jpg";
import missionsImage from "../../images/missionImage.png";
import worshipImage from "../../images/worship.jpg";

const Ministries = () => {
    return (
        <section className="ministries mt-5">
            <div className="container">
                <h2 className="mt-4 mb-3" style={{ color:"white", background: 'linear-gradient(to top right, rgba(0, 0, 255, 0.879), rgba(255, 255, 235, 0.4))', paddingLeft: '15px', borderRadius: "10px", boxShadow:"2px 2px 2px #075cfa"}}> Ministries </h2>
                <p className="mb-4"><b>We request all church members to join at least one of our departments. To join a department, you just need to <a href="/register" style={{textDecoration:"none"}}>Sign Up</a> and select one of the departments that you want to serve in </b></p>
                <div className="row row-cols-1 row-cols-md-2 g-4"> {/* Grid for cards and images */}
                    <div className="col">
                        <div className="card mb-4"> {/* Ministry card 1 */}
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={youthImage} className="img-fluid rounded-start" alt="Youth Ministry" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Youth Ministry</h5>
                                        <p className="card-text"><b>This ministry engages the youths in different activities, those who are both in church and beyond. Some of the activities the youth engage in as they serve God are weekly fellowships, street worship, retreats, camps, sports...</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4"> {/* Ministry card 2 */}
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={sanctuaryImage} className="img-fluid rounded-start" alt="Sanctuary Keepers" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Sanctuary Keepers</h5>
                                        <p className="card-text"><b>This team serve in the sanctuary, ensuring all church setup is in order. They ensure the cleanliness of the church, getting lead of any filth that may be on the alter. These are the deacons selected by Apostle Peter in <i>Acts 6</i></b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4"> {/* Ministry card 3 */}
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={missionsImage} className="img-fluid rounded-start" alt="Missions Ministry" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Missions Ministry</h5>
                                        <p className="card-text"><b>This is a ministry committed to ensuring they reach out to people who are lost in the world. They are witnesses of our Lord Jesus Christ. You can be part of this ministry if you carry the burden to see those in darkness come to light.</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4"> {/* Ministry card 4 */}
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={worshipImage} className="img-fluid rounded-start" alt="Praise & Worship Team" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Praise & Worship Team</h5>
                                        <p className="card-text"><b>These are the voices of Zion committed to worship in truth and in Spirit. Joining this team is becoming a priest to the Most High by burning incense through songs, chants, psalms and spiritual songs; bringing the glory of God down. Join the team today!</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ministries;
