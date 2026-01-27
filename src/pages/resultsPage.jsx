import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { store } from '../App';
import TripMap from '../components/TripMap';
import styled from 'styled-components';
import jsPDF from "jspdf";
import "jspdf-autotable";


// Helper function to format time for display
const formatTime = (timeString) => {
    if (!timeString || timeString === "0") return "N/A";
    const hoursMatch = timeString.match(/(\d+(\.\d+)?)\s*hour/i);
    const minutesMatch = timeString.match(/(\d+)\s*minute/i);
    let result = '';
    if (hoursMatch) result += `${hoursMatch[1]} hr `;
    if (minutesMatch) result += `${minutesMatch[1]} min`;
    return result.trim() || "N/A";
};


const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Trip Itinerary", 14, 20);

  doc.setFontSize(12);
  doc.text(`Starting From: ${originalPlan.startAddress}`, 14, 30);
  doc.text(`Days: ${originalPlan.days}`, 14, 38);
  doc.text(`Passengers: ${originalPlan.passengers}`, 14, 46);
  doc.text(`Estimated Cost: ₹${originalPlan.totalCost}`, 14, 54);

  let y = 65;

  dayWisePlan.forEach((day) => {
    doc.setFontSize(14);
    doc.text(`Day ${day.day}`, 14, y);
    y += 6;

    const tableData = day.places.map((p, i) => [
      i + 1,
      p.place,
      formatTime(p.expected_time_to_visit),
    ]);

    doc.autoTable({
      startY: y,
      head: [["#", "Place", "Visit Time"]],
      body: tableData,
    });

    y = doc.lastAutoTable.finalY + 10;
  });

  doc.save("Trip-Itinerary.pdf");
};


const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [token] = useContext(store);

  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!token || token === 'null' || token === 'undefined') {
      navigate('/login');
      return;
    }
    const fetchPlan = async () => {
      try {
        const config = { headers: { 'x-token': token } };
        const response = await axios.get(`https://backend-nodejs-planmate.onrender.com/results/api/plans/${id}`, config);
        setPlanData(response.data);
      } catch (err) {
        setError('Failed to load trip plan.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id, token, navigate]);
  
  // ✅ Function to save the final itinerary
  const handleSaveItinerary = async () => {
    if (!planData) return;
    
    setIsSaving(true);
    try {
      const config = { headers: { 'x-token': token } };
      const body = {
        originalPlanId: planData.originalPlan._id,
        dayWisePlan: planData.dayWisePlan
      };

      const response = await axios.post('https://backend-nodejs-planmate.onrender.com/results/api/itineraries', body, config);
      
      alert(response.data.message); // "Itinerary saved successfully!"
      // Optionally, you can redirect the user to a "My Trips" dashboard page
      // navigate('/dashboard');

    } catch (err) {
      alert('Failed to save the final itinerary. Please try again.');
      console.error("Save Itinerary Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <StatusContainer>Loading Your Trip Plan...</StatusContainer>;
  if (error) return <StatusContainer style={{ color: '#e74c3c' }}>{error}</StatusContainer>;
  if (!planData || !planData.originalPlan) return <StatusContainer>No plan data found.</StatusContainer>;

  const { originalPlan, dayWisePlan } = planData;

  return (
    <PageWrapper>
      <Header>
        <h1>Your Trip starting from {originalPlan.startAddress}</h1>
        <p>
          A {originalPlan.days}-day trip for {originalPlan.passengers} people with an estimated cost of 
          <strong> ₹{originalPlan.totalCost.toLocaleString('en-IN')}</strong>.
        </p>
      </Header>

      <MainGrid>
        <ItineraryColumn>
          <ItineraryHeader>Day-by-Day Itinerary</ItineraryHeader>
          {dayWisePlan && dayWisePlan.length > 0 ? (
            dayWisePlan.map((day) => (
            <DayCard key={day.day}>
              <DayHeader>
                <h3>Day {day.day}</h3>
                <span>~ {day.hoursSpent.toFixed(2)} hours</span>
              </DayHeader>
              <PlaceList>
                {day.places.map((place, index) => (
                  <li key={index}>
                    <PlaceName>📍 {place.place}</PlaceName> 
                    <VisitTime>{formatTime(place.expected_time_to_visit)}</VisitTime>
                  </li>
                ))}
              </PlaceList>
            </DayCard>
            ))
          ) : (
            <DayCard>No places fit within your budget and time constraints.</DayCard>
          )}
           <SaveButton onClick={handleSaveItinerary} disabled={isSaving}>
             {isSaving ? 'Saving...' : 'Confirm & Save Final Itinerary'}
           </SaveButton>

           <SaveButton onClick={handleDownloadPDF}>
  📄 Download Itinerary PDF
</SaveButton>

        </ItineraryColumn>
        
        <MapColumn>
          {originalPlan.feasiblePlaces && originalPlan.feasiblePlaces.length > 0 && (
            <TripMap places={originalPlan.feasiblePlaces} />
          )}
        </MapColumn>
      </MainGrid>
    </PageWrapper>
  );
};

// --- STYLED-COMPONENTS ---

const PageWrapper = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
  color: #343a40;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.1rem;
    color: #6c757d;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ItineraryColumn = styled.div`
  height: 85vh;
  overflow-y: auto;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ItineraryHeader = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #0056b3;
`;

const MapColumn = styled.div`
  height: 85vh;
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: relative;
    top: 0;
    height: 60vh;
  }
`;

const DayCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    color: #0d6efd;
  }

  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #6c757d;
  }
`;

const PlaceList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f3f5;
  }

  li:last-child {
    border-bottom: none;
  }
`;

const PlaceName = styled.strong`
  font-weight: 500;
`;

const VisitTime = styled.span`
  font-size: 0.85rem;
  color: #6c757d;
  white-space: nowrap;
`;

const SaveButton = styled.button`
  padding: 0.8rem 1.5rem; 
  font-size: 1rem; 
  font-weight: 600;
  cursor: pointer; 
  background-color: #198754;
  color: white; 
  border: none; 
  border-radius: 8px;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #157347;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;

export default ResultsPage;