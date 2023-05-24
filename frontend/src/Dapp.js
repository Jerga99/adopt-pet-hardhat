import { Navbar } from "./components/Navbar";
import { PetItem } from "./components/PetItem";
import { TxError } from "./components/TxError";

function Dapp() {
  return (
    <div className="container">
      <TxError />
      <br />
      <Navbar />
      <div className="items">
        <PetItem />
      </div>
    </div>
  );
}

export default Dapp;
