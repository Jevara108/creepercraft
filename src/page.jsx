// FILE: src/app/page.jsx
// This is your main homepage.

'use client'; // This line is important for Next.js to allow data fetching and state.

import React, { useState, useEffect } from 'react';
// Make sure the path to your HeroSection file is correct.
// If your HeroSection.jsx file is inside a 'components' folder, this path is correct.
import { HeroSection } from '../components/HeroSection'; 

// This is the main page component for your website.
export default function HomePage() {
  // --- STATE MANAGEMENT ---
  // This is where we will store the numbers for your server.
  
  // State for the Discord online count. Starts at 0.
  const [discordOnlineCount, setDiscordOnlineCount] = useState(0);
  
  // State for the Minecraft player count. We'll use a placeholder for now.
  const [playerCount, setPlayerCount] = useState(123); 
  
  // State to manage the "IP Copied!" message.
  const [copied, setCopied] = useState(false);

  // --- CONFIGURATION ---
  // Put your server details here.
  const serverIp = 'play.yourserver.com'; // Change this to your actual server IP
  const discordServerId = '956030048610160711'; // This is your Discord Server ID. It's correct.

  // --- DATA FETCHING ---
  // This `useEffect` hook runs once when the page loads. Its job is to get the online count.
  useEffect(() => {
    // This is an async function to fetch the data from Discord's API.
    const fetchDiscordOnlineCount = async () => {
      try {
        // We call the API using the server ID.
        const response = await fetch(`https://discord.com/api/guilds/${discordServerId}/widget.json` );
        
        // If the response is not good, we log an error.
        if (!response.ok) {
          throw new Error('Failed to fetch from Discord API. Is the widget enabled?');
        }
        
        // We get the JSON data from the response.
        const data = await response.json();
        
        // We find the 'presence_count' (which is the online members) and update our state.
        setDiscordOnlineCount(data.presence_count || 0);

      } catch (error) {
        // If anything goes wrong, we log the error and set the count to 0.
        console.error("Error fetching Discord data:", error);
        setDiscordOnlineCount(0);
      }
    };

    // We call the function to start the process.
    fetchDiscordOnlineCount();
    
    // TODO: In the future, you would also fetch your real Minecraft player count here.

  }, []); // The empty array [] at the end is crucial. It means "only run this once".

  // --- HELPER FUNCTIONS ---
  // This function is called when a user clicks the player count box.
  const copyServerIP = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    // Reset the "Copied!" message after 2 seconds so it doesn't stay there forever.
    setTimeout(() => setCopied(false), 2000);
  };

  // --- RENDER THE PAGE ---
  // This is what gets displayed on the screen.
  return (
    <main>
      {/* We are now using your HeroSection component. */}
      {/* We pass all the data it needs (playerCount, onlineCount, etc.) as props. */}
      <HeroSection 
        playerCount={playerCount}
        onlineCount={discordOnlineCount}
        copied={copied}
        copyServerIP={copyServerIP}
      />
    </main>
  );
}
