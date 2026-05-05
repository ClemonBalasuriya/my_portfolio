import { useEffect, useMemo, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import { faFacebook, faGithub, faInstagram, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot, faPhone, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import emailjs from '@emailjs/browser'

const contactLinks = {
  email: 'avishkaclemon@gmail.com',
  phone: '0769377624',
  whatsapp: '0769377624',
  location: '54, Andiambalama',
  facebook: 'https://www.facebook.com/share/15ovJiibygD/',
  github: 'https://github.com/ClemonBalasuriya',
  instagram: 'https://www.instagram.com/clemon_balasuriya?igsh=MXRucTU5NGV2cG9tMQ==',
  linkedin: 'https://www.linkedin.com/in/clemon-balasuriya-05518b256',
}

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [formStatus, setFormStatus] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(timer)
  }, [])

  // iOS fix: prevent touchmove on document, allow only on form
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    let isInputFocused = false

    const handleInputFocus = () => {
      isInputFocused = true
    }

    const handleInputBlur = () => {
      isInputFocused = false
    }

    const preventTouchMove = (e) => {
      // If input is focused, allow touch move only if it's on the form
      if (isInputFocused) {
        if (!form.contains(e.target)) {
          e.preventDefault()
        }
      } else {
        // Block all touchmove
        e.preventDefault()
      }
    }

    const inputs = form.querySelectorAll('input, textarea')
    inputs.forEach(input => {
      input.addEventListener('focus', handleInputFocus, { passive: true })
      input.addEventListener('blur', handleInputBlur, { passive: true })
    })

    // Prevent touchmove globally but allow on form
    document.addEventListener('touchmove', preventTouchMove, { passive: false })

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleInputFocus)
        input.removeEventListener('blur', handleInputBlur)
      })
      document.removeEventListener('touchmove', preventTouchMove)
    }
  }, [])

  const whatsappLink = useMemo(
    () => `https://wa.me/${contactLinks.whatsapp.replace(/\D/g, '').replace(/^0/, '94')}`,
    []
  )

  const phoneLink = useMemo(
    () => `tel:+94${contactLinks.phone.replace(/\D/g, '').replace(/^0/, '')}`,
    []
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget

    setFormStatus('Sending message...')

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

    const isConfigured = [serviceID, templateID, publicKey].every(
      (v) => v && !v.includes('YOUR_')
    )

    if (!isConfigured) {
      // EmailJS not configured — fallback to mailto: so user can send via their email client
      const fd = new FormData(form)
      const name = String(fd.get('name') || '').trim()
      const fromEmail = String(fd.get('email') || '').trim()
      const subject = String(fd.get('subject') || 'Message from portfolio site').trim()
      const message = String(fd.get('message') || '').trim()
      const body = `From: ${name} <${fromEmail}>\n\n${message}`
      const mailto = `mailto:${contactLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

      // open user's mail client
      window.location.href = mailto
      setFormStatus('Opened your email client — please send the message to complete.')
      return
    }

    // populate hidden template fields before sending
    try {
      const fd = new FormData(form)
      const nameVal = String(fd.get('name') || '').trim()
      const emailVal = String(fd.get('email') || '').trim()
      const fromNameInput = form.querySelector('input[name="from_name"]')
      const fromEmailInput = form.querySelector('input[name="from_email"]')
      if (fromNameInput) fromNameInput.value = nameVal
      if (fromEmailInput) fromEmailInput.value = emailVal
    } catch (err) {
      console.warn('Could not populate hidden EmailJS fields', err)
    }

    emailjs
      .sendForm(serviceID, templateID, form, publicKey)
      .then(
        () => {
          const formData = new FormData(form)
          const name = String(formData.get('name') || '').trim()
          setFormStatus(name ? `Thanks ${name}! Your message was sent.` : 'Thanks! Your message was sent.')
          form.reset()
        }
      )
      .catch((error) => {
        console.error('EmailJS error:', error)
        setFormStatus('Failed to send message. Please try again later.')
      })
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactLinks.email)
      setFormStatus('Email address copied to clipboard.')
    } catch (error) {
      window.location.href = `mailto:${contactLinks.email}`
    }
  }

  return (
    <>
      <div className="container contact-page">
        <div className="contact-shell">
          <div className="contact-left">
            <div className="contact-glow" aria-hidden="true" />

            <p className="contact-eyebrow">Let&apos;s talk</p>
            <h1>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={['L', 'e', 't', '\'', 's', ' ', 'W', 'o', 'r', 'k', ' ', 'T', 'o', 'g', 'e', 't', 'h', 'e', 'r']}
                idx={15}
              />
            </h1>
            <p className="contact-intro">
              I&apos;m open to conversations around software engineering, data science,
              AI projects, and freelance work. If you have an idea or opportunity,
              send a message and I&apos;ll reply shortly.
            </p>

            <div className="availability-badge" aria-label="Available for work">
              <span className="availability-dot" aria-hidden="true" />
              Available for work
            </div>

            <div className="contact-stack" aria-label="Contact details">
              <button type="button" className="contact-pill contact-copy" onClick={copyEmail}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{contactLinks.email}</span>
              </button>

              <a className="contact-pill" href={phoneLink}>
                <FontAwesomeIcon icon={faPhone} />
                <span>{contactLinks.phone}</span>
              </a>

              <a className="contact-pill whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} />
                <span>Chat on WhatsApp</span>
              </a>

              <p className="contact-location">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{contactLinks.location}</span>
              </p>
            </div>

            <div className="social-links" aria-label="Social media links">
              <a href={contactLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="social-pill">
                <FontAwesomeIcon icon={faFacebook} />
                <span>Facebook</span>
              </a>
              <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-pill">
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
              <a href={contactLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-pill">
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
              <a href={contactLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="social-pill">
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="contact-form-panel">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
              {/* Hidden fields used for EmailJS templates */}
              <input type="hidden" name="to_email" value={contactLinks.email} />
              <input type="hidden" name="from_name" />
              <input type="hidden" name="from_email" />
              <div className="form-row">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="Your email" required />
                </label>
              </div>

              <label>
                <span>Subject</span>
                <input type="text" name="subject" placeholder="Project, collaboration, or question" required />
              </label>

              <label>
                <span>Message</span>
                <textarea name="message" placeholder="Tell me about your idea..." rows="7" required />
              </label>

              <button type="submit" className="send-button">Send message</button>

              {formStatus ? (
                <div className="form-success" role="status" aria-live="polite">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  <span>{formStatus}</span>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
