import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/offerList.css'; 
import { Helmet } from 'react-helmet';

const OfferList = () => {
    const [offers, setOffers] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [carcasss, setCarcasss] = useState([]);
    const [selectedCarcass, setSelectedCarcass] = useState('');
    const [selectedCarcassId, setSelectedCarcassId] = useState('');
    const [find, setFind] = useState('')
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('msg', localStorage.getItem('msg'));
        try {
          let url = 'http://localhost:8000/offers';
  
          /*if (selectedCarcass) {
            url += `?carcassType=${selectedCarcass}`;
          }*/
  
          if (sortOption) {
            //url += `${selectedCarcassType ? '&' : '?'}sort=${sortOption}`;
            url += `?sort=${sortOption}`;
          }

          console.log(selectedCarcass);
          if (selectedCarcass != null && selectedCarcass != 'All' && selectedCarcass != '') {
            if (sortOption) {
              url += `&filterCarcass=${selectedCarcass}`;
            } else {
              url += `?filterCarcass=${selectedCarcass}`;
            }
          }

          if (find != null && find != '') {
            if (sortOption || (selectedCarcass != null && selectedCarcass != 'All' && selectedCarcass != '')) {
              url += `&find=${find}`;
            } else {
              url += `?find=${find}`;
            }
          }

          console.log(url);
  
          const response = await axios.get(url);
          console.log(response);
          setOffers(response.data);
        } catch (error) {
          console.error('Error fetching offers:', error.message);
        }
      };
  
      const fetchCarcasss = async () => {
        try {
          const response = await axios.get('http://localhost:8000/carcasss');
          setCarcasss(response.data);
        } catch (error) {
          console.error('Error fetching carcasss:', error.message);
        }
      };
  
      fetchData();
      fetchCarcasss();    
      console.log(1234567890);
    }, [sortOption, selectedCarcass, find]);
  
    const handleSortChange = (newSortOption) => {
      setSortOption(newSortOption);
    };
  
    const handleCarcassChange = (event) => {
        //setSelectedCarcass(event.target.value);
        var index = event.nativeEvent.target.selectedIndex;
        setSelectedCarcass(event.nativeEvent.target[index].text);
        setSelectedCarcassId(event.target.value);
    };

    const handleFindChange = (event) => {
        setFind(event.target.value);
    }
  
    return (
      <div className="container">
        <div className="sort-buttons">
          <button onClick={() => handleSortChange('asc')}>Sort by Price (Asc)</button>
          <button onClick={() => handleSortChange('desc')}>Sort by Price (Desc)</button>
          <select id="carcassSelect" onChange={handleCarcassChange} value={selectedCarcassId}>
            <option value="">All</option>
            {carcasss.map((carcass) => (
              <option className='select-dropdown__list-item' key={carcass.id} value={carcass.id}>
                {carcass.name}
              </option>
            ))}
          </select>
          <input type="text" onChange={handleFindChange}/>
        </div>
        <div className="listOfferCenter">
        <ul className="offer-list">
          {offers.map((offer) => (
            <li key={offer.id} className="offer-item">
              <img src={`${offer.imgUrl}`} alt={`${offer.title} ${offer.summary}`} className="offer-image" />
              <Link to={`/offers/${offer.id}`} className="offer-link">
                <p className="offer-details">{offer.title} {offer.summary}</p>
              </Link>
              <p className="offer-cost">Cost: {offer.cost}$</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
      
    );
  };
  
  export default OfferList;