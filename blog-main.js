// blog-main.js - Additional functionality for the MITM.life blog

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initSearch();
  initTeamToggle();
  initScrollEffects();
  initLazyLoading();
  enhanceReadability();
  initSocialSharing();
  
  // Performance optimizations
  optimizeImages();
  deferNonCriticalStyles();
  
  // Analytics setup
  setupAnalytics();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navClose = document.querySelector('.nav-close');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
  
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        e.target !== navToggle) {
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) { // Only on mobile
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Highlight current page in navigation
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || 
        (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
}

// Search functionality
function initSearch() {
  const searchTrigger = document.querySelector('.search-trigger');
  const searchClose = document.querySelector('.search-close');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input');
  const searchForm = document.querySelector('.search-form');
  
  searchTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus after transition completes
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  });
  
  searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close search on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Handle search form submission
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const query = searchInput.value.trim();
    if (query) {
      // For now, we'll just redirect to a search results page
      // In a real implementation, this would call your search API
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });
}

// Team toggle for filtering content
function initTeamToggle() {
  const teamBtns = document.querySelectorAll('.team-btn');
  const articles = document.querySelectorAll('.article-card');
  
  teamBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button styling
      teamBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const team = btn.textContent.trim().toLowerCase();
      
      // Filter articles based on team
      articles.forEach(article => {
        const tags = article.querySelectorAll('.tag');
        const hasTeamTag = Array.from(tags).some(tag => 
          tag.textContent.trim().toLowerCase() === team
        );
        
        // If "Blue Team" or "Red Team" is selected, filter accordingly
        // Otherwise show all articles
        if (team === 'blue team' || team === 'red team') {
          article.style.display = hasTeamTag ? 'block' : 'none';
          
          // Add fade effect
          if (hasTeamTag) {
            article.style.opacity = '0';
            setTimeout(() => {
              article.style.opacity = '1';
            }, 50);
          }
        } else {
          article.style.display = 'block';
          article.style.opacity = '1';
        }
      });
    });
  });
}

