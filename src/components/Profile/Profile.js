import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, weather, handleCardClick, setActiveModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        weather={weather}
        handleCardClick={handleCardClick}
        setActiveModal={setActiveModal}
      />
    </div>
  );
}

export default Profile;
