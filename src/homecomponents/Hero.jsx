import React, { useState,useContext } from 'react';
import styled from "styled-components";
import HeroImage from "../assets/hero.jpg";
import IndiaMap from "../assets/indiamap.jpg";
import {store} from '../App';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [token,setToken] = useContext(store);
  const navigate = useNavigate();
  return (
    <Section>
     

      {/* Map + Text */}
      <div className="content-section">
        <div className="secondimage">
          <img src={IndiaMap} alt="India Map" />
        </div>
        <div className="text">
          <h2>Welcome to PlanMateAI</h2>
          <p>
            PlanMateAI is your intelligent travel companion that helps you
            discover destinations, plan trips, book stays, and create
            unforgettable experiences across India. With AI-powered suggestions,
            you can explore hidden gems, manage your budget, and enjoy stress-free
            travel.
          </p>
          <button 
  onClick={() => token ? navigate('/plan') : navigate('/login')}
>
  Plan Your Trip
</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 70px; /* to avoid navbar overlap */

  

  /* Map + text side by side */
  .content-section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 2rem;
    padding: 3rem 2rem;
    flex-wrap: wrap; /* responsive */
    width: 100%;
    max-width: 1200px;
  }

  .secondimage {
    flex: 1;
    min-width: 280px;
    max-width: 500px;

    img {
      width: 100%;
      height: auto;
      border-radius: 15px;
    }
  }

  .text {
    flex: 1;
    min-width: 280px;
    max-width: 500px;

    h2 {
      font-size: 2rem;
      font-weight: bold;
      color: #0077ff;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      color: #444;
      margin-bottom: 2rem;
    }

    button {
      background: linear-gradient(135deg, #0077ff, #00c6ff);
      color: white;
      font-size: 1.3rem;
      font-weight: bold;
      padding: 1rem 2.5rem;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: linear-gradient(135deg, #0056d1, #0094cc);
        transform: scale(1.08);
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .firstimage {
      height: 35vh;
    }

    .content-section {
      flex-direction: column;
      text-align: center;
    }

    .text h2 {
      font-size: 1.6rem;
    }

    .text p {
      font-size: 0.95rem;
    }

    .text button {
      font-size: 1.1rem;
      padding: 0.9rem 2rem;
    }
  }
`;
