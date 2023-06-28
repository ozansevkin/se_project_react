import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
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
        handleCardClick={handleCardClick}
        setActiveModal={setActiveModal}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
