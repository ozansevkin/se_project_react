import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  weather,
  handleCardClick,
  setActiveModal,
  onLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <SideBar setActiveModal={setActiveModal} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        weather={weather}
        handleCardClick={handleCardClick}
        setActiveModal={setActiveModal}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
