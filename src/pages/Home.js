import React from 'react'
import { Chat, SideBar } from '../component/index.js';


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