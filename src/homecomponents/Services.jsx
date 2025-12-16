import React from "react";
import styled from "styled-components";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
export default function Services() {
  const data = [
    {
      image: service1,
      title: "Craft Your Plan",
      description: "Design personalized trips with AI-powered suggestions tailored to your budget, interests, and travel days.",
    },
    {
      image: service2,
      title: "Book with Ease",
      description: "Effortlessly reserve flights, hotels, and transport in one place, ensuring a smooth, stress-free booking experience",
    },
    {
      image: service3,
      title: "Travel with Confidence",
      description: "Get trusted recommendations, reliable guidance, and dedicated support to make every journey safe and enjoyable",
    },
    {
      image: service4,
      title: "Unforgettable Moments",
      description: "Explore hidden gems, capture memories, and enjoy unique experiences that make your travels truly unforgettable.",
    },
  ];
  return (
    <Section id="services">
      <div className="services">
        {data.map(({ image, title, description }) => {
          return (
            <div className="service" key={title}>
              <img src={image} alt="service" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: -4rem 4rem;
  .services {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    .service {
      padding: 1.5rem 2rem;
      text-align: center;
      background-color: var(--card-grey);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      h3 {
        color: var(--primary-text);
      }
      p {
        color: var(--secondary-text);
      }
      img {
        height: 180px;
        width: 180px;
      }
      transition: var(--default-transition);
      &:hover {
        background-color: white;
        box-shadow: rgba(250, 111, 69, 0.35) 0px 5px 15px;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 3rem;
    .services {
      grid-template-columns: 1fr;
    }
  }
   @media (max-width: 768px) {
  .services {
    position: static;
    top: 0;
  }

  .service {
    padding: 0.5rem 1rem;
    margin-bottom: 1.5rem; /* correct spacing */
  }
}

`;