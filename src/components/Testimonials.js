import React, { useState } from 'react';
import "../styles/Testimonials.css"

const testimonialsData = [
  {
    name: 'Sophia Carter',
    role: 'Financial Analyst',
    testimonial: 'Joining MarketMasterBroker was a transformative decision for my investment strategy. The AI-driven insights have allowed me to make more informed choices, and the consistent returns have exceeded my expectations. Highly recommended for anyone serious about trading!',
  },
  {
    name: 'Liam Thompson',
    role: 'Day Trader',
    testimonial: "The intuitive platform and automated features of MarketMasterBroker have revolutionized my trading experience. I've been able to optimize my trades and diversify my portfolio like never before. The support team is responsive and always ready to help. 🌟",
  },
  {
    name: 'Emma Johnson',
    role: 'Crypto Enthusiast',
    testimonial: 'MarketMasterBroker has made my journey into cryptocurrency investing smooth and profitable. The platform’s real-time analytics and automated trading strategies give me the confidence to navigate the volatile market with ease. I am grateful for the transparency and continuous support.',
  },
  {
    name: 'James Smith',
    role: 'Wealth Manager',
    testimonial: 'As a wealth manager, I need a reliable partner for my clients’ investments. MarketMasterBroker’s innovative technology and strategic insights have empowered me to offer personalized investment solutions. My clients are happier than ever with the results we’re achieving!',
  },
  {
    name: 'Isabella Garcia',
    role: 'Retired Investor',
    testimonial: 'After retiring, I was looking for a way to manage my investments passively. MarketMasterBroker’s automated trading system has allowed me to enjoy my retirement while still growing my wealth. It’s been a game-changer for my financial peace of mind.',
  },
  {
    name: 'Oliver Wilson',
    role: 'Forex Trader',
    testimonial: 'Trading forex can be daunting, but MarketMasterBroker has simplified the process. The advanced algorithms provide precise market analysis, helping me make smarter trades. My confidence has soared, and I’ve seen remarkable growth in my investments!',
  },
  {
    name: 'Ava Martinez',
    role: 'Investment Blogger',
    testimonial: 'I love sharing my investment journey with my readers, and MarketMasterBroker has been a key part of that. The platform\'s ease of use and cutting-edge features make it perfect for both beginners and seasoned traders. I can’t recommend it enough!',
  },
  {
    name: 'Mason Brown',
    role: 'Real Estate Investor',
    testimonial: 'I initially used MarketMasterBroker to explore stock trading, but I’ve since found incredible opportunities to invest in real estate through their platform. The detailed reports and analytics have made it easier to assess potential investments. A truly versatile tool!',
  },
  {
    name: 'Charlotte Lee',
    role: 'Small Business Owner',
    testimonial: 'As a small business owner, I needed a way to grow my capital without dedicating too much time to trading. MarketMasterBroker’s automated features have allowed me to invest wisely while focusing on my business. The returns have been impressive!',
  },
  {
    name: 'Ethan Taylor',
    role: 'Student Investor',
    testimonial: 'As a college student, I wanted to start investing but didn’t know where to begin. MarketMasterBroker’s educational resources and user-friendly platform made it easy for me to learn and grow my portfolio. It’s the perfect starting point for new investors!',
  },
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="testimonials-container">
      <div className="testimonial-card">
        <h3>{testimonialsData[currentIndex].name}</h3>
        <p className="role">{testimonialsData[currentIndex].role}</p>
        <p className="testimonial">
          &ldquo;{testimonialsData[currentIndex].testimonial}&rdquo;
        </p>
      </div>
      <div className="navigation-buttons">
        <button onClick={prevTestimonial}>&larr;</button>
        <button onClick={nextTestimonial}>&rarr;</button>
      </div>
    </div>
  );
};

export default Testimonials;
