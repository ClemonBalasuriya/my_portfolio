import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../../firebase';
import WeatherDashboardImage from '../../assets/images/projects/weather-dashboard.svg';
import SmartReshoreImage from '../../assets/images/projects/smart-reshore-ai.svg';
import TicketBookingImage from '../../assets/images/projects/ticket-booking.svg';
import BreastCancerImage from '../../assets/images/projects/breast-cancer-ml.svg';
import GoalProgrammingImage from '../../assets/images/projects/goal-programming.svg';

const fallbackProjects = [
    {
        name: 'WeatherDashboard - Travel + Weather Intelligence App',
        description: 'SwiftUI, SwiftData, MapKit, OpenWeather API',
        summary: 'A travel and weather intelligence app for smarter trip planning.',
        url: 'https://github.com/ClemonBalasuriya/WeatherDashboard-iOS-app.git',
        image: WeatherDashboardImage,
    },
    {
        name: 'SmartReshore AI (ChainPulse)',
        description: 'Next.js, React, Node.js, Express, TypeScript, FastAPI, PostgreSQL',
        summary: 'A SaaS platform delivering AI-powered supply chain risk intelligence.',
        url: 'https://github.com/sakithajayasinghe/SDGP-2025.git',
        image: SmartReshoreImage,
    },
    {
        name: 'Real-Time Ticket Booking System',
        description: 'Java, Spring Boot, Angular, MySQL',
        summary: 'A producer-consumer based concurrent ticket management system.',
        url: 'https://github.com/ClemonBalasuriya/Ticket-Booking-System.git',
        image: TicketBookingImage,
    },
    {
        name: 'Breast Cancer Prediction System',
        description: 'Python, Scikit-learn',
        summary: 'ML model for mortality and survival time prediction.',
        url: '',
        image: BreastCancerImage,
    },
    {
        name: 'Goal Programming Optimization Model',
        description: 'MATLAB',
        summary: 'Optimization model for production planning using goal programming.',
        url: '',
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

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                src={port.image}
                                className="portfolio-image"
                                alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.name}</p>
                                    <h4 className="description">{port.description}</h4>
                                    {port.summary && <p className="summary">{port.summary}</p>}
                                    <button
                                        className="btn"
                                        onClick={() => port.url && window.open(port.url, '_blank')}
                                        disabled={!port.url}
                                    >{port.url ? 'View' : 'Coming Soon'}</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
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
                    <p style={{ color: '#fff' }}>
                        Showing local sample projects. Add REACT_APP_FIREBASE_* values in .env to load projects from Firebase.
                    </p>
                )}
                <div>{renderPortfolio(portfolio)}</div>
            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;