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

import React, { useState } from 'react';
import { Crown, Users, Check } from 'lucide-react';
import { Player, playerRankings, guildRankings, killRankings } from '../data/rankings';
