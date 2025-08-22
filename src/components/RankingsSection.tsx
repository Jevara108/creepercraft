/**
 * Rankings Section Component
 * 
 * Interactive leaderboard system displaying player, guild, and kill rankings.
 * Features tabbed interface, podium display, and server join integration.
 * 
 * Key Features:
 * - Three ranking categories: Players, Guilds, and Kills
 * - Top 3 podium display with special styling
 * - Extended leaderboard showing positions 4-20
 * - Interactive server join CTA with IP copy functionality
 * - Responsive design for all screen sizes
 * - Real-time ranking data display
 * - Minecraft avatar integration
 * 
 * Ranking Categories:
 * - Player Ranking: Individual player levels and experience
 * - Guild Ranking: Guild points and team achievements
 * - Kill Ranking: PvP kills and combat statistics
 * 
 * Display Features:
 * - Podium layout for top 3 positions
 * - Crown icon for first place winner
 * - Color-coded position indicators
 * - Avatar images from mc-heads.net service
 * - Animated hover effects and transitions
 * 
 * @component
 * @author CreeperCraft Development Team
 * @version 2.0.0 - Enhanced responsive design and accessibility
 */


// ==================== INTERFACES ====================

/**
 * Rankings Section Props Interface
 * 
 * Props passed to the RankingsSection component for state management.
 * 
 * @interface RankingsSectionProps
 * @property {string} activeTab - Currently active ranking tab
 * @property {function} setActiveTab - Function to change active tab
 */

/**
 * Tab Configuration Interface
 * 
 * Defines the structure for ranking tab configuration.
 * 
 * @interface TabConfig
 * @property {string} id - Tab identifier
 * @property {string} label - Display label for the tab
 * @property {string} dataLabel - Label for the data being displayed
 */


// ==================== CONSTANTS ====================

/**
 * Tab Configuration Array
 * 
 * Defines all available ranking tabs with their properties.
 * 
 * @constant {TabConfig[]} tabConfigs
 */


/**
 * Position Colors Configuration
 * 
 * Defines colors for different ranking positions.
 * 
 * @constant {Object} positionColors
 */


// ==================== COMPONENT ====================

/**
 * Rankings Section Component
 * 
 * Main component that renders the complete rankings interface with tabs,
 * podium, leaderboard, and server join functionality.
 * 
 * @param {RankingsSectionProps} props - Component props
 * @returns {JSX.Element} Rankings section JSX
 */
  // ==================== STATE MANAGEMENT ====================
  
  /**
   * Server IP copy state
   * @type {boolean} copied - Whether the server IP was recently copied
   */

  // ==================== COMPUTED VALUES ====================
  
  /**
   * Get Current Rankings Data
   * 
   * Returns the appropriate rankings data based on the active tab.
   * 
   * @returns {Player[]} Current rankings array
   */


  /**
   * Get Tab Label
   * 
   * Returns the appropriate data label for the current tab.
   * 
   * @returns {string} Current tab data label
   */


  // ==================== EVENT HANDLERS ====================
  
  /**
   * Copy Server IP to Clipboard
   * 
   * Copies the server IP address to the user's clipboard and shows
   * a temporary success message.
   */

  // ==================== RENDER HELPERS ====================
  
  /**
   * Render Tab Button
   * 
   * Renders a single tab button with proper styling and accessibility.
   * 
   * @param {TabConfig} tabConfig - Tab configuration object
   * @returns {JSX.Element} Tab button JSX
   */

  /**
   * Render Podium Position
   * 
   * Renders a single podium position with player information.
   * 
   * @param {Player} player - Player data
   * @param {number} position - Position number (1, 2, or 3)
   * @param {string} orderClass - CSS class for responsive ordering
   * @returns {JSX.Element} Podium position JSX
   */

  /**
   * Render Leaderboard Entry
   * 
   * Renders a single leaderboard entry for positions 4-20.
   * 
   * @param {Player} player - Player data
   * @param {number} index - Array index for React key
   * @returns {JSX.Element} Leaderboard entry JSX
   */

  // ==================== RENDER ====================
  
  const currentRankings = getCurrentRankings();
  
  return (
    <section id="ranking" className="py-16 sm:py-20 bg-gradient-to-b from-primary-dark to-secondary-dark relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white tracking-wider uppercase">
            RANKINGS
          </h2>
          <div className="w-16 h-1 bg-grass-green mx-auto mb-4"></div>
          <p className="text-lg text-light-gray uppercase tracking-wide">
            UNFORGETTABLE ADVENTURES
          </p>
        </div>

        {/* Ranking Tabs */}
        <div className="tabs flex justify-center mb-12">
          <div className="glass rounded-lg p-1 flex flex-wrap gap-1">
            {tabConfigs.map(renderTabButton)}
          </div>
        </div>

        {/* Top 3 Players Podium */}
        <div className="top-3-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {/* Fixed ordering: 1st, 2nd, 3rd on mobile; 2nd, 1st, 3rd on desktop */}
          {renderPodiumPosition(currentRankings[0], 1, 'order-1 md:order-2')}
          {renderPodiumPosition(currentRankings[1], 2, 'order-2 md:order-1')}
          {renderPodiumPosition(currentRankings[2], 3, 'order-3 md:order-3')}
        </div>

        {/* Extended Leaderboard - Top 20 + Join CTA */}
        <div className="list-entries grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {currentRankings.slice(3, 20).map(renderLeaderboardEntry)}
          
          {/* Join Server CTA positioned right after #20 */}
          <div className="entry glass p-4 bg-gradient-to-r from-grass-green/10 to-green-600/10 border-2 border-grass-green/30 hover:border-grass-green/50 transition-all duration-300 hover:scale-105 cursor-pointer group relative overflow-hidden">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-grass-green/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            
            {/* Floating particles */}
            <div className="absolute w-1 h-1 bg-grass-green/40 rounded-full animate-float-slow" style={{ top: '20%', left: '15%' }} />
            <div className="absolute w-1 h-1 bg-green-400/60 rounded-full animate-float-medium" style={{ top: '60%', right: '20%' }} />
            
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-grass-green rounded-full border border-grass-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <Users className="w-5 h-5 text-primary-dark" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white group-hover:text-grass-green transition-colors duration-300">
                    JOIN OUR SERVER NOW
                  </div>
                  <div className="text-sm text-light-gray">
                    premium.mightymc.club
                  </div>
                </div>
              </div>
              
              {/* Copy IP Button - Right aligned */}
              <div className="flex-shrink-0 ml-4">
                <button 
                  onClick={copyServerIP}
                  className={`btn text-xs px-3 py-1.5 group-hover:scale-105 transition-all duration-300 flex items-center space-x-1 ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'btn-green'
                  }`}
                  aria-label={copied ? 'Server IP copied to clipboard' : 'Copy server IP to clipboard'}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <span>COPY IP</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
