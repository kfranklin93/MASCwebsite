import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import lenettaHeadshot from "../assets/lenetta-henderson-headshot.jpg";

const LeadershipSection = styled.section`
  background-color: #fff9e6;
  padding: 5rem 2rem;
  border: 20px solid rgba(255, 0, 0, 0.5);
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-family: "Bubblegum Sans";
  font-size: 2.5rem;
  color: #dc1b1b;
  text-align: center;
  margin: 0 0 2.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

/* ── Two-column hero card ── */
const HeroCard = styled.div`
  width: 100%;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
  }
`;

const HeadshotWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

const Headshot = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FounderName = styled.h3`
  font-family: "Nunito", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.2rem;
`;

const FounderRole = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #dc1b1b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 1rem;
`;

const TeaserPara = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1.05rem;
  color: #444;
  line-height: 1.8;
  margin: 0 0 1.25rem;

  @media (max-width: 480px) {
    font-size: 0.97rem;
  }
`;

const ExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #dc1b1b;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #a01010;
  }
`;

/* ── Pillar cards ── */
const PillarsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const PillarCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
`;

const PillarIcon = styled.span`
  font-size: 2.2rem;
  line-height: 1;
`;

const PillarTitle = styled.h4`
  font-family: "Nunito", sans-serif;
  font-size: 1rem;
  font-weight: 800;
  color: #dc1b1b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
`;

const PillarText = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin: 0;
`;

/* ── Expanded full story ── */
const FullStory = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;

const StorySection = styled.div`
  width: 100%;
  margin-bottom: 1.75rem;
`;

const StorySectionHeading = styled.h4`
  font-family: "Nunito", sans-serif;
  font-size: 1.05rem;
  font-weight: 800;
  color: #dc1b1b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.6rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Para = styled.p`
  font-family: "Nunito", sans-serif;
  font-size: 1.02rem;
  color: #333;
  line-height: 1.8;
  margin: 0 0 0.9rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.97rem;
    text-align: center;
  }
`;

/* ── Pullquote signature ── */
const Pullquote = styled.blockquote`
  width: 100%;
  margin: 0.5rem 0 0;
  padding: 2rem 2.5rem;
  background: #fff;
  border-radius: 16px;
  border-left: 6px solid #dc1b1b;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07);
  font-family: "Nunito", sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem;
    text-align: center;
    border-left: none;
    border-top: 6px solid #dc1b1b;
  }
`;

const PullquoteText = styled.p`
  font-size: 1.25rem;
  font-style: italic;
  color: #1a1a1a;
  line-height: 1.7;
  margin: 0 0 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PullquoteSig = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #dc1b1b;
  line-height: 1.7;
