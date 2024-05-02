import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaRegCopyright, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () =>{

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-light">
            <div className="container">
                <div className="row">
                    {/* Contact Information */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h2>Contact Us</h2>
                        <p><FaMapMarkerAlt /> Kasarani-Nairobi, Kenya</p>
                        <p><FaPhone /> +254 456-7890</p>
                        <p><FaEnvelope /> info@church.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="col-md-6 col-lg-4 mb-4">
                        <h2>Follow Us</h2>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://facebook.com" style={{ textDecoration: 'none' }}>
                                    <FaFacebook /> Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com" style={{ textDecoration: 'none' }}>
                                    <FaTwitter /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com" style={{ textDecoration: 'none' }}>
                                    <FaInstagram /> Instagram
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription Form */}
                    <div className="col-md-12 col-lg-4 mb-4">
                        <h2>Subscribe to Our Newsletter</h2>
                        <form>
                            <div className="input-group">
                                <input type="email" className="form-control" placeholder="Enter your email" />
                                <button className="btn btn-primary" type="submit">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Copyright Information */}
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">          
                            <FaRegCopyright /> {currentYear}
                            <a href="https://personalmygallery.wixsite.com/njiru-emanuel-portfo" style={{ textDecoration: 'none' }}> Developed by Dev~Njiru. </a>
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
