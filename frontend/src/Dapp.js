function Dapp() {
  return (
    <div className="container">
      <div className="message-warning" role="alert">
        <div>Error sending transaction: Something went wrong...</div>
        <br />
        <button type="button dismiss-button" className="close">
          <div>Dismiss</div>
        </button>
      </div>
      <br />
      <div className="navbar-container">
        <div className="navbar">
          <div>Home</div>
          <div>My Profile</div>
        </div>
        <div className="user-account">
          Welcome 0x231804218745129783742189739131
        </div>
      </div>
      <div className="items">
        <div className="item">
          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1537019575197-df34a13f342c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1338&q=40"
              alt=""
            ></img>
          </div>
          <div className="info-holder">
            <div>
              <b>Name:</b> Rocky
            </div>
            <div>
              <b>Age:</b> 3
            </div>
            <div>
              <b>Breed:</b> German Shepherd
            </div>
            <div>
              <b>Location:</b> Burlington, Vermont
            </div>
            <div>
              <b>Description:</b> Rocky is a loyal and obedient German Shepherd
              who will do anything to protect his family. He loves to play fetch
              and go on long walks.
            </div>
          </div>
          <div className="action-menu">
            <button className="action-button">Adopt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dapp;
