import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngular,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { faBrain, faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import ProfileImage from '../../assets/images/DP.jpeg'
import BalasuriyaGroupLogo from '../../assets/images/BalasuriyaGroupLogo.png'
import IITLogo from '../../assets/images/IITlogo.jpg'
import WestminsterLogo from '../../assets/images/Westminsterlogo.jpg'
import RuhunaLogo from '../../assets/images/Ruhunalogo.jpg'
import MSCLogo from '../../assets/images/MSClogo.jpg'
import './index.scss'

const About = ({ embedded = false }) => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const techStack = [
    'Java',
    'Python',
    'TypeScript',
    'Next.js',
    'Angular',
    'React',
    'Spring Boot',
    'MySQL',
    'Machine Learning',
    'Firebase',
    'AutoCAD',
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const aboutContent = (
    <div className="text-zone bento-grid">
      <h1 className="about-title">
        <AnimatedLetters
          letterClass={letterClass}
          strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
          idx={15}
        />
      </h1>

      <div
        className="stage-cube-cont"
        aria-hidden="true"
        style={{ position: 'absolute', top: '28px', right: '28px' }}
      >
        <div className="cubespinner">
          <div className="face1">
            <FontAwesomeIcon icon={faAngular} color="#DD0031" />
          </div>
          <div className="face2">
            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
          </div>
          <div className="face3">
            <FontAwesomeIcon icon={faPython} color="#28A4D9" />
          </div>
          <div className="face4">
            <FontAwesomeIcon icon={faDatabase} color="#C4B5FD" />
          </div>
          <div className="face5">
            <FontAwesomeIcon icon={faChartLine} color="#22D3EE" />
          </div>
          <div className="face6">
            <FontAwesomeIcon icon={faBrain} color="#F472B6" />
          </div>
        </div>
      </div>

      <section className="bento-card hero-card">
        <div className="hero-copy">
          <p className="hero-kicker">Software + Data + AI</p>
          <p className="full-name">Clemon Balasuriya</p>
          <p className="hook">
            Undergraduate in Software Engineering and Financial Mathematics
            & Statistics, focused on software development, data science,
            AI, and practical real-world systems.
          </p>
        </div>
        <img
          className="about-profile-image"
          src={ProfileImage}
          alt="Clemon Balasuriya"
        />
      </section>

      <section className="bento-card story-card">
        <h2>My focus</h2>
        <p>
          I combine development skills with analytical and statistical
          thinking. I work with Java, Spring Boot, Angular, MySQL, Python,
          and machine learning workflows to build reliable systems.
        </p>
        <p>
          I am passionate about solving practical business and financial
          problems through intelligent systems and scalable products.
        </p>
      </section>

      <section className="bento-card stats-card">
        <h2>Snapshot</h2>
        <div className="stats-grid">
          <div>
            <span className="stat-value">2</span>
            <span className="stat-label">Degrees</span>
          </div>
          <div>
            <span className="stat-value">10+</span>
            <span className="stat-label">Core skills</span>
          </div>
          <div>
            <span className="stat-value">1</span>
            <span className="stat-label">Company founded</span>
          </div>
        </div>
      </section>

      <section className="bento-card education-card-block">
        <h2>Education</h2>
        <div className="education-row">
          <div className="degree-card">
            <h3>BEng (Hons) Software Engineering</h3>
            <p>IIT Sri Lanka affiliated with University of Westminster</p>
            <div className="logo-row">
              <img src={IITLogo} alt="IIT Sri Lanka logo" />
              <img src={WestminsterLogo} alt="University of Westminster logo" />
            </div>
          </div>
          <div className="degree-card">
            <h3>BSc Financial Mathematics and Statistics</h3>
            <p>University of Ruhuna, Sri Lanka</p>
            <div className="logo-row single">
              <img src={RuhunaLogo} alt="University of Ruhuna logo" />
            </div>
          </div>
          <div className="degree-card">
            <h3>School Education</h3>
            <p>Maris Stella College, Negombo</p>
            <div className="logo-row single">
              <img src={MSCLogo} alt="Maris Stella College logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="bento-card stack-card">
        <h2>Tech Stack</h2>
        <div className="chip-wrap">
          {techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      <section className="bento-card company-card">
        <img
          src={BalasuriyaGroupLogo}
          alt="Balasuriya Groups logo"
          className="company-logo"
        />
        <div>
          <h2>Founder: Balasuriya Groups Pvt</h2>
          <p>
            Building Balasuriya Groups Pvt as a future-ready business with a
            strong digital foundation and long-term growth vision.
          </p>
          <a
            href="https://example.com/balasuriya-groups"
            target="_blank"
            rel="noreferrer"
          >
            Visit company website
          </a>
        </div>
      </section>
    </div>
  )

  if (embedded) {
    return <section className="about-page about-embedded">{aboutContent}</section>
  }

  return (
    <>
      <div className="container about-page">{aboutContent}</div>
      <Loader type="pacman" />
    </>
  )
}

export default About
