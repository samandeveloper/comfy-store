import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components' 
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='about'/>
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nick desk" />
        <article>
          <div className="title">
            <h2>our story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Meh street art plaid roof party bicycle rights. Craft beer adaptogen
            raclette pitchfork, iceland bushwick viral 3 wolf moon offal quinoa
            edison bulb small batch banh mi ugh. Shoreditch trust fund
            skateboard, direct trade fingerstache vaporware semiotics mixtape
            pour-over yr. Dreamcatcher cloud bread helvetica chambray, bicycle
            rights tilde tacos microdosing. Woke meh poke franzen, cold-pressed
            sus 3 wolf moon lumbersexual health goth selfies hot chicken.
            Portland tacos jawn, neutral milk hotel williamsburg vexillologist 3
            wolf moon adaptogen messenger bag art party fanny pack dreamcatcher.
          </p>
        </article>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
