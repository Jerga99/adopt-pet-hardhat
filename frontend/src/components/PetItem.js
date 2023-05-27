




export function PetItem({pet, adoptPet}) {
  return (
    <div className="item">
      <div className="image">
        <img
          src={pet.picture}
          alt=""
        ></img>
      </div>
      <div className="info-holder">
        <div>
          <b>Name:</b> {pet.name}
        </div>
        <div>
          <b>Age:</b> {pet.age}
        </div>
        <div>
          <b>Breed:</b> {pet.breed}
        </div>
        <div>
          <b>Location:</b> {pet.location}
        </div>
        <div>
          <b>Description:</b> {pet.description}
        </div>
      </div>
      <div className="action-menu">
        <button 
          onClick={adoptPet}
          className="action-button">Adopt
        </button>
      </div>
    </div>
  )
}
