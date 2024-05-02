import Profile from "./Profile" 
import Media from "./Media" 
import Notifications from "./Notifications"
import Users from "./Users"
import Departments from "./Departments"
import Appointments from "./Appointments"
import UpdateProfile from "./UpdateProfile"
import CreateEvents from "./CreateEvents"
import { Context } from '../../context/navigationContext/Context' 
import { useContext } from 'react'


const MainDash =  () =>{
    const { navigator } = useContext(Context)

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
        {
            navigator == 'profile' ? (
                <div className='mainnav-wrapper'>
                    <Profile />
                </div>
            ): navigator == 'users' ? (
                <div className='mainnav-wrapper'>
                    <Users />
                </div>
            ):  navigator == 'notifications' ? (
                <div className='mainnav-wrapper'>
                    <Notifications />
                </div>
            ): navigator == 'appointment' ? (
                <div className='mainnav-wrapper'>
                    <Appointments />
                </div>
            ): navigator == 'departments' ? (
                <div className='mainnav-wrapper'>
                    <Departments />
                </div>
            ): navigator == 'media' ? (
                <div className='mainnav-wrapper'>
                    <Media />
                </div>
            ): navigator == 'events' ? (
                <div className='mainnav-wrapper'>
                    <CreateEvents />
                </div>
            ): navigator == 'settings' ? (
                <div className='mainnav-wrapper'>
                    <UpdateProfile />
                </div>

            ): null
        }    
    </div>
  )
}

export default MainDash




