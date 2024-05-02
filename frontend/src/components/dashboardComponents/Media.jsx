import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Media = () => {
    // State variables
    const [sermonTitle, setSermonTitle] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [sermonLink, setSermonLink] = useState('');
    const [sermonQuote, setSermonQuote] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [sermons, setSermons] = useState([]);
    const [images, setImages] = useState([]);


    // Fetch sermons and images
    useEffect(() => {
        fetchSermons();
        fetchImages();
    }, []);

    // Function to extract YouTube video ID from URL
    const getVideoId = (url) => {
        const params = new URLSearchParams(new URL(url).search);
        return params.get("v");
    };


    // Function to fetch sermons from the backend
    const fetchSermons = async () => {
        try {
            const response = await axios.get(`${apiDomain}/activity/sermons/`);
            setSermons(response.data);
        } catch (error) {
            console.error('Error fetching sermons:', error);
        }
    };

    // Function to fetch images from the backend
    const fetchImages = async () => {
        try {
            const response = await axios.get(`${apiDomain}/activity/images/`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    // Function to handle sermon form submission
    const handleSermonSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/activity/create-sermon/`, { title: sermonTitle, link: sermonLink, quote: sermonQuote, speaker: speaker });
            fetchSermons(); // Refresh sermons list after successful submission
            setSermonLink('');
            setSermonQuote('');
        } catch (error) {
            console.error('Error uploading sermon:', error);
        }
    };

    // Function to handle image form submission
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/activity/create-image/`, { link: imageLink, description: imageDescription });
            fetchImages(); // Refresh images list after successful submission
            setImageLink('');
            setImageDescription('');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDeleteSermon = async (id) => {
        try {
            await axios.delete(`${apiDomain}/activity/delete-sermon/${id}/`);
            fetchSermons(); // Refresh sermons list after successful deletion
        } catch (error) {
            console.error('Error deleting sermon:', error);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            await axios.delete(`${apiDomain}/activity/delete-image/${id}/`);
            fetchImages(); // Refresh sermons list after successful deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
    <div className="container">
        <div className="row">
            <h3 className="mt-4 mb-3 text-center" style={{ background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 255, 0.879) 100%)'}}>Media Management</h3>

            {/* Upload sermon form */}
            <div className="col-md-6">
                <div className="card p-4 shadow">
                    <h5 className="text-center">Upload Sermon Link</h5>
                    <form onSubmit={handleSermonSubmit}>
                        <div className="mb-3">
                            <label htmlFor="sermonTitle" className="form-label">Sermon title</label>
                            <input type="text" className="form-control" id="sermonTitle" value={sermonTitle} onChange={(e) => setSermonTitle(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="speaker" className="form-label">Speaker</label>
                            <input type="text" className="form-control" id="speaker" value={speaker} onChange={(e) => setSpeaker(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sermonLink" className="form-label">Sermon Link</label>
                            <input type="text" className="form-control" id="sermonLink" value={sermonLink} onChange={(e) => setSermonLink(e.target.value)} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="sermonDescription" className="form-label">Quote</label>
                            <input className="form-control" id="sermonDescription" value={sermonQuote} onChange={(e) => setSermonQuote(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload Sermon</button>                    </form>
                </div>
            </div>

            {/* Upload image form */}
            <div className="col-md-6">
                <div className="card p-4 shadow">
                    <h5 className="text-center">Upload Image Link</h5>
                    <form onSubmit={handleImageSubmit}>
                        <div className="mb-3">
                            <label htmlFor="imageLink" className="form-label">Image Link</label>
                            <input type="text" className="form-control" id="imageLink" value={imageLink} onChange={(e) => setImageLink(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="imageDescription" className="form-label">Description</label>
                            <textarea className="form-control" id="imageDescription" value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Upload Image</button>                    </form>
                </div>
            </div>
        </div>

        {/* Display sermons */}
        <div className="mt-4">
            <h4 className="card-title bg-primary text-white p-2">Sermons</h4>
            <div className="row flex-nowrap overflow-auto">
                {sermons.map((sermon, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card shadow">
                        <div className="d-flex justify-content-between align-items-center p-3">
                            <h5 className="card-title">{sermon.title}</h5>
                            <div className="btn btn-danger" onClick={() => handleDeleteSermon(sermon.id)}><RiDeleteBin6Line /></div>
                        </div>
                            <p className="card-text"><b>Speaker:</b> {sermon.speaker}</p>

                            {/* YouTube video */}
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${getVideoId(sermon.link)}`} title={sermon.title}></iframe>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{sermon.quote}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Display images */}
        <div className="mt-4">
            <h4 className="card-title bg-primary text-white p-2">Images</h4>
            <div className="row flex-nowrap overflow-auto">
                {images.map((image, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className="card shadow">
                            {/* Image */}
                            <div className="d-flex justify-content-between align-items-center p-3">
                                <p>Image</p>
                                <div className="btn btn-danger" onClick={() => handleDeleteImage(image.id)}><RiDeleteBin6Line /></div>
                            </div>

                            <img src={image.link} className="card-img-top" alt={image.description} />
                            <div className="card-body">
                                <p className="card-text">{image.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>

    );
};

export default Media;
