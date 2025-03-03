document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects for team indicators
  const teamIndicators = document.querySelectorAll(".team-indicator");
  
  teamIndicators.forEach(indicator => {
    indicator.addEventListener("mouseenter", () => {
      const isBlue = indicator.classList.contains("blue");
      const connection = isBlue ? 
        document.querySelector(".blue-connection") : 
        document.querySelector(".red-connection");
      
      connection.style.opacity = "1";
      connection.style.strokeWidth = "3";
    });
    
    indicator.addEventListener("mouseleave", () => {
      const isBlue = indicator.classList.contains("blue");
      const connection = isBlue ? 
        document.querySelector(".blue-connection") : 
        document.querySelector(".red-connection");
      
      connection.style.opacity = "0.5";
      connection.style.strokeWidth = "2";
    });
  });
  
  // Add click effect for shield
  const shield = document.querySelector(".shield");
  
  shield.addEventListener("click", () => {
    shield.style.animation = "none";
    shield.offsetHeight; // Trigger reflow
    shield.style.animation = "shieldPulse 3s infinite ease-in-out";
  });
});