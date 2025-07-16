/**
 * Main Application Component
 * 
 * This is the root component of the CreeperCraft website that orchestrates
 * all sections and manages global state for the application.
 * 
 * Features:
 * - Live player count simulation
 * - Mobile navigation state management
 * - Section tab management for rankings and shop
 * - Server IP copy functionality
 * - SEO-optimized semantic HTML structure
 * - Back to top button for better UX
 * 
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { RankingsSection } from './components/RankingsSection';
import { ServerShopSection } from './components/ServerShopSection';
import { ServerMapSection } from './components/ServerMapSection';
import { VoteSection } from './components/VoteSection';
import { BansSection } from './components/BansSection';
import { StaffSection } from './components/StaffSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BackToTopButton } from './components/BackToTopButton';

/**
 * Main App Component
 * 
 * Manages global application state and renders all page sections
 * in the correct order with proper state management and SEO structure.
 */
function App() {
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Server IP copy state
   * @type {boolean} copied - Whether the server IP was recently copied
   */
  const [copied, setCopied] = useState(false);
  
  /**
   * Live player count simulation
   * @type {number} playerCount - Current total registered players
   * @type {number} onlineCount - Current online players
   */
  const [playerCount, setPlayerCount] = useState(260);
  const [onlineCount, setOnlineCount] = useState(139);
  
  /**
   * Mobile navigation state
   * @type {boolean} isMenuOpen - Whether mobile menu is currently open
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  /**
   * Rankings section tab management
   * @type {string} activeTab - Currently active ranking tab ('players' | 'guilds' | 'kills')
   */
  const [activeTab, setActiveTab] = useState('players');
  
  /**
   * Shop section carousel management
   * @type {number} activeSlide - Currently active bundle slide index
   */
  const [activeSlide, setActiveSlide] = useState(0);

  // ==================== EFFECTS ====================
  
  /**
   * Live Player Count Simulation
   * 
   * Simulates real-time player count updates to make the site feel dynamic.
   * Updates every 5 seconds with small random variations.
   * 
   * In a real application, this would be replaced with WebSocket connections
   * or periodic API calls to get actual server statistics.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small fluctuations in player count (-1 to +1)
      setPlayerCount(prev => prev + Math.floor(Math.random() * 3) - 1);
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // ==================== EVENT HANDLERS ====================
  
  /**
   * Copy Server IP to Clipboard
   * 
   * Copies the server IP address to the user's clipboard and shows
   * a temporary success message. Uses the modern Clipboard API.
   * 
   * @function copyServerIP
   */
  const copyServerIP = () => {
    navigator.clipboard.writeText('play.creepercraft.net');
    setCopied(true);
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  // ==================== RENDER ====================
  
  return (
    <div className="min-h-screen bg-primary-dark text-white overflow-x-hidden">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-grass-green text-primary-dark px-4 py-2 rounded-lg font-bold z-50"
      >
        Skip to main content
      </a>
      
      {/* 
        Header Navigation
        Fixed header with responsive mobile menu and semantic nav element
      */}
      <header role="banner">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>
      
      {/* 
        Main Content Area
        Semantic main element containing all page sections
      */}
      <main id="main-content" role="main">
        {/* 
          Hero Section
          Main landing area with server info and social links
        */}
        <section aria-label="Welcome to CreeperCraft">
          <HeroSection 
            playerCount={playerCount}
            onlineCount={onlineCount}
            copied={copied}
            copyServerIP={copyServerIP}
          />
        </section>
        
        {/* 
          Rankings Section
          Player, guild, and kill leaderboards with tabbed interface
        */}
        <section aria-label="Server Rankings and Leaderboards">
          <RankingsSection 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </section>
        
        {/* 
          Server Shop Section
          VIP packages, bundles, and other purchasable items
        */}
        <section aria-label="Server Shop and VIP Packages">
          <ServerShopSection 
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
        </section>
        
        {/* 
          Server Map Section
          Interactive map showing different biomes and server areas
        */}
        <section aria-label="Server World Map and Biomes">
          <ServerMapSection />
        </section>
        
        {/* 
          Vote Section
          Server voting links and rewards system
        */}
        <section aria-label="Vote for Server Rewards">
          <VoteSection />
        </section>
        
        {/* 
          Bans Section
          Transparent moderation with recent bans and appeal system
        */}
        <section aria-label="Server Moderation and Bans">
          <BansSection />
        </section>
        
        {/* 
          Staff Section
          Meet the team with staff member profiles and contact info
        */}
        <section aria-label="Meet Our Staff Team">
          <StaffSection />
        </section>
        
        {/* 
          FAQ Section
          Frequently asked questions with categorized filtering
        */}
        <section aria-label="Frequently Asked Questions">
          <FAQSection />
        </section>
      </main>
      
      {/* 
        Footer
        Site links, social media, and additional server info
      */}
      <footer role="contentinfo" aria-label="Site Footer">
        <Footer playerCount={playerCount} />
      </footer>

      {/* 
        Back to Top Button
        Floating action button for smooth scrolling to top
      */}
      <BackToTopButton />
    </div>
  );
}

export default App;