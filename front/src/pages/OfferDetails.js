import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/offerDetails.css';

const OfferDetails = ({ loggedInUser }) => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [owner, setOwner] = useState(null);
  const [carcass, setCarcass] = useState(null);
  const navigate = useNavigate();

  //const history = useHistory();

  useEffect(() => {
    const fetchOfferDetails = async () => {
    const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get(`http://localhost:8000/offers/${id}`);
        setOffer(response.data);

            const ownerId = response.data.owner_id;
            const ownerResponse = await axios.get(`http://localhost:8000/owners/${ownerId}`);
            setOwner(ownerResponse.data.name);

            const carcassId = response.data.carcass_id;

            if (carcassId) {
              const carcassTypeResponse = await axios.get(`http://localhost:8000/carcasss/${carcassId}`);
              setCarcass(carcassTypeResponse.data.name);
            }
        } catch (error) {
          console.error('Error fetching offer details:', error.message);
        }


      };
  

    fetchOfferDetails();
  }, [id,]);


  const handleDeleteOffer = async () => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.delete(`http://localhost:8000/offers/${id}`, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZm9taWNoZXZzaml5QGdtYWlsLmNvbSIsInBob25lIjoiKzM3NTEyMzQ1Njc4OSIsInJvbGUiOiJBZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJEdJcEJIYU54ZXN0VlEwY0xsRG4vRS5tYUpBZTEzTVlCR2ZuZm9vRGEuNEtuR3BjUVhpNWhHIiwibmFtZSI6IlNlTXNlaSIsImlkIjo0fSwiaWF0IjoxNzAxMzcyMDQ1LCJleHAiOjE3MDQ5NzIwNDV9.TyRe0fjBUD33uXVm575VNo-wBrXwBasliEDjmbhYGPY`
        },
      });
      console.log(resp);
      navigate("/");
      //history.push('/');

    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };

  const handleOrder = async () => {
    console.log(offer.title);
            const token = localStorage.getItem('token');
            console.log('Token: ', token);
            const title = offer.title;
            await axios.post(`http://localhost:8000/orders`, {
              headers: {
                Authorization: `${token}`,
              },
              title
            })
  }

  if (!offer) {
    return <p>Loading...</p>;
  }
  const isOwner = loggedInUser && owner === loggedInUser.fullName;
  
  return (

    <div><Header />
    <div className="containerr">
      
      <img className="offer-imagee" alt='' src={`${offer.imgUrl}`} />
      <p className="offer-detailsss">Name: {offer.title}</p>
      <p className="offer-detailsss">Summary: {offer.summary}</p>
      <p className="offer-detailsss">Carcasss: {carcass || 'Unknown'}</p>
      <p className="offer-detailsss">Cost: {offer.cost}</p>
      <p className="offer-detailsss">Owner: {owner || 'Unknown'}</p>
  

      
      
      {loggedInUser && (
        <button className="offer-detailss" onClick={handleDeleteOffer}>Delete Offer</button>
      )}
      {loggedInUser && (
        <Link to={`/edit-offer/${id}`}>
          <button className="offer-detailss">Edit Offer</button>
        </Link>
      )}
      {loggedInUser && (
          <button className="offer-detailss" onClick ={handleOrder}>Order Offer</button>
      )}
    </div>
    </div>
  );
};

export default OfferDetails;