import ProfileImage from '../../assets/images/DP.jpeg'
import './index.scss'

const CV = () => {
  return (
    <main className="cv-page">
      <section className="cv-paper">
        <header className="cv-header">
          <img src={ProfileImage} alt="Clemon Balasuriya" className="cv-photo" />
          <div>
            <h1>Clemon Balasuriya</h1>
            <p className="cv-role">Software Developer | Data Science | AI Enthusiast</p>
            <p>Wadduwa, Sri Lanka</p>
            <p>Email: clemon.balasuriya@gmail.com</p>
            <p>LinkedIn: www.linkedin.com/in/clemon-balasuriya-05518b256</p>
            <p>GitHub: github.com/ClemonBalasuriya</p>
          </div>
        </header>

        <section className="cv-section">
          <h2>Professional Summary</h2>
          <p>
            Undergraduate software engineering student with strong interest in
            data science and AI. Experienced in building practical software
            systems, machine learning projects, and full-stack applications.
            Looking for internship opportunities where I can deliver reliable,
            data-driven solutions.
          </p>
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          <div className="cv-item">
            <h3>BEng (Hons) Software Engineering</h3>
            <p>University of Westminster (IIT Sri Lanka)</p>
          </div>
          <div className="cv-item">
            <h3>GCE Advanced Level</h3>
            <p>Taxila Central College, Horana</p>
          </div>
        </section>

        <section className="cv-section">
          <h2>Core Skills</h2>
          <ul>
            <li>Software Engineering: Java, Spring Boot, JavaScript, React, Node.js</li>
            <li>Data Science and AI: Python, Scikit-learn, model development</li>
            <li>Databases and Tools: MySQL, PostgreSQL, Firebase, Git, MATLAB</li>
          </ul>
        </section>

        <section className="cv-section">
          <h2>Selected Projects</h2>
          <ul>
            <li>SmartReshore AI: AI-powered supply chain risk intelligence platform</li>
            <li>Breast Cancer Prediction System: ML model for outcome prediction</li>
            <li>Real-Time Ticket Booking System: Concurrent producer-consumer architecture</li>
            <li>WeatherDashboard iOS App: Travel and weather intelligence solution</li>
          </ul>
        </section>
      </section>

      <div className="cv-actions no-print">
        <button type="button" onClick={() => window.print()}>
          Download CV as PDF
        </button>
      </div>
    </main>
  )
}

export default CV
