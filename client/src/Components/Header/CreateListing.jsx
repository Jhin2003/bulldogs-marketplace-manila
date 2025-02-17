// CreateListing.js
import  { useState } from 'react';
import CreateListingModal from '../Modals/CreateListingModal';
import './CreateListing.scss'

const CreateListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div className='create-listing'>
  
      <button onClick={handleOpenModal}>Create Listing</button>
      {isModalOpen && <CreateListingModal onClose={handleCloseModal} />}
    </div>
  );
};

export default CreateListing;