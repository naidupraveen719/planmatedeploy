import React, { useState,useContext,useEffect} from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // <-- Import axios
import { useNavigate } from 'react-router-dom'; // <-- Optional: to redirect after success
import {store} from '../App';
import { 
    FaUser, FaCalendarAlt, FaUsers, FaWallet, FaSun, FaMapMarkerAlt, FaHeart, 
    FaTree, FaLandmark, FaUmbrellaBeach, FaKaaba, FaPrayingHands, FaMountain, 
    FaPaintBrush, FaPaw, FaHiking, FaWater, FaShip, FaBurn
} from 'react-icons/fa';


const categories = [
    { name: 'historical', icon: <FaLandmark /> },
    { name: 'traditional', icon: <FaPaintBrush /> },
    { name: 'nature', icon: <FaTree /> },
    { name: 'beaches', icon: <FaUmbrellaBeach /> },
    { name: 'wildlife adventure', icon: <FaPaw /> },
    { name: 'romantic', icon: <FaHeart /> },
    { name: 'spiritual', icon: <FaPrayingHands /> },
    { name: 'religious', icon: <FaKaaba /> },
    { name: 'mountains', icon: <FaMountain /> },
    { name: 'lakes', icon: <FaWater /> },
    { name: 'waterfalls', icon: <FaWater /> },
    { name: 'deserts', icon: <FaBurn /> },
    { name: 'islands', icon: <FaShip /> },
];


