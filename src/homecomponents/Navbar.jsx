/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { BsPerson } from "react-icons/bs";
import Logo from "../assets/logo1.jpg";
import { store } from '../App';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  return (
    <Container >
      <div className="brand">
        <img src={Logo} alt="logo" />
        <span>PlanMateAI</span>
      </div>
      
      <div className={`links show`}>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services"> Services</a>
          </li>
          <li>
            <a href="#diversity">Diversity</a>
          </li>
          <li>
            <a href="#offer">Offer</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="../pages/Planpage">Plan</a>
          </li>
          <li>
            <a href="../pages/resultsPage">Results</a>
          </li>
        </ul>
      </div>
      <div className="account-info">
        <div className="account">
          <span>
            <BsPerson />
          </span>
          {
        token ? (
    <span onClick={() => setToken(null)}>LOGOUT</span> 
  ) : (

    <span onClick={() => navigate('/login')}>LOGIN</span>
  )
}
          
        </div>
       
      </div>
    </Container>
  );
}

const Container = styled.nav`
  width: 100%;
  height: 70px;
  background: linear-gradient(135deg, #0077ff, #00c6ff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    img {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      border: 2px solid white;
    }

    span {
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
    }
  }

  .links {
    ul {
      display: flex;
      list-style: none;
      gap: 2rem;

      li a {
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        color: white;
        position: relative;
        transition: all 0.3s ease;

        &::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0%;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }

        &:hover::after {
          width: 100%;
        }
      }
    }
  }

  .account-info {
    .account {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      color: white;

      span:first-child {
        font-size: 1.4rem;
      }

      &:hover {
        color: #ffe600;
      }
    }
  }

  /* Hamburger button */
  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 25px;
    height: 18px;
    cursor: pointer;

    span {
      display: block;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    &.active span:nth-child(1) {
      transform: rotate(45deg) translateY(7px);
    }
    &.active span:nth-child(2) {
      opacity: 0;
    }
    &.active span:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px);
    }
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .links {
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      background: linear-gradient(135deg, #0077ff, #00c6ff);
      padding: 1.5rem 0;
      transform: translateY(-200%);
      transition: transform 0.4s ease;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);

      ul {
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
      }

      &.show {
        transform: translateY(0);
      }
    }

    .menu-toggle {
      display: flex;
    }
  }
`;
