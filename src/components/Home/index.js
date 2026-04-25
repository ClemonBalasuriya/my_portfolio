import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import ProfileSample from '../../assets/images/profile-sample.svg'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = ['C', 'l', 'e', 'm', 'o', 'n']
  const jobArray = [
    'a',
    's',
    'p',
    'i',
    'r',
    'i',
    'n',
    'g',
    ' ',
    's',
    'o',
    'f',
    't',
    'w',
    'a',
    'r',
    'e',
    ' ',
    'e',
    'n',
    'g',
    'i',
    'n',
    'e',
    'e',
    'r',
    '.',
  ]

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>
            Software Engineering and Financial Mathematics student focused on
            full-stack engineering, data science, and machine learning systems.
          </h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        <div className="profile-preview">
          <img src={ProfileSample} alt="Sample profile for Clemon Balasuriya" />
          <h3>Aspiring Software Engineer and Data Science Enthusiast</h3>
          <p>Open to software engineering and data science internships.</p>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
