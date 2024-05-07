import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment';

const ShowArticles = () => {
    const [articles, setArticles] = useState([]);

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

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };

    const articleChunks = chunkArray(articles, 3);

    return (
        <section className="articles mt-5">
            <div className="container">
                <h2 className="mt-4 mb-3" style={{ color: "white", background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 100%)', paddingLeft: '15px'}}> Build up</h2>

                <div className="article-list">
                    <Carousel>
                        {articleChunks.map((chunk, index) => (
                            <Carousel.Item key={index}>
                                <div className="row">
                                    {chunk && chunk.map((article, idx) => (
                                        <div key={idx} className="col-md-4 mb-4">
                                            <div className="card shadow"> 
                                                <div className="card-body">
                                                    <h5 className="card-title">{article.title}</h5>
                                                    <p className="card-text">
                                                        <FaQuoteLeft className="me-2" />
                                                        <span style={{color:"#000F8F"}}><b><i>{article.content}</i></b></span>
                                                        <FaQuoteRight className="ms-2" />
                                                    </p>
                                                    <hr />
                                                    <p className="card-text"><i>Posted on {moment(article.created_on).format('MMMM Do YYYY')} by {article.writer_name}</i></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default ShowArticles;
