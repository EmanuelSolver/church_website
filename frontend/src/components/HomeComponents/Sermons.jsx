import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';

const Sermons = () => {
    const [sermons, setSermons] = useState([]);

    // Fetch sermons
    useEffect(() => {
        fetchSermons();
    }, []);

    // Function to fetch sermons from the backend
    const fetchSermons = async () => {
        try {
            const response = await axios.get(`${apiDomain}/activity/sermons/`);
            setSermons(response.data);
        } catch (error) {
            console.error('Error fetching sermons:', error);
        }
    };

    // Function to extract YouTube video ID from URL
    const getVideoId = (url) => {
        const params = new URLSearchParams(new URL(url).search);
        return params.get("v");
    };


    return (
        <section className="sermons mt-5">
            <div className="container">
            <h2 className="mt-4 mb-3" style={{ color:"white", background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 100%)'}}> Sermons</h2>
                <div className="row flex-nowrap overflow-auto">
                    {sermons.map((sermon, index) => (
                        <div key={index} className="col-md-4 mb-3">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title"><b>{sermon.title}</b> by <i>{sermon.speaker}</i></h5>

                                    <div className="embed-responsive embed-responsive-16by9 mt-3">
                                        <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${getVideoId(sermon.link)}`} allowFullScreen title={sermon.title} style={{width: "100%"}}></iframe>
                                    </div>

                                    <div className="d-flex align-items-center mb-3">
                                        <FaQuoteLeft className="me-2" />
                                        <p className="card-text"><i>{sermon.quote}</i></p>
                                        <FaQuoteRight className="ms-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sermons;
