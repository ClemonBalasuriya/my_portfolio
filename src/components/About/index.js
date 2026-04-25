import { useEffect, useState } from 'react'
import {
  faAngular,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { faBrain, faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfileSample from '../../assets/images/profile-sample.svg'
import './index.scss'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am an undergraduate pursuing Software Engineering at the University
            of Westminster via IIT Sri Lanka and Financial Mathematics and
            Statistics at the University of Ruhuna, with a strong interest in
            data science, AI, and full-stack development.
          </p>
          <p align="LEFT">
            I combine development skills with analytical and statistical
            thinking. My stack includes Java, Spring Boot, Angular, and MySQL,
            together with Python, R, MATLAB, and Minitab for data analysis,
            modeling, and machine learning workflows.
          </p>
          <p>
            I am passionate about solving practical business and financial
            problems through intelligent systems. My goal is to bridge software
            engineering with data-driven decision-making and build scalable,
            real-world applications.
          </p>
          <p>
            Core skills: Java, Python, JavaScript, TypeScript, Angular, React,
            Spring Boot, SQL, machine learning, OOP, and multithreading.
          </p>
          <div className="education-section">
            <h2>Educational Qualifications</h2>
            <div className="education-card">
              <h3>BEng (Hons) Software Engineering</h3>
              <p>University of Westminster (via IIT Sri Lanka)</p>
            </div>
            <div className="education-card">
              <h3>BSc Financial Mathematics and Statistics</h3>
              <p>University of Ruhuna, Sri Lanka</p>
            </div>
          </div>
          <img
            className="about-profile-image"
            src={ProfileSample}
            alt="Sample profile illustration for Clemon Balasuriya"
          />
        </div>

        <div className="stage-cube-cont">
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
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