const PlanPage = () => {
  const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);

  const navigate = useNavigate(); // <-- Optional: initialize navigate
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date(),
    passengers: 1,
    budget: 50000,
    days: 7,
    startAddress: 'Visakhapatnam',
    selectedCategories: [],
  });

  useEffect(() => {
     if (!token || token === 'null' || token === 'undefined') {
      navigate('/login'); // Redirect if not logged in
      return;
    }},[token,navigate]);


  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  
  // --- NEW: Add loading and error states ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // --- All handler functions remain the same ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepperChange = (field, amount) => {
    setFormData(prev => ({
        ...prev,
        [field]: Math.max(1, prev[field] + amount)
    }));
  };
  
  const handleCategoryToggle = (categoryName) => {
    setFormData(prev => {
        const isSelected = prev.selectedCategories.includes(categoryName);
        if (isSelected) {
            return { ...prev, selectedCategories: prev.selectedCategories.filter(c => c !== categoryName) };
        } else {
            return { ...prev, selectedCategories: [...prev.selectedCategories, categoryName] };
        }
    });
  };

  // --- NEW: Function to handle form submission ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setIsLoading(true); // Start loading
    setError(''); // Clear previous errors
    console.log(formData);
    try {
      // The 'formData' object is the request body
      const response = await axios.post('https://backend-nodejs-planmate.onrender.com/planpage/api/plan-trip',formData,{
            headers: {
                'x-token' : token
            }
        });
      
      console.log('Success:', response.data);
      setData(response.data);
      alert('Your trip plan has been submitted successfully!');
      const savedPlan = response.data.savedPlan;

    // 2. Check if the plan and its _id exist.
    if (savedPlan && savedPlan._id) {
      // 3. Use the _id to navigate to the results page.
      navigate(`/results/${savedPlan._id}`);
    } else {
      // Fallback in case something went wrong and the plan wasn't returned
      navigate('/home'); // Or to a dashboard page
    }


      // Optional: Redirect to a results page after success
      // navigate('/trip-results'); 

    } catch (err) {
      console.error('Submission Error:', err);
      setError('Failed to submit the plan. Please try again.');
      alert('An error occurred. Please check the console for details.');
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <PlanPageWrapper>
        <h1>Craft Your Perfect Trip 🌍✈</h1>
        {/* --- UPDATE: Wrap content in a form element --- */}
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header"> <FaUser /> <h3>Your Name</h3> </div>
                <input required className="input-field" type="text" name="name" placeholder="e.g., Priya Sharma" value={formData.name} onChange={handleInputChange} />
            </div>
            
            <div className={`card ${isDatePickerOpen ? 'datepicker-active' : ''}`}>
                <div className="card-header"> <FaCalendarAlt /> <h3>Start Date</h3> </div>
                <DatePicker 
                    selected={formData.startDate} 
                    onChange={date => setFormData(prev => ({ ...prev, startDate: date }))} 
                    customInput={<input className="input-field" />} 
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                    onCalendarOpen={() => setIsDatePickerOpen(true)}
                    onCalendarClose={() => setIsDatePickerOpen(false)}
                />
            </div>
            
            <div className="card">
                <div className="card-header"> <FaUsers /> <h3>Passengers</h3> </div>
                <div className="stepper-wrapper">
                    <button type="button" className="stepper-button" onClick={() => handleStepperChange('passengers', -1)}>-</button>
                    <span className="stepper-value">{formData.passengers}</span>
                    <button type="button" className="stepper-button" onClick={() => handleStepperChange('passengers', 1)}>+</button>
                </div>
            </div>

            <div className="card">
                <div className="card-header"> <FaSun /> <h3>Number of Days</h3> </div>
                <div className="stepper-wrapper">
                    <button type="button" className="stepper-button" onClick={() => handleStepperChange('days', -1)}>-</button>
                    <span className="stepper-value">{formData.days}</span>
                    <button type="button" className="stepper-button" onClick={() => handleStepperChange('days', 1)}>+</button>
                </div>
            </div>

             <div className="card">
                <div className="card-header"> <FaWallet /> <h3>Budget </h3> </div>
                <input type="range" className="budget-slider" name="budget" min="50000" max="500000" step="1000" value={formData.budget} onChange={handleInputChange} />
                <span className="stepper-value" style={{textAlign: 'center', display: 'block', marginTop: '0.5rem'}}>₹ {Number(formData.budget).toLocaleString('en-IN')}</span>
            </div>

             <div className="card">
                <div className="card-header"> <FaMapMarkerAlt /> <h3>Starting Address</h3> </div>
                <input required className="input-field" type="text" name="startAddress" value={formData.startAddress} onChange={handleInputChange} />
            </div>

             <div className="card full-width-card">
                <div className="card-header"><h3>What's your travel vibe?</h3></div>
                <div className="category-wrapper">
                    {categories.map(cat => (
                        <button 
                            type="button"
                            key={cat.name} 
                            className={`category-chip ${formData.selectedCategories.includes(cat.name) ? 'selected' : ''}`}
                            onClick={() => handleCategoryToggle(cat.name)}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* --- UPDATE: Change button to type="submit" and handle loading state --- */}
            <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Planning...' : '✨ Plan My Trip!'}
            </button>

            {/* --- NEW: Display error message if submission fails --- */}
            {error && <p className="error-message">{error}</p>}
        </form>
    </PlanPageWrapper>
  );
};

const PlanPageWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  min-height: 100vh;
  padding: 2rem 1rem;
  
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    margin-bottom: 2rem;
    text-align: center;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
    width: 100%;
  }

  .card {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: all 0.3s ease-in-out;
  }

  /* FIX-STEP-3: Add styles for the active card */
  .card.datepicker-active {
    position: relative;
    z-index: 100;
  }

  .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px 0 rgba(31, 38, 135, 0.5);
  }

  .full-width-card {
    grid-column: 1 / -1;
  }

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    color: #555;

    svg {
      font-size: 1.5rem;
      margin-right: 0.75rem;
      color: #764ba2;
    }

    h3 {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }

  .stepper-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .stepper-button {
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .stepper-button:hover {
    background-color: #5a6fd5;
  }

  .stepper-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  
  .budget-slider {
    width: 100%;
    cursor: pointer;
  }

  .category-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .category-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    border: 2px solid #ddd;
    background-color: transparent;
    color: #555;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Poppins', sans-serif;
  }

  .category-chip:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  .category-chip.selected {
    border-color: #764ba2;
    background-color: #764ba2;
    color: white;
  }
  
  .submit-button {
    grid-column: 1 / -1;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(254, 180, 123, 0.4);
    margin-top: 1rem;
  }

  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(254, 180, 123, 0.6);
  }
`;


export default PlanPage;