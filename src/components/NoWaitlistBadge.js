import React from "react";
import styled from "styled-components";


const NoWaitlistBadge = () => {
  return (
    <BadgeContainer>
      <CloudSVG viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M70 40c5.5 0 10-4.5 10-10S75.5 20 70 20c-1.2 0-2.4 0.2-3.5 0.6C64.2 14.5 58.5 10 52 10c-6.2 0-11.6 4.1-13.5 9.7C34 19 30 17 26 17c-7.2 0-13 5.8-13 13 0 7.2 5.8 13 13 13h44z"
          fill="white"
          stroke="rgb(220, 27, 27)"
          strokeWidth="3"
        />
      </CloudSVG>
      <Text>🚀 No Waitlist!</Text>
    </BadgeContainer>
  );
};

const BadgeContainer = styled.div`
//   position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    width: 80px;
    height: 50px;
  }
`;

const CloudSVG = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Text = styled.span`
  position: absolute;
  color: #ff5733;
  font-size: 1rem;
  font-weight: bold;
`;

export default NoWaitlistBadge;

// const NoWaitlistBadge = () => {
//   return <Badge>🚀 No Waitlist!</Badge>;
// };

// const Badge = styled.div`
//   position: fixed;
//   top: 20px;
//   right: 20px;
//   background: white;
//   color: #ff5733;
//   font-size: 1.2rem;
//   font-weight: bold;
//   padding: 10px 20px;
//   border-radius: 50px;
//   box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
//   z-index: 1000;
  
//   /* Cloud shape */
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   clip-path: path(
//     "M61.9,40.2c-2.2-8.5-9.9-14.8-19-14.8c-7.5,0-14.1,4.5-17,11.1
//     C17.4,33.7,13.7,32,9.7,32C4.4,32,0,36.4,0,41.7c0,5.2,4.3,9.5,9.5,9.5h50.8
//     c5.2,0,9.5-4.3,9.5-9.5C69.8,44.3,66.3,40.9,61.9,40.2z"
//   );

//   @media (max-width: 768px) {
//     font-size: 1rem;
//     padding: 8px 16px;
//     top: 15px;
//     right: 15px;
//   }
// `;

// export default NoWaitlistBadge;
