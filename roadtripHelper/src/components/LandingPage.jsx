import React from 'react';
import './landingPage.module.css';  // Ensure you have your CSS file linked

const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <h1>Baseball-Trip Helper</h1>
        <div className="main-title">
          <h2>Simplify your road-trip planning!</h2>
        </div>
      </header>

      <section className="media">
        <h4>As Seen On:</h4>
        <p>CNN</p>
      </section>

      <section className="middle">
        <h3>How Baseball-Trip Helper works</h3>
        <p>
          Lorem Ipsum I love a parade. tihjchshfjhfkfsfsfbjkjhkjhklblbclbblkjbcbjbhbjbkjbbjbjbbjbljbj.
        </p>
      </section>

      <footer className="footer">
        <div className="data">
          <div className="cta">
            <p>Sign Up or Sign In Now!</p>
          </div>
          <nav>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://github.com">GitHub</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
