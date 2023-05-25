


export function ConnectWallet({connect}) {

  return (
    <div className="container">
      <div>Please, connect to wallet to enter the application.</div>
      <br />
      <div>
        <button onClick={connect} className="action-button">
          Connect to Wallet
        </button>
      </div>
    </div>
  )
}
