


export function Navbar({address}) {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div>Home</div>
        <div>My Profile</div>
      </div>
      <div className="user-account">
        Welcome {address}
      </div>
    </div>
  )
}
