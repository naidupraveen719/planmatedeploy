import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from '../App';
import styled from "styled-components";
import Logo from "../assets/logo1.jpg";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    
    // ✅ NEW: Add state to manage errors and loading
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // ✅ UPDATED: Rewritten with async/await and try/catch for error handling
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/loging/login', data);
            
            const receivedToken = response.data.token;
            localStorage.setItem('authToken', receivedToken);
            setToken(receivedToken);
            navigate('/plan'); // Redirect user on success

        } catch (err) {
            // This block will now "catch" the 400 Bad Request error
            console.error("Login Error:", err.response);
            
            // Set a user-friendly error message
            if (err.response && err.response.data) {
                setError(err.response.data); // e.g., "User Not Found" or "Invalid credentials"
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <FormContainer>
                <form onSubmit={submitHandler} autoComplete="off">
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>PlanMateAI</h1>
                    </div>
                    
                    <input type="email" onChange={changeHandler} name="email" placeholder="Email" required />
                    <input type="password" onChange={changeHandler} name="password" placeholder="Password" required />
                    
                    {/* ✅ NEW: Display error message to the user */}
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    
                    <span>
                        Don't have an account ? <Link to="/register">Register.</Link>
                    </span>
                </form>
            </FormContainer>
        </PageWrapper>
    );
};

// ... your styled-components code remains the same ...
const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(to top right, #34a8c2, #f54ea3);
  padding: 1rem; // Prevents form from touching edges on small screens
`;

// 3. Made the form responsive and adjusted styling.
const FormContainer = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;

  form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem; // Adjusted gap for labels
  }

  .brand {
    text-align: center;
    margin-bottom: 1.5rem;
    img {
      height: 4rem; // Adjusted size
    }
    h1 {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 2.2rem;
      font-weight: 800;
      color: #333;
    }
  }

  label {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: -5px; // Positions label closer to its input
  }

  input {
    width: 100%;
    padding: 0.7rem;
    font-size: 1rem;
    border: 1px solid #ddd; // Changed to full border for clarity
    border-radius: 0.5rem;
    background-color: #f9f9f9;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #f54ea3;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(245, 78, 163, 0.2);
    }
  }

  button {
    background: linear-gradient(to right, #34a8c2, #f54ea3);
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.9rem;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  span {
    text-align: center;
    color: #666;
    margin-top: 1rem;

    a {
      color: #f54ea3;
      text-decoration: none;
      font-weight: 700;
    }
  }

  /* Media Query for responsiveness */
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;

    .brand h1 {
      font-size: 1.8rem;
    }
  }
`;


export default Login;