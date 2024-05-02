import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { formatDate, formatTime } from '../../utils/constantFunctions';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${apiDomain}/activity/events/`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="container" style={{width:"80vw"}}>
            <h3 className= "text-center" style={{ background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 255, 0.879) 100%)' }}>Church Events</h3>

            <div className="row">
                {notifications.map(event => (
                    <div key={event.id} className="col-lg-6 col-xl-4 mb-4">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <strong>{event.title}</strong>
                            </div>
                            <div className="card-body">
                                <p className="card-text"><b>Date:</b> {formatDate(event.day)}</p>
                                <p className="card-text"><b>Time:</b> {formatTime(event.time)}</p>
                                <p className="card-text"><b>Venue:</b> {event.venue}</p>
                            </div>
                            <div className="card-footer bg-light">
                                <button className="btn btn-primary">RSVP</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
