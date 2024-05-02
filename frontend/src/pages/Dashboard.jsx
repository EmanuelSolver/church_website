import SideNav from '../components/dashboardComponents/Sidenav';
import MainDash from '../components/dashboardComponents/MainDash';
import '../styles/Sidenav.css'; // Import a CSS file for styling if needed

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <SideNav/>
            <MainDash/>
        </div>
    );
};

export default Dashboard;
