import React from 'react'
import { Chat, SideBar } from '../component';


const Home= ()=>{
    return (
        <div className='home'>
            <div className='container'>
                <SideBar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home;