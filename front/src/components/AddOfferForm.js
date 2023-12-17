import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddOfferForm = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    WIN: '',
    cost: 0,
    imgUrl: '',
    carcass_id: 0, 
    owner_id: 0
  });
  const [carcasss, setCarcasss] = useState([]); 
  const [owners, setOwners] = useState([]); 
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
       /* const offerResponse = await axios.get(`http://localhost:8000/offers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });*/

        //const carcassResponse = await axios.get(`http://localhost:8000/carcasss/${offerResponse.data.carcass_id}`);
        const carcasssResponse = await axios.get(`http://localhost:8000/carcasss`);
        const ownersResponse = await axios.get(`http://localhost:8000/owners`);

        /*setFormData({
            /*brand: carResponse.data.brand,
            model: carResponse.data.model,
            cost: carResponse.data.cost.toString(),
            description: carResponse.data.description,
            yearOfPublication: carResponse.data.yearOfPublication.toString(),
            carUrl: carResponse.data.carUrl,
            carcassType: carResponse.data.carcassType._id,
            title: offerResponse.data.title,
            summary: offerResponse.data.summary,
            WIN: offerResponse.data.WIN,
            cost: offerResponse.data.cost,
            imgUrl: offerResponse.data.imgUrl,
            carcass_id: offerResponse.data.carcass_id, 
            owner_id: offerResponse.data.owner_id
        });*/

        setCarcasss(carcasssResponse.data);
        setOwners(ownersResponse.data);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.files)
    {    const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result;
            console.log(base64Image);
            setFormData((prevData) => ({
            ...prevData,
            imgUrl: base64Image,
            }));
        };

        reader.readAsDataURL(file);
        }}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log(formData);
      await axios.post(`http://localhost:8000/offers`, formData, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZm9taWNoZXZzaml5QGdtYWlsLmNvbSIsInBob25lIjoiKzM3NTEyMzQ1Njc4OSIsInJvbGUiOiJBZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJEdJcEJIYU54ZXN0VlEwY0xsRG4vRS5tYUpBZTEzTVlCR2ZuZm9vRGEuNEtuR3BjUVhpNWhHIiwibmFtZSI6IlNlTXNlaSIsImlkIjo0fSwiaWF0IjoxNzAxMzcyMDQ1LCJleHAiOjE3MDQ5NzIwNDV9.TyRe0fjBUD33uXVm575VNo-wBrXwBasliEDjmbhYGPY`,
        },
      });

      navigate(`/`);
    } catch (error) {
      console.error('Error addiing offer:', error.message);
      console.log(error.response);

      if (error.response && error.response.data) {
        setFormError(error.response.data);
      } else {
        setFormError('Error adding offer. Please try again.');
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Title:
        <input
          className="form-input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Summary:
        <input
          className="form-input"
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Cost:
        <input
          className="form-input"
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        WIN:
        <input
          className="form-textarea"
          type="number"
          name="WIN"
          value={formData.WIN}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Offer Image:
        <input className="form-input" type="file" name="imgUrl" accept="image/*" onChange={handleChange} />
        {/*}input
          className="form-input"
          type="text"
          name="imgUrl"
          value={formData.carUrl}
          onChange={handleChange}
  />*/}
      </label>

      <label className="form-label">
        Carcass:
        <select
          className="form-select"
          name="carcass_id"
          value={formData.carcass_id}
          onChange={handleChange}
        >
          {carcasss.map((carcass) => (
            <option key={carcass.id} value={carcass.id}>
              {carcass.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Owner:
        <select
          className="form-select"
          name="owner_id"
          value={formData.owner_id}
          onChange={handleChange}
        >
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
      </label>

      <button className="form-button" type="submit">
        Create Offer
      </button>

      {formError && <p className="form-error">{formError}</p>}
    </form>
  );
};

export default AddOfferForm;