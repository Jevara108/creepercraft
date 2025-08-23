/**
 * Rankings Data Module
 * 
 * Contains mock data for player rankings, guild rankings, and kill rankings.
 * In a production environment, this data would be fetched from a backend API
 * or database with real-time player statistics.
 * 
 * Data Structure:
 * - Player rankings: Individual player levels and ranks
 * - Guild rankings: Guild points and team rankings  
 * - Kill rankings: PvP kill counts and combat rankings
 * 
 * @module RankingsData
 * @author CreeperCraft Development Team
 * @version 1.0.0
 */

// ==================== INTERFACES ====================

/**
 * Player Interface
 * 
 * Represents a player or guild entry in the rankings system.
 * Used for all three ranking types with different level interpretations:
 * - Players: Experience level
 * - Guilds: Guild points
 * - Kills: Total kill count
 * 
 * @interface Player
 * @property {string} name - Player or guild name
 * @property {number} level - Level/points/kills depending on ranking type
 * @property {number} rank - Current ranking position (1-based)
 * @property {string} avatar - URL to player/guild avatar image from mc-heads.net
 */
export interface Player {
  name: string;
  level: number;
  rank: number;
  avatar: string;
}

// ==================== PLAYER RANKINGS ====================

/**
 * Player Rankings Data
 * 
 * Top 20 players ranked by experience level.
 * Uses mc-heads.net service for player avatars based on usernames.
 * 
 * @constant {Player[]} playerRankings
 */
export const playerRankings: Player[]
// ==================== GUILD RANKINGS ====================

/**
 * Guild Rankings Data
 * 
 * Top 20 guilds ranked by total guild points.
 * Guild points are earned through collective member activities,
 * guild wars, and territory control.
 * 
 * @constant {Player[]} guildRankings
 */
export const guildRankings: Player[]

// ==================== KILL RANKINGS ====================

/**
 * Kill Rankings Data
 * 
 * Top 20 players ranked by total PvP kills.
 * Represents the most skilled combat players on the server.
 * Kill counts include both player vs player and boss kills.
 * 
 * @constant {Player[]} killRankings
 */
export const killRankings: Player[]
