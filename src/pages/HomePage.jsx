import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "./homePage.css";

function HomePage() {
  const [displayText, setDisplayText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["you.", "happy staff.", "happy customers."];
  const typingSpeed = 150;
  const pauseBetweenWords = 2000;

  useEffect(() => {
    const handleTyping = () => {
      if (!isErasing && charIndex < words[wordIndex].length) {
        setDisplayText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (!isErasing && charIndex === words[wordIndex].length) {
        setTimeout(() => setIsErasing(true), pauseBetweenWords);
      } else if (isErasing && charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (isErasing && charIndex === 0) {
        setIsErasing(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isErasing ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isErasing, wordIndex]);

  return (
    <MainLayout>
      <div className="container-main">
        <div className="bg-black p-5 m-5 rounded-3">
          <p className="pos-desc-1">
            Built for cafes.{" "}
            Built for <p className="pos-desc-1" id="typing-text">{displayText}</p>
          </p>
          <br/>
          <div className="start-btn">
            <Link to="/pos" className="btn fadeInUp animated animatedFadeInUp">
              <h2>Get Started</h2>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
