import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { apiDomain } from '../../utils/utils';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import moment from 'moment';

const CreateArticles = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser ? storedUser.id : null;
    const [formData, setFormData] = useState({
        writer: userId,
        title: '',
        content: '',
    });
    const [articles, setArticles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(`${apiDomain}/articles/get-articles/`);
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePostArticle = async () => {
        try {
            await axios.post(`${apiDomain}/articles/create-article/`, formData);

            setFormData({
                writer: JSON.parse(localStorage.getItem('user')).id, // Resetting writer to the current user
                title: '',
                content: '',
            });

            setShowModal(false);
            fetchArticles();

            alert('Article posted successfully!');
        } catch (error) {
            console.error('Error posting article:', error);
            alert('Failed to post article. Please try again later.');
        }
    };

    const handleDeleteArticle = async (id) => {
        try {
            await axios.delete(`${apiDomain}/articles/delete-article/${id}/`);
            fetchArticles(); // Refresh sermons list after successful deletion
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    // Filter articles where userId matches article writer
    const userArticles = articles.filter(article => article.writer === userId);

    return (
        <div className="container">
            <div className="row">
                <div className="articles">
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Article</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content:</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    placeholder="Type your article here..."
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="10"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handlePostArticle}>
                                Post Article
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="article-list">
                        <h2 className="mt-4 mb-3 text-center" style={{background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 255, 0.879) 100%'}}> Articles </h2>
                        <div className="row">
                            {userArticles && userArticles.map((article, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <div className="card shadow"> 
                                    <div className="d-flex justify-content-between align-items-center p-3">
                                        <p>...</p>
                                        <div className="btn btn-danger" onClick={() => handleDeleteArticle(article.id)}><RiDeleteBin6Line /></div>
                                    </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{article.title}</h5>
                                            <p className="card-text">
                                                <FaQuoteLeft className="me-2" />
                                                <span><b><i>{article.content}</i></b></span>
                                                <FaQuoteRight className="ms-2" />
                                            </p>
                                            <p><i>Created on {moment(article.created_on).format('MMMM Do YYYY, h:mm:ss a')}</i></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => setShowModal(true)} className="btn btn-primary">
                        Create New Article
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateArticles;
