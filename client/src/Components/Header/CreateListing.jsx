// CreateListing.js
import  { useState } from 'react';
import CreateListingModal from './CreateListingModal'; // Import the modal component

const CreateListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* The button that opens the modal */}
      <button onClick={handleOpenModal}>Create Listing</button>

      {/* Conditionally render the CreateListingModal */}
      {isModalOpen && <CreateListingModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CreateListing;