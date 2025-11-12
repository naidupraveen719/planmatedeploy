import React from "react";
import styled from "styled-components";

import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";

const CircleContainer = styled.div`
  position: relative;
  width: 450px;
  height: 450px;
  margin: 2rem auto;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Tablet */
  @media (max-width: 1024px) {
    width: 350px;
    height: 350px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    width: 270px;
    height: 270px;
  }
`;

const CircleItem = styled.img`
  position: absolute;
  top: 50%;
  left: 30%;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  transform-origin: 0 -400px;
  transform: rotate(calc(var(--i) * 36deg)) translateY(-350px)
    rotate(calc(var(--i) * -36deg));

  /* Tablet */
  @media (max-width: 1024px) {
    width: 150px;
    height: 150px;
    transform-origin: 0 -300px;
    transform: rotate(calc(var(--i) * 36deg)) translateY(-260px)
      rotate(calc(var(--i) * -36deg));
  }

  /* Mobile */
  @media (max-width: 600px) {
    width: 110px;
    height: 110px;
    transform-origin: 0 -220px;
    transform: rotate(calc(var(--i) * 36deg)) translateY(-190px)
      rotate(calc(var(--i) * -36deg));
  }
`;

const CenterContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -10%);
  text-align: center;
  width: 250px;
  padding: 10px;

  /* Tablet */
  @media (max-width: 1024px) {
    width: 200px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    width: 160px;
  }
`;

const Heading = styled.h2`
  font-size: 30px;
  margin: 5px 0;
  color: orange;

  /* Tablet */
  @media (max-width: 1024px) {
    font-size: 22px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const Paragraph = styled.p`
  font-size: 20px;
  color: #444;

  /* Tablet */
  @media (max-width: 1024px) {
    font-size: 16px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const CircleLayout = () => {
  return (
    <CircleContainer>
      <CircleItem src={img1} style={{ "--i": 0 }} alt="img1" />
      <CircleItem src={img2} style={{ "--i": 1 }} alt="img2" />
      <CircleItem src={img3} style={{ "--i": 2 }} alt="img3" />
      <CircleItem src={img4} style={{ "--i": 3 }} alt="img4" />
      <CircleItem src={img5} style={{ "--i": 4 }} alt="img5" />
      <CircleItem src={img6} style={{ "--i": 5 }} alt="img6" />
      <CircleItem src={img7} style={{ "--i": 6 }} alt="img7" />
      <CircleItem src={img8} style={{ "--i": 7 }} alt="img8" />
      <CircleItem src={img9} style={{ "--i": 8 }} alt="img9" />
      <CircleItem src={img10} style={{ "--i": 9 }} alt="img10" />

      <CenterContent>
        <Heading>Visit India’s Rich Culture</Heading>
        <Paragraph>
          A land of diversity, traditions, and heritage — united in spirit,
          colorful in expression.
        </Paragraph>
      </CenterContent>
    </CircleContainer>
  );
};

export default CircleLayout;
