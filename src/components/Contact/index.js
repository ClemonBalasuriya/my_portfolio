import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const emailJsServiceId = 'gmail'
  const emailJsTemplateId = 'template_YeJhZkgb'
  const emailJsPublicKey = 'your-token'

  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    if (emailJsPublicKey === 'your-token') {
      const subject = encodeURIComponent(form.current.subject.value)
      const message = encodeURIComponent(form.current.message.value)
      window.location.href = `mailto:avishkaclemon@gmail.com?subject=${subject}&body=${message}`
      return
    }

    emailjs
      .sendForm(emailJsServiceId, emailJsTemplateId, form.current, emailJsPublicKey)
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am currently open to internship and collaboration opportunities in
            software engineering, data science, and AI-focused projects. If you
            have opportunities or questions, feel free to contact me using this
            form.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div className="info-map">
          Clemon Balasuriya,
          <br />
          Sri Lanka,
          <br />
          University of Westminster via IIT <br />
          &amp; University of Ruhuna <br />
          <br />
          <span>avishkaclemon@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[6.9271, 79.8612]} zoom={11}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[6.9271, 79.8612]}>
              <Popup>Based in Sri Lanka. Lets build something impactful.</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
