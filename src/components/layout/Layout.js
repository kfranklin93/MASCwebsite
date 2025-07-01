import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1200px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }

  @media (max-width: 480px) {
    padding: 2rem 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${props => props.small ? '800px' : '1200px'};
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 1200px) {
    max-width: ${props => props.small ? '700px' : '1140px'};
  }

  @media (max-width: 1024px) {
    max-width: ${props => props.small ? '600px' : '960px'};
  }

  @media (max-width: 768px) {
    max-width: ${props => props.small ? '500px' : '720px'};
    padding: 0 0.75rem;
  }

  @media (max-width: 480px) {
    max-width: ${props => props.small ? '100%' : '540px'};
    padding: 0 0.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || '1rem'};

  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.tabletColumns || 6}, 1fr);
    gap: ${props => props.tabletGap || '0.75rem'};
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(${props => props.mobileColumns || 4}, 1fr);
    gap: ${props => props.mobileGap || '0.5rem'};
  }
`;