import styled from 'styled-components';
import { media } from '../../styles/theme';

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

  ${media.desktop} {
    padding: 0 1.5rem;
  }

  ${media.tablet} {
    padding: 0 1rem;
  }

  ${media.mobile} {
    padding: 0 0.5rem;
  }
`;

export const Section = styled.section`
  padding: 4rem 0;
  width: 100%;

  ${media.tablet} {
    padding: 3rem 0;
  }

  ${media.mobile} {
    padding: 2rem 0;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: ${props => props.small ? '800px' : '1200px'};
  margin: 0 auto;
  padding: 0 1rem;

  ${media.desktop} {
    max-width: ${props => props.small ? '700px' : '1140px'};
  }

  ${media.laptop} {
    max-width: ${props => props.small ? '600px' : '960px'};
  }

  ${media.tablet} {
    max-width: ${props => props.small ? '500px' : '720px'};
    padding: 0 0.75rem;
  }

  ${media.mobile} {
    max-width: ${props => props.small ? '100%' : '540px'};
    padding: 0 0.5rem;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${props => props.gap || '1rem'};

  ${media.tablet} {
    grid-template-columns: repeat(${props => props.tabletColumns || 6}, 1fr);
    gap: ${props => props.tabletGap || '0.75rem'};
  }

  ${media.mobile} {
    grid-template-columns: repeat(${props => props.mobileColumns || 4}, 1fr);
    gap: ${props => props.mobileGap || '0.5rem'};
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
  flex-wrap: ${props => props.wrap || 'nowrap'};

  ${media.tablet} {
    flex-direction: ${props => props.tabletDirection || props.direction || 'row'};
    gap: ${props => props.tabletGap || props.gap || '0.75rem'};
  }

  ${media.mobile} {
    flex-direction: ${props => props.mobileDirection || 'column'};
    gap: ${props => props.mobileGap || props.gap || '0.5rem'};
  }
`;

export const Spacing = styled.div`
  margin: ${props => props.margin || '1rem'};
  padding: ${props => props.padding || 0};

  ${media.tablet} {
    margin: ${props => props.tabletMargin || props.margin || '0.75rem'};
    padding: ${props => props.tabletPadding || props.padding || 0};
  }

  ${media.mobile} {
    margin: ${props => props.mobileMargin || props.margin || '0.5rem'};
    padding: ${props => props.mobilePadding || props.padding || 0};
  }
`;