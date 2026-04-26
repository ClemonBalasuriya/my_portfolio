import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import ProfileImage from '../../assets/images/DP.jpeg'
import CVFile from '../../assets/CV.pdf'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = ['C', 'l', 'e', 'm', 'o', 'n']

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <section className="hero-shell">
          <div className="text-zone">
            <h1>
              <span className={letterClass}>H</span>
              <span className={`${letterClass} _12`}>i,</span>
              <br />
              <span className={`${letterClass} _13`}>I</span>
              <span className={`${letterClass} _14`}>'m</span>
              {' '}
              <AnimatedLetters
                letterClass={letterClass}
                strArray={nameArray}
                idx={15}
              />
              <br />
              <span className="role-line">
                Aspiring software developer, data science learner, and AI enthusiast.
              </span>
            </h1>
            <h2>
              Building scalable software and data-driven AI solutions with practical impact.
            </h2>
            <div className="cta-row">
              <Link to="/contact" className="flat-button">
                CONTACT ME
              </Link>
              <a href={CVFile} download="Clemon-Balasuriya-CV.pdf" className="flat-button secondary-button">
                DOWNLOAD CV (PDF)
              </a>
            </div>
          </div>
          <div className="profile-preview">
            <img src={ProfileImage} alt="Clemon Balasuriya" />
            <h3>Software Developer | Data Science | AI</h3>
            <p>Open to internships in software engineering, data science, and AI.</p>
            <div className="focus-tags">
              <span>Software Dev</span>
              <span>Data Science</span>
              <span>AI / ML</span>
            </div>
          </div>
        </section>

      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
