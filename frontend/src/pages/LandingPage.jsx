import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-open">Open</span>
          <span className="logo-innovate">Innovate</span>
        </div>
        <div className="header-buttons">
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            Log in
          </button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Turn your big idea into real-world <span className="highlight">Innovation</span>
          <br />
          with Right People
        </h1>
        <p className="hero-subtitle">
          Register your projects to build a perfect team or join existing to become a perfect team
        </p>
        <div className="hero-buttons">
          <button className="btn-primary-large" onClick={() => navigate('/signup')}>
            Register your project
          </button>
          <button className="btn-secondary-large" onClick={() => navigate('/signup')}>
            Join a project →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <span className="section-label">Key Features</span>
        <h2 className="section-title">Why Choose <span className="highlight-text">OpenInnovate</span>?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Find Perfect Team Members</h3>
            <p>Connect with skilled individuals who share your passion and vision</p>
          </div>
          <div className="feature-card">
            <h3>Showcase Your Skills</h3>
            <p>Join exciting projects and contribute your expertise</p>
          </div>
          <div className="feature-card">
            <h3>Collaborative Workspace</h3>
            <p>Manage projects efficiently with built-in collaboration tools</p>
          </div>
          <div className="feature-card">
            <h3>Smart Matching</h3>
            <p>AI-powered matchmaking to find the perfect fit for your project</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Reliable</h3>
            <p>Your data and projects are protected with enterprise-grade security</p>
          </div>
          <div className="feature-card">
            <h3>Community Driven</h3>
            <p>Join a thriving community of innovators and creators</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <span className="section-label">How It Works</span>
        <h2 className="section-title">Get Started In Simple Steps</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and tell us about your skills and interests</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Browse or Post Projects</h3>
            <p>Explore exciting projects or register your own idea</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Connect & Collaborate</h3>
            <p>Match with team members and start building together</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Launch Your Innovation</h3>
            <p>Complete your project and bring your idea to life</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <span className="section-label">Pricing</span>
        <h2 className="section-title">Plans for Everyone</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <p className="pricing-description">Our Basic Plan will help you to explore our website for free</p>
            <div className="price">
              <span className="amount">$100</span>
              <span className="period">/week</span>
            </div>
            <button className="btn-primary-card" onClick={() => navigate('/signup')}>
              Get Started →
            </button>
            <ul className="features-list">
              <li>• Limited to one Project.</li>
              <li>• Limited to one Project.</li>
            </ul>
          </div>
          <div className="pricing-card featured">
            <h3>Basic</h3>
            <p className="pricing-description">Perfect for growing teams and serious projects</p>
            <div className="price">
              <span className="amount">$500</span>
              <span className="period">/month</span>
            </div>
            <button className="btn-primary-card" onClick={() => navigate('/signup')}>
              Get Started →
            </button>
            <ul className="features-list">
              <li>• Up to 5 Projects</li>
              <li>• Advanced matching algorithm</li>
              <li>• Priority support</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Professional</h3>
            <p className="pricing-description">For enterprises and large-scale innovations</p>
            <div className="price">
              <span className="amount">$1500</span>
              <span className="period">/month</span>
            </div>
            <button className="btn-primary-card" onClick={() => navigate('/signup')}>
              Get Started →
            </button>
            <ul className="features-list">
              <li>• Unlimited Projects</li>
              <li>• Dedicated account manager</li>
              <li>• Custom integrations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 OpenInnovate. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
