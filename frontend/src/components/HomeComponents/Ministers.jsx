import { useState, useEffect } from 'react';
import axios from 'axios'
import { apiDomain } from '../../utils/utils';

const Gallery = () => {
    const [ministers, setMinisters] = useState([]);

    useEffect(() => {
        fetchPastors();
    },[])

    const fetchPastors = async () => {
        try {
            const response = await axios.get(`${apiDomain}/account/fetch-pastors/`);
            setMinisters(response.data);
        } catch (error) {
            console.error('Error fetching pastors:', error);
        }
    };

    const otherMinisters = ministers.filter(minister => !minister.isSenior);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prevIndex => (prevIndex === otherMinisters.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Change the interval time (in milliseconds) as needed

        return () => clearInterval(interval);
    }, [otherMinisters.length]);

    return (
        <section className="gallery mt-5">
            <div className="container">
                <h2 className="mt-4 mb-3" style={{ color:"white", background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 100%)'}}> Our Ministers</h2>
                <div className="row">
                    {/* Senior Minister Card */}
                    {ministers.length > 0 && (
                        <div className="col-md-6">
                            <div className="card h-100 shadow">
                                <img src={ministers[0].image_url} className="card-img-top img-fluid" alt={ministers[0].username} />
                                <div className="card-body">
                                    <h5 className="card-title">Rev {ministers[0].first_name}</h5>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Other Ministers Cards */}
                    <div className="col-md-6">
                        <div id="ministerCarousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                {otherMinisters.map((minister, index) => (
                                    <div key={index} className={`carousel-item${index === activeIndex ? ' active' : ''}`} style={{ animationDelay: `${index * 0.5}s` }}>
                                        <div className="card shadow">
                                            <img src={minister.image_url} className="card-img-top img-fluid" alt={minister.username} />
                                            <div className="card-body">
                                                <h5 className="card-title">Pastor {minister.first_name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
