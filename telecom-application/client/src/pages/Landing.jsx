import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
import { useAppContext } from '../context/appContext';
import React from 'react';

function Landing() {
  const { user } = useAppContext();

  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          {/* info */}
          <div className='info'>
            <h1>
              Job <span> tracking</span> app
            </h1>
            <p>
              I am baby bushwick paleo organic williamsburg actually cornhole
              kinfolk pop-up artisan yuccie. Mumblecore tilde semiotics actually
              leggings organic. Polaroid pitchfork vegan mukbang vape
              microdosing freegan snackwave pabst ascot twee swag. Waistcoat hot
              chicken tacos fanny pack typewriter, truffaut disrupt pop-up
              taiyaki freegan knausgaard unicorn street art. Pickled portland
              Brooklyn gochujang, man bun fixie poutine hella 8-bit. Direct
              trade taiyaki la croix 3 wolf moon waistcoat salvia umami banh mi
              meggings knausgaard leggings next level poke.
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
          <img src={main} alt='job hunt' className='img main-img' />
        </div>
      </Wrapper>
    </React.Fragment>
  );
}

export default Landing;
