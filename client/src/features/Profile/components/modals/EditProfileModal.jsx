import { useState } from "react";
import "./EditProfileModal.scss";
import { updateUser } from "../../../../service/api";
import { useUser } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfileModal = ({ onClose , profile}) => {
  const navigate = useNavigate();
  const { user, login } = useUser();

  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    email: user.email,
    image: user.image_url,
  });

  const [previewImage, setPreviewImage] = useState(
    `http://localhost:3000${user.image_url}`
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setPreviewImage(image);
      setUpdatedUser({ ...updatedUser, image: file }); // Store file for upload
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    const response = await updateUser(user.id, updatedUser);
    if (response) {
      login(response.token, response.user);
    }
    navigate(`/profile/${user.id}`)
    onClose(); // Close modal after saving
  };

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-container">
        <h2 className="edit-profile-modal-title">Edit Profile</h2>

        <div className="edit-profile-image-upload">
          <label htmlFor="profile-image">Profile Picture</label>
          <label htmlFor="profile-image">
            {" "}
            {/* Clickable label */}
            <img
              src={previewImage}
              alt="Profile Preview"
              className="edit-profile-image-preview"
            />
          </label>
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {/* Username Input */}
        <div className="edit-profile-input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={updatedUser.username}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, username: e.target.value })
            }
            className="edit-profile-input"
            placeholder="Enter your username"
          />
        </div>

        {/* Email Input */}
        <div className="edit-profile-input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            className="edit-profile-input"
            placeholder="Enter your email"
          />
        </div>

        {/* Action Buttons */}
        <div className="edit-profile-modal-actions">
          <button className="edit-profile-save-btn" onClick={handleSaveClick}>
            Save
          </button>
          <button className="edit-profile-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
