import "../../styles/WeeklyEvents.css"; // Import the CSS file containing the 3D box styles

const WeeklyEvents = () => {
    // Array of upcoming events
    const events = [
        {
            eventTitle: "Lunch Hour",
            venue: "CFF Sunton",
            time: "12:45 PM",
            date: "Mon - Fri"
        },
        {
            eventTitle: "Youth Fellowship",
            venue: "CFF Sunton",
            time: "7:00 PM",
            date: "Every Tuesday"
        },
        {
            eventTitle: "Shalom Fellowship",
            venue: "CFF Sunton",
            time: "6:00 PM",
            date: "Every Wednesday"
        },
        {
            eventTitle: "Maji-Mazuri & Sunton Fellowships",
            venue: "Member's Home",
            time: "6:00 PM",
            date: "Every Thursday"
        },
        {
            eventTitle: "Friday Kesha",
            venue: "CFF Sunton",
            time: "9:00 PM",
            date: "Every Friday"
        },
        {
            eventTitle: "Mwiki Fellowship",
            venue: "Member's Home",
            time: "6:00 PM",
            date: "Every Saturday"
        }
    ];

    return (
        <section className="upcoming-events mt-5">
            <div className="container">

                <h2 className="mb-4">Weekly Events</h2>

                <div id="stage" className="spinner">
                    {events.map((event, index) => (
                        // Render event details on different faces of the box
                        <div key={index} className={`face${index + 1}`}>
                            <h5 className="card-title"><b><i>{event.eventTitle}</i></b></h5>
                            <p className="card-text">Venue: {event.venue}</p>
                            <p className="card-text">Time: {event.time}</p>
                            <p className="card-text">Date: {event.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeeklyEvents;
