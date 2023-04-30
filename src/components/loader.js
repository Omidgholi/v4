import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
  }
  .name {
    color: var(--white);
    font-size: 1.5rem;
    margin-top: 1rem;
  }
`;

const TechPlanetLoader = () => (
  <svg
    className="tech-planet-loader"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="var(--white)" strokeWidth="2" fill="none" />
    <circle
      className="planet"
      cx="50"
      cy="10"
      r="4"
      stroke="var(--white)"
      strokeWidth="1"
      fill="var(--white)"
    />
    <circle
      className="planet"
      cx="50"
      cy="90"
      r="4"
      stroke="var(--white)"
      strokeWidth="1"
      fill="var(--white)"
    />
  </svg>
);

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '.tech-planet-loader .planet',
        rotate: {
          value: '1turn',
          duration: 2000,
          easing: 'linear',
          loop: true,
        },
        delay: 300,
      })
      .add({
        targets: '.tech-planet-loader',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <TechPlanetLoader />
        <div className="name">Omid Gholizadeh</div>
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
