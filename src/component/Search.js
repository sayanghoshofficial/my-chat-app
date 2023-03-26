import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find your friend..."/>
      </div>
      <div className="userChat">
        <img
          src="https://images.pexels.com/photos/15737940/pexels-photo-15737940.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="user-chat"
        />
        <div className="userChatinfo">
            <span>Jane</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
