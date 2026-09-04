import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundContainer = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f3f9f9 0%, #ffffff 50%, #e8fdf5 100%);
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 640px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Code = styled.p`
  font-size: 1rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #00695c;
  margin: 0 0 0.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  color: #cd1b1b;
  margin: 0 0 1rem;
  font-family: "Bubblegum Sans", sans-serif;
`;

const Message = styled.p`
  font-size: 1.15rem;
  color: #33484d;
  line-height: 1.6;
  margin: 0 0 2rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionLink = styled(Link)`
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  background: #cd1b1b;
  color: #ffffff;
  border: 2px solid #cd1b1b;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;

  &:hover,
  &:focus-visible {
    background: #ffffff;
    color: #cd1b1b;
    transform: translateY(-2px);
  }

  &.secondary {
    background: #ffffff;
    color: #1c5f8a;
    border-color: #1c5f8a;

    &:hover,
    &:focus-visible {
      background: #1c5f8a;
      color: #ffffff;
    }
  }
`;

const NotFound = () => (
  <NotFoundContainer>
    <Helmet>
      <title>Page Not Found | Mommy Angels Autism Center</title>
      <meta name="robots" content="noindex, follow" />
    </Helmet>
    <ContentWrapper>
      <Code>Error 404</Code>
      <Title>We couldn&apos;t find that page</Title>
      <Message>
        The page you&apos;re looking for may have moved or no longer exists.
        Let&apos;s get you back to somewhere helpful.
      </Message>
      <Actions>
        <ActionLink to="/">Back to Home</ActionLink>
        <ActionLink to="/contact" className="secondary">
          Contact Us
        </ActionLink>
      </Actions>
    </ContentWrapper>
  </NotFoundContainer>
);

export default NotFound;