`;

const Leadership = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <LeadershipSection>
      <Inner>
        <Title>Meet Our Owner &amp; Founder</Title>

        {/* ── Hero card ── */}
        <HeroCard>
          <HeadshotWrapper>
            <Headshot
              src={lenettaHeadshot}
              alt="Ms. Lenetta Henderson, Owner & Founder"
            />
          </HeadshotWrapper>
          <HeroText>
            <FounderName>Ms. Lenetta Henderson</FounderName>
            <FounderRole>Owner &amp; Founder · Mommy Angels Specialty Care</FounderRole>
            <TeaserPara>
              For nearly 13 years, I have had the privilege of owning and
              operating Mommy Angels Daycare — watching hundreds of Angels grow,
              learn, play, and become part of our family. As I met more children
              who needed individualized support, I kept hearing the same thing
              from parents: <em>"We just need somewhere that truly gets our child."</em>{" "}
              That's where the vision for Mommy Angels Specialty Care began.
            </TeaserPara>
            <ExpandButton onClick={() => setExpanded((v) => !v)}>
              {expanded ? "Hide Full Story ↑" : "Read Ms. Henderson's Full Story →"}
            </ExpandButton>
          </HeroText>
        </HeroCard>

        {/* ── Three pillar cards ── */}
        <PillarsGrid>
          <PillarCard>
            <PillarIcon>🎨</PillarIcon>
            <PillarTitle>Therapy That Feels Like Childhood</PillarTitle>
            <PillarText>
              Color, music, art, outdoor play, and laughter — our Angels receive
              high-quality ABA without losing the joy of just being a kid.
            </PillarText>
          </PillarCard>
          <PillarCard>
            <PillarIcon>🤝</PillarIcon>
            <PillarTitle>It Takes a Team</PillarTitle>
            <PillarText>
              RBTs, BCBAs, a speech therapist, and families all work together.
              We are caring for somebody's baby — and that means everything to us.
            </PillarText>
          </PillarCard>
          <PillarCard>
            <PillarIcon>💛</PillarIcon>
            <PillarTitle>More Than an ABA Center</PillarTitle>
            <PillarText>
              We wanted families to walk through our doors and feel warmth, hope,
              and possibility — not a cold, institutional space.
            </PillarText>
          </PillarCard>
        </PillarsGrid>

        {/* ── Expandable full story ── */}
        <AnimatePresence initial={false}>
          {expanded && (
            <FullStory
              key="full-story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <StorySection>
                <Para>
                  As the years went by, I began noticing a change. I was meeting
                  more toddlers who were nonverbal, experiencing developmental
                  delays, having difficulty communicating, or displaying behaviors
                  that were challenging in a traditional childcare setting.
                </Para>
                <Para>
                  But what touched me most were the parents. I saw the worry on
                  their faces. I listened as parents wondered why their Angel
                  wasn't talking yet, worried because their child couldn't tell
                  them what they needed, and struggled to find a place that could
                  truly support their child.
                </Para>
                <Para>
                  Sometimes families had to remove their Angel from childcare
                  because their behaviors required more individual support than a
                  traditional classroom could safely provide. Childcare teachers
                  can be wonderful, loving educators, but traditional daycare
                  classrooms are simply not designed to provide the one-on-one
                  behavioral support some children need.
                </Para>
                <Para>
                  I wanted to help — but first, I had to learn. I began learning
                  about autism, ABA therapy, and the experiences families were
                  having at different therapy centers. More importantly, I listened
                  to parents. They told me what they loved, but they also told me
                  what they wished could be different. And I thought, "What if we
                  could create something different?"
                </Para>
              </StorySection>

              <StorySection>
                <StorySectionHeading>I Wanted Therapy to Still Feel Like Childhood</StorySectionHeading>
                <Para>
                  I wanted our Angels to receive high-quality ABA services without
                  losing the experiences that make childhood special — color, toys,
                  music, art, science, home living, movement, fresh air, outdoor
                  play, and laughter.
                </Para>
                <Para>
                  Instead of one large, bland environment, I envisioned individual
                  learning spaces where our kiddos could practice moving from one
                  activity and environment to another. Transitioning is an important
                  skill, especially as children prepare for school and other
                  community settings.
                </Para>
                <Para>
                  I also wanted something very special that many ABA centers simply
                  cannot offer: a connection to a real childcare environment. With
                  parent permission and appropriate enrollment, our kiddos have
                  opportunities to participate alongside their typically developing
                  peers at Mommy Angels Daycare — practicing skills like walking in
                  line, circle time, group play, communication, and sharing.
                </Para>
              </StorySection>

              <StorySection>
                <StorySectionHeading>It Takes a Team</StorySectionHeading>
                <Para>
                  At Mommy Angels Specialty Care, our RBTs, BCBAs, speech
                  therapist, leadership team, and families work together. Our
                  BCBAs bring knowledge and experience. Our RBTs work directly
                  with our kiddos every day with patience and care.
                </Para>
                <Para>
                  And everyone who joins this team understands something that is
                  extremely important to me: we are caring for somebody's baby.
                  Cleanliness, safety, communication, and parent involvement all
                  matter deeply to me. We use cameras throughout our facility,
                  communicate through our parent app, and share pictures and
                  updates throughout the day.
                </Para>
              </StorySection>

              <StorySection>
                <StorySectionHeading>More Than an ABA Center</StorySectionHeading>
                <Para>
                  Mommy Angels Specialty Care was built from listening to families.
                  It was built from years of loving children. And it was built from
                  my belief that an autism diagnosis should never mean that a child
                  stops getting to experience the joy of simply being a child.
                </Para>
                <Para>
                  Every Angel is different. Every journey is different. And we meet
                  our Angels where they are, while helping them work toward where
                  they can go.
                </Para>
              </StorySection>
            </FullStory>
          )}
        </AnimatePresence>

        {/* ── Pullquote signature ── */}
        <Pullquote>
          <PullquoteText>
            "That's the heart behind Mommy Angels Specialty Care — built from
            listening to families, from years of loving children, and from my
            belief that every Angel deserves to experience the joy of simply
            being a child."
          </PullquoteText>
          <PullquoteSig>
            With Love, Ms. Lenetta Henderson<br />
            <span style={{ fontWeight: 400, color: "#555" }}>
              Owner &amp; Founder, Mommy Angels Specialty Care
            </span>
          </PullquoteSig>
        </Pullquote>

      </Inner>
    </LeadershipSection>
  );
};

export default Leadership;
