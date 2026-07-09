import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  padding: 120px 2rem 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  border-left: 4px solid #CD1B1B;
  border-right: 4px solid #4A90E2;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00695c;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Nunito", sans-serif;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  font-size: 1.15rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 1.5rem;
  
  &:first-of-type {
    font-size: 1.25rem;
    font-weight: 500;
    color: #00695c;
  }
`;

const TextContent = styled.div`
  padding: 3rem;
  border-radius: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(74, 144, 226, 0.1);
  border-left: 5px solid #FFD700;
  margin-bottom: 3rem;
  position: relative;
  
  &::before {
    content: '💬';
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 3rem;
    opacity: 0.1;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 2rem;
  border-radius: 15px;
  border: 2px solid transparent;
  background-clip: padding-box;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4A90E2, #CD1B1B, #FFD700);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(74, 144, 226, 0.2);
    border-color: rgba(74, 144, 226, 0.3);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureTitle = styled.h3`
  color: #00695c;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '✓';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #4A90E2, #CD1B1B);
    color: white;
    border-radius: 50%;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;

const FAQTitle = styled.h2`
  font-size: 2.5rem;
  color: #00695c;
  margin: 4rem 0 2.5rem;
  text-align: center;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4A90E2, #CD1B1B, #FFD700);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const FAQContainer = styled.div`
  margin: 2rem 0 3rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

const FAQItem = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin-bottom: 1.25rem;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${props => props.isOpen ? '#CD1B1B' : 'rgba(74, 144, 226, 0.2)'};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.75rem 2rem;
  background: ${props => props.isOpen ? 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' : 'transparent'};
  border: none;
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.isOpen ? '#CD1B1B' : '#00695c'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Nunito", sans-serif;
  transition: all 0.3s ease;
  gap: 1rem;

  &:hover {
    color: #CD1B1B;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  &::after {
    content: '${props => props.isOpen ? '−' : '+'}';
    font-size: 2rem;
    color: ${props => props.isOpen ? '#CD1B1B' : '#4A90E2'};
    font-weight: bold;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${props => props.isOpen ? 'rgba(205, 27, 27, 0.1)' : 'rgba(74, 144, 226, 0.1)'};
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 1.1rem;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: ${props => props.isOpen ? '0 2rem 2rem' : '0 2rem'};
  color: #555;
  font-size: 1.1rem;
  line-height: 1.8;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: ${props => props.isOpen ? '0 1.5rem 1.5rem' : '0 1.5rem'};
    font-size: 1.05rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.secondary ? '#E3F2FD' : '#4A90E2'};
  color: ${props => props.secondary ? '#4A90E2' : '#FFFFFF'};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid #4A90E2;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.secondary ? '#4A90E2' : '#CD1B1B'};
    color: #FFFFFF;
    box-shadow: 0 6px 15px rgba(74, 144, 226, 0.3);
  }
`;

const SpeechTherapy = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const features = [
    {
      title: "Communication Skills",
      description: "Develop effective verbal and non-verbal communication abilities."
    },
    {
      title: "Language Development",
      description: "Build vocabulary, grammar, and comprehension skills."
    },
    {
      title: "Articulation",
      description: "Improve speech clarity and sound production."
    },
    {
      title: "Social Communication",
      description: "Enhance conversational skills and social interaction."
    }
  ];

  const faqs = [
    {
      question: "What is speech therapy?",
      answer: "Speech therapy is a specialized service that helps children improve their communication skills, including speaking, understanding language, and social communication. Our therapists use evidence-based techniques and engaging activities tailored to each child's unique needs."
    },
    {
      question: "Who can benefit from speech therapy?",
      answer: "Children of all ages can benefit from speech therapy, including those with articulation difficulties, language delays, stuttering, voice disorders, or social communication challenges. We also work with children who have autism, Down syndrome, or other developmental conditions affecting communication."
    },
    {
      question: "What does a typical speech therapy session look like?",
      answer: "Sessions are individualized and fun! Our therapists use play-based activities, games, and interactive exercises to work on specific goals. Sessions typically last 30-60 minutes and may include articulation practice, language building activities, and social communication exercises."
    },
    {
      question: "How long will my child need speech therapy?",
      answer: "The duration varies based on each child's needs and goals. Some children may need a few months of therapy, while others benefit from longer-term support. We regularly assess progress and adjust treatment plans to ensure your child is making meaningful gains."
    },
    {
      question: "What areas does speech therapy address?",
      answer: "Our speech therapy services address: articulation and pronunciation, expressive and receptive language, vocabulary development, grammar and sentence structure, social communication skills, stuttering and fluency, voice quality, and feeding/swallowing difficulties."
    },
    {
      question: "How can I support my child's progress at home?",
      answer: "We provide families with strategies and activities to practice at home. This includes modeling correct speech sounds, reading together, playing language-rich games, and creating opportunities for communication throughout daily routines. We believe family involvement is key to success!"
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes! We accept most major insurance plans including Medicaid. Our team will work with you to verify coverage and handle billing. Contact us to learn more about your specific insurance benefits."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Contact us to schedule an initial evaluation. During this assessment, we'll identify your child's strengths and areas for growth, then create a personalized treatment plan. We'll work closely with you every step of the way."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <Section>
          <Title>Speech Therapy Services</Title>
          
          <TextContent>
            <Description>
              Our speech therapy services focus on improving communication skills and language
              development for children of all ages. We create individualized treatment plans
              that address each child's specific needs and goals.
            </Description>
            <Description>
              Using evidence-based techniques and engaging activities, our speech therapists
              work to enhance articulation, language comprehension, and social communication
              skills. We make therapy fun and rewarding for children.
            </Description>
            <Description>
              We believe in collaborating closely with families, providing strategies and
              support for practicing communication skills at home. Our goal is to help
              children become confident and effective communicators.
            </Description>
          </TextContent>

          <Features>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeatureTitle>{feature.title}</FeatureTitle>
                <Description>{feature.description}</Description>
              </FeatureCard>
            ))}
          </Features>

          <FAQTitle>Frequently Asked Questions</FAQTitle>

          <FAQContainer>
            {faqs.map((faq, index) => (
              <FAQItem key={index} isOpen={openFAQ === index}>
                <FAQQuestion
                  onClick={() => toggleFAQ(index)}
                  isOpen={openFAQ === index}
                >
                  {faq.question}
                </FAQQuestion>
                <FAQAnswer
                  isOpen={openFAQ === index}
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>

          <ButtonContainer>
            <Button to="/contact">
              Schedule a Session
            </Button>
            <Button to="/what-to-expect" secondary>
              Learn More
            </Button>
          </ButtonContainer>
        </Section>
      </ContentWrapper>
    </PageContainer>
  );
};

export default SpeechTherapy;