// Scroll effects for enhanced UX
function initScrollEffects() {
  const backToTop = document.querySelector('.back-to-top');
  const nav = document.querySelector('.nav-container');
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;
  let lastScrollY = window.scrollY;
  
  // Back to top button visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
    
    // Hide/show nav on scroll direction
    if (window.scrollY > headerHeight) {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
      }
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
  });
  
  // Smooth scroll to top
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add scroll animations for articles
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.article-card, .featured-article, .sidebar');
    
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('fade-in');
      }
    });
  };
  
  // Add the CSS class for animations
  const style = document.createElement('style');
  style.textContent = `
    .article-card, .featured-article, .sidebar {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Initial check
}

// Implement lazy loading for images
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('img');
    
    const lazyLoad = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    };
    
    const observer = new IntersectionObserver(lazyLoad, {
      rootMargin: '100px 0px'
    });
    
    lazyImages.forEach(img => {
      const src = img.getAttribute('src');
      img.setAttribute('data-src', src);
      img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
      observer.observe(img);
    });
  }
}

// Enhance readability for blog posts
function enhanceReadability() {
  // Add estimated reading time
  const articles = document.querySelectorAll('.featured-content, .article-content');
  
  articles.forEach(article => {
    const text = article.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    
    const metaElement = article.querySelector('.article-meta');
    if (metaElement) {
      const readingTimeSpan = document.createElement('span');
      readingTimeSpan.textContent = `${readingTime} min read`;
      metaElement.appendChild(readingTimeSpan);
    }
  });
  
  // Highlight code blocks for technical articles
  const codeBlocks = document.querySelectorAll('pre code');
  if (codeBlocks.length > 0) {
    // Load syntax highlighting library dynamically
    const highlightScript = document.createElement('script');
    highlightScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js';
    
    highlightScript.onload = () => {
      // Add CSS
      const highlightCSS = document.createElement('link');
      highlightCSS.rel = 'stylesheet';
      highlightCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css';
      document.head.appendChild(highlightCSS);
      
      // Initialize highlighting
      hljs.highlightAll();
    };
    
    document.head.appendChild(highlightScript);
  }
}

// Social sharing functionality
function initSocialSharing() {
  const shareIcons = document.querySelectorAll('.share-icon');
  
  shareIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      let shareUrl = '';
      
      if (icon.classList.contains('icon-twitter')) {
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      } else if (icon.classList.contains('icon-facebook')) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      } else if (icon.classList.contains('icon-linkedin')) {
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
}

// Image optimization
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add responsive sizing attributes
    if (!img.getAttribute('sizes')) {
      img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
    }
    
    // Add onerror handler
    img.onerror = function() {
      this.src = '/api/placeholder/400/300'; // Fallback image
      this.alt = 'Image could not be loaded';
    };
    
    // Add loading complete class for smooth transitions
    img.onload = function() {
      this.classList.add('loaded');
    };
  });
  
  // Add CSS for smooth image loading
  const style = document.createElement('style');
  style.textContent = `
    img {
      transition: opacity 0.3s ease;
      opacity: 0;
    }
    
    img.loaded {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

// Defer non-critical styles and scripts
function deferNonCriticalStyles() {
  // Preload important resources
  const resources = [
    { rel: 'preload', as: 'font', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Montserrat:wght@700;800&display=swap', crossorigin: true },
    { rel: 'preconnect', href: 'https://cdnjs.cloudflare.com' }
  ];
  
  resources.forEach(resource => {
    const link = document.createElement('link');
    for (const [key, value] of Object.entries(resource)) {
      link.setAttribute(key, value);
    }
    document.head.appendChild(link);
  });
}

// Analytics setup 
function setupAnalytics() {
  // Track page views
  const pageView = {
    page: window.location.pathname,
    title: document.title,
    referrer: document.referrer
  };
  
  // We'll just log for now, but this would typically send to your analytics service
  console.log('Page view:', pageView);
  
  // Track engagement events
  const trackClickEvent = (element, category) => {
    element.addEventListener('click', () => {
      const event = {
        category,
        action: 'click',
        label: element.textContent.trim() || element.getAttribute('aria-label') || 'unknown'
      };
      console.log('Event tracked:', event);
    });
  };
  
  // Track different interaction types
  const interactions = [
    { selector: '.read-more', category: 'article-interaction' },
    { selector: '.nav-link', category: 'navigation' },
    { selector: '.team-btn', category: 'filter' },
    { selector: '.share-icon', category: 'social-share' },
    { selector: '.btn-subscribe', category: 'newsletter' }
  ];
  
  interactions.forEach(interaction => {
    document.querySelectorAll(interaction.selector).forEach(element => {
      trackClickEvent(element, interaction.category);
    });
  });
}

// Handle newsletter subscriptions
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = newsletterForm.querySelector('input[type="text"]');
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      // Basic validation
      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        showFormMessage(newsletterForm, 'Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showFormMessage(newsletterForm, 'Please enter a valid email address', 'error');
        return;
      }
      
      // In a real implementation, this would send the data to your API
      // For now, we'll just simulate a successful subscription
      
      // Show loading state
      const submitBtn = newsletterForm.querySelector('.btn-subscribe');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showFormMessage(newsletterForm, 'Successfully subscribed!', 'success');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        newsletterForm.reset();
        
        // Remove success message after a delay
        setTimeout(() => {
          const message = newsletterForm.querySelector('.form-message');
          if (message) {
            message.remove();
          }
        }, 5000);
      }, 1500);
    });
  }
  
  function showFormMessage(form, message, type) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;
    
    // Add styles
    messageElement.style.padding = '0.5rem';
    messageElement.style.marginTop = '0.5rem';
    messageElement.style.borderRadius = '4px';
    messageElement.style.fontSize = '0.9rem';
    
    if (type === 'error') {
      messageElement.style.backgroundColor = 'rgba(183, 28, 28, 0.1)';
      messageElement.style.color = '#e57373';
    } else {
      messageElement.style.backgroundColor = 'rgba(46, 125, 50, 0.1)';
      messageElement.style.color = '#81c784';
    }
    
    // Add to form
    form.appendChild(messageElement);
  }
});