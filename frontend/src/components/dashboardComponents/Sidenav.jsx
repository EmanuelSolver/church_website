import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/navigationContext/Context';

const SideNav = () => {
    const { dispatch } = useContext(Context);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'Admin') {
            setIsAdmin(true);
        }
        if (user && user.role === 'Staff') {
            setIsStaff(true);
        }
    }, []);

    const handleProfile = () => {
        dispatch({ type: 'PROFILE', payload: 'profile' });
    };

    const handleUsers = () => {
        dispatch({ type: 'USERS', payload: 'users' });
    };

    const handleNotifications = () => {
        dispatch({ type: 'NOTIFICATIONS', payload: 'notifications' });
    };

    const handleAppointments = () => {
        dispatch({ type: 'APPOINTMENT', payload: 'appointment' });
    };
    const handleArticles = () => {
        dispatch({ type: 'ARTICLES', payload: 'articles' });
    };

    const handleDepartments = () => {
        dispatch({ type: 'DEPARTMENTS', payload: 'departments' });
    };

    const handleMedia = () => {
        dispatch({ type: 'MEDIA', payload: 'media' });
    };

    const handleEvents = () => {
        dispatch({ type: 'EVENTS', payload: 'events' });
    };

    const handleSettings = () => {
        dispatch({ type: 'SETTINGS', payload: 'settings' });
    };

    return (
        <div style={{ height: '100vh', overflow: 'auto', boxShadow: '3px 2px 2px' }}>
            <CDBSidebar textColor="#fff" backgroundColor=" #00004d">
                {/* Sidebar Header */}
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
                        Dashboard
                    </a>
                </CDBSidebarHeader>

                {/* Sidebar Content */}
                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        {/* Navigation Links */}
                        <NavLink activeclassname="activeClicked" onClick={handleProfile}>
                            <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
                        </NavLink>
                        {/* Admin Links */}
                        {isAdmin ? (
                            <>
                                <NavLink activeclassname="activeClicked" onClick={handleUsers}>
                                    <CDBSidebarMenuItem icon="user-friends">Users</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink activeclassname="activeClicked" onClick={handleMedia}>
                                    <CDBSidebarMenuItem icon="photo-video">Media</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink activeclassname="activeClicked" onClick={handleEvents}>
                                    <CDBSidebarMenuItem icon="calendar-day">Events</CDBSidebarMenuItem>
                                </NavLink>
                            </>
                        ) : isStaff ? (
                            <NavLink activeclassname="activeClicked" onClick={handleArticles}>
                                <CDBSidebarMenuItem icon="newspaper">Articles</CDBSidebarMenuItem>
                            </NavLink>
                        ) : (
                            <NavLink activeclassname="activeClicked" onClick={handleNotifications}>
                                <CDBSidebarMenuItem icon="bell">Notifications</CDBSidebarMenuItem>
                            </NavLink>
                        )}
                        
                        <NavLink activeclassname="activeClicked" onClick={handleAppointments}>
                            <CDBSidebarMenuItem icon="calendar-alt">Appointments</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink activeclassname="activeClicked" onClick={handleDepartments}>
                            <CDBSidebarMenuItem icon="building">Departments</CDBSidebarMenuItem>
                        </NavLink>
                    
                        <NavLink activeclassname="activeClicked" onClick={handleSettings}>
                            <CDBSidebarMenuItem icon="cog">Settings</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                {/* Sidebar Footer */}
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div style={{ padding: '20px 5px'}} className="text-decoration-none">
                        <a href="https://personalmygallery.wixsite.com/njiru-emanuel-portfo" style={{ textDecoration: 'none' }}>Developed by Dev~Njiru</a>
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default SideNav;
