import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../utils/utils';
import Carousel from 'react-bootstrap/Carousel';

const Gallery = () => {
    // State to hold the fetched images
    const [images, setImages] = useState([]);

    // Function to fetch images from the API
    const fetchImages = async () => {
        try {
            const response = await axios.get(`${apiDomain}/media/images/`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Fetch images when the component mounts
    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <section className="sermons mt-5">
            <div className="container">
                <h2 className="mt-4 mb-3" style={{ color:"white", paddingLeft:"15px", background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 100%)'}}> Church Gallery</h2>

                <div className="gallery">
                    {/* Render the Carousel component */}
                    <Carousel>
                        {/* Map through the fetched images and display them as Carousel items */}
                        {images && images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={image.link}
                                    alt={image.description}
                                />
                                <Carousel.Caption>
                                    <h3>{image.description}</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
