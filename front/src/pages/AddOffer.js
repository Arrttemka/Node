import React from 'react';
import AddOfferForm from '../components/AddOfferForm';
import { useNavigate } from "react-router-dom";

const AddOfferPage = () => {
    const navigate = useNavigate();

  const handleAddOffer = (offerData) => {
    console.log('Offer added:', offerData);
    
  };

  return (
    <div>
      <AddOfferForm />
    </div>
  );
};

export default AddOfferPage;