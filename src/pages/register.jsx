import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo1.jpg";
const Register = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:'',
        email:'',
        phoneno:'',
        password:'',
        confirmpassword:''
    })
    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const submitHandler = e =>{
        e.preventDefault();
        axios.post('https://backend-nodejs-planmate.onrender.com/users/register',data).then(
            res => {alert(res.data);setData({
                username:'',
                email:'',
                phoneno:'',
                password:'',
                confirmpassword:''
            })}
        )

        navigate('/login');

    }
    return (
        <>
          <PageWrapper>

            <FormContainer>
                <form onSubmit={submitHandler} autoComplete="nope">
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h1>PlanMateAI</h1>
                </div>
                <input type="text" onChange={changeHandler} name="username" placeholder="User Name" /><br />
                <input type="email" onChange={changeHandler} name="email" placeholder="Email" /><br />
                <input type="tel" onChange={changeHandler} name="phoneno" placeholder="Phone Number" maxLength="10" pattern="[0-9]{10}"/><br />
                <input type="password" onChange={changeHandler} name="password" placeholder="Password" /><br />
                <input type="password" onChange={changeHandler} name="confirmpassword" placeholder="Confirm Password" /><br />
                <button type="submit">Register</button>
                 <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
            </form>
            </FormContainer>
        </PageWrapper>
            
            </>
        
    )
}

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
    gap: 0.3rem; // Adjusted gap for labels
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





export default Register