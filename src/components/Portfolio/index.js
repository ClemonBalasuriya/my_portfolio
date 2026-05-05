import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../firebase';
import WeatherDashboardImage from '../../assets/images/projects/weather-dashboard.jpg';
import SmartReshoreImage from '../../assets/images/projects/smart-reshore-ai.png';
import TicketBookingImage from '../../assets/images/projects/ticket-booking.jpg';
import BreastCancerImage from '../../assets/images/projects/breast-cancer-ml.png';
import GoalProgrammingImage from '../../assets/images/projects/goal-programming.jpg';

const fallbackProjects = [
    {
        name: 'WeatherDashboard - Travel + Weather Intelligence App',
        description: 'SwiftUI, SwiftData, MapKit, OpenWeather API',
        summary: 'A travel and weather intelligence app for smarter trip planning.',
        liveUrl: '',
        repoUrl: 'https://github.com/ClemonBalasuriya/WeatherDashboard-iOS-app.git',
        techStack: ['SwiftUI','SwiftData','MapKit','OpenWeather API'],
        image: WeatherDashboardImage,
    },
    {
        name: 'SmartReshore AI (ChainPulse)',
        description: 'Next.js, React, Node.js, Express, TypeScript, FastAPI, PostgreSQL',
        summary: 'A SaaS platform delivering AI-powered supply chain risk intelligence.',
        liveUrl: '',
        repoUrl: 'https://github.com/sakithajayasinghe/SDGP-2025.git',
        techStack: ['Next.js','React','Node.js','TypeScript','PostgreSQL'],
        image: SmartReshoreImage,
    },
    {
        name: 'Real-Time Ticket Booking System',
        description: 'Java, Spring Boot, Angular, MySQL',
        summary: 'A producer-consumer based concurrent ticket management system.',
        liveUrl: '',
        repoUrl: 'https://github.com/ClemonBalasuriya/Ticket-Booking-System.git',
        techStack: ['Java','Spring Boot','Angular','MySQL'],
        image: TicketBookingImage,
    },
    {
        name: 'Breast Cancer Prediction System',
        description: 'Python, Scikit-learn',
        summary: 'ML model for mortality and survival time prediction.',
        liveUrl: '',
        repoUrl: '',
        techStack: ['Python','scikit-learn','pandas'],
        image: BreastCancerImage,
    },
    {
        name: 'Goal Programming Optimization Model',
        description: 'MATLAB',
        summary: 'Optimization model for production planning using goal programming.',
        liveUrl: '',
        repoUrl: '',
        techStack: ['MATLAB','Operations Research'],
        image: GoalProgrammingImage,
    },
];

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        getPortfolio();
    }, []);

    const getPortfolio = async () => {
        if (!db) {
            setPortfolio(fallbackProjects);
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, 'portfolio'));
            const firebaseProjects = querySnapshot.docs.map((doc) => doc.data());
            setPortfolio(firebaseProjects.length ? firebaseProjects : fallbackProjects);
        } catch (error) {
            console.error(error);
            setPortfolio(fallbackProjects);
        }
    }

    const formatTechUsed = (port) => {
        const techList = port.techUsed || port.techStack || [];
        return Array.isArray(techList) ? techList.join(', ') : String(techList);
    }

    const renderPortfolio = (portfolio) => {
        if (!portfolio || !portfolio.length) return null;

        return (
            <div className="projects-grid">
                {portfolio.map((port, idx) => (
                    <article className="project-card" key={idx}>
                        <div className="image-wrapper">
                            <img src={port.image} alt={port.name} />
                            <div className="overlay">
                                <div className="links">
                                    {port.liveUrl ? <a href={port.liveUrl} target="_blank" rel="noreferrer" className="link">Live</a> : null}
                                    {port.repoUrl ? <a href={port.repoUrl} target="_blank" rel="noreferrer" className="link">Code</a> : null}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <h4 className="project-title">{port.name}</h4>
                                <p className="project-summary">{port.summary || port.description}</p>
                                <p className="project-tech">Tech used: {formatTechUsed(port)}</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        )
    }


    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                {!isFirebaseConfigured && (
                    <p className="portfolio-intro">
                        Here are some of the projects I have built and worked on.
                    </p>
                )}
                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;