

  const themeColors = {
  'paintBlue': 'blue-600',
  'woodBrown': 'yellow-800',
  'cementGrey': 'gray-600'
};

document.querySelectorAll('.theme-preview-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-theme');
    const color = themeColors[selected];

    // Update text color
    document.querySelectorAll('.theme-text').forEach(el => {
      el.className = el.className.replace(/text-\w+-\d+/g, '').trim();
      el.classList.add(`text-${color}`);
    });

    // Update badge bg & text color
    document.querySelectorAll('.theme-badge').forEach(el => {
      el.className = el.className.replace(/bg-\w+\/\d+/g, '')
                                 .replace(/text-\w+-\d+/g, '')
                                 .trim();
      el.classList.add(`bg-${color.replace(/\d+$/, '')}/10`);
      el.classList.add(`text-${color}`);
    });

    // ✅ Update border color for image or others
    document.querySelectorAll('.theme-border').forEach(el => {
      el.className = el.className.replace(/border-\w+-\d+/g, '').trim();
      el.classList.add(`border-${color}`);
    });
  });
});




  // Add this if not present
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = Math.ceil(target / 100); // adjust speed

    if (current < target) {
      counter.innerText = current + increment;
      counter.style.opacity = "1"; // ✅ FORCE VISIBLE
      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = target;
      counter.style.opacity = "1"; // ✅ just to be sure
    }
  };

  updateCounter();
});

        // Gridlabs Studio - Interactive JavaScript (FINAL FIXED VERSION)
// Premium Business Portfolio Website

// ===========================================
// INITIALIZATION & GLOBAL VARIABLES
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Gridlabs Studio website...');
    
    // Initialize all components with error handling
    try {
        initializeThemeSystem();
        console.log('✅ Theme system initialized');
        
        initializeNavigation();
        console.log('✅ Navigation initialized');
        
        initializeCTAButtons();
        console.log('✅ CTA buttons initialized');
        
        initializeAnimations();
        console.log('✅ Animations initialized');
        
        initializeCounters();
        console.log('✅ Counters initialized');
        
        initializeSliders();
        console.log('✅ Sliders initialized');
        
        initializeCarousels();
        console.log('✅ Carousels initialized');
        
        initializeModals();
        console.log('✅ Modals initialized');
        
        initializeForms();
        console.log('✅ Forms initialized');
        
        initializeFloatingActions();
        console.log('✅ Floating actions initialized');
        
        initializeBusinessStatus();
        console.log('✅ Business status initialized');
        
        initializeMiscFeatures();
        console.log('✅ Misc features initialized');
        
        console.log('🎉 Gridlabs Studio website fully initialized!');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
});

// Global variables
let currentTheme = 'paintBlue';
let isScrolling = false;
let animationObserver = null;
let businessHours = {
    open: 9,  // 9 AM
    close: 18 // 6 PM
};

// ===========================================
// THEME SYSTEM
// ===========================================

function initializeThemeSystem() {
    const themeButtons = document.querySelectorAll('.theme-btn, .theme-preview-btn');
    const savedTheme = localStorage.getItem('gridlabs-theme') || 'paintBlue';
    
    // Apply saved theme
    applyTheme(savedTheme);
    
    // Theme button event listeners
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.dataset.theme;
            if (theme) {
                applyTheme(theme);
                localStorage.setItem('gridlabs-theme', theme);
                
                // Animate theme change
                document.body.style.transition = 'all 0.5s ease-out';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 500);
            }
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-color-scheme', 'dark');
        updateDarkModeIcon(true);
    }
    
    darkModeToggle?.addEventListener('click', function() {
        const currentScheme = document.documentElement.getAttribute('data-color-scheme');
        const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newScheme);
        localStorage.setItem('darkMode', newScheme === 'dark');
        updateDarkModeIcon(newScheme === 'dark');
        
        // Animate toggle
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

function applyTheme(themeName) {
    const themes = {
        paintBlue: { primary: '#2563eb', secondary: '#1e40af', accent: '#60a5fa' },
        woodBrown: { primary: '#92400e', secondary: '#78350f', accent: '#d97706' },
        cementGrey: { primary: '#6b7280', secondary: '#4b5563', accent: '#9ca3af' }
    };
    
    const theme = themes[themeName];
    if (!theme) return;
    
    // Update CSS custom properties
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
    document.documentElement.style.setProperty('--theme-accent', theme.accent);
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Update active states
    document.querySelectorAll('.theme-btn, .theme-preview-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
    
    currentTheme = themeName;
    
    // Trigger theme change event
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));
}

function updateDarkModeIcon(isDark) {
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
    if (isDark) {
        darkIcon?.classList.remove('hidden');
        lightIcon?.classList.add('hidden');
    } else {
        darkIcon?.classList.add('hidden');
        lightIcon?.classList.remove('hidden');
    }
}

// ===========================================
// CTA BUTTONS INITIALIZATION (FIXED)
// ===========================================

function initializeCTAButtons() {
    console.log('🔧 Initializing CTA buttons...');
    
    // Wait for DOM to be fully ready
    setTimeout(() => {
        const startJourneyBtn = document.querySelector('.hero-ctas .btn-primary');
        const viewWorkBtn = document.querySelector('.hero-ctas .btn-secondary');
        
        console.log('Start Journey Button:', startJourneyBtn);
        console.log('View Work Button:', viewWorkBtn);
        
        // Start Your Journey button - scroll to contact form
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🎯 Start Journey clicked - scrolling to contact');
                
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = contactSection.offsetTop - headerHeight - 20;
                    smoothScrollTo(targetPosition, 800);
                } else {
                    console.error('❌ Contact section not found');
                }
            });
            console.log('✅ Start Journey button event attached');
        } else {
            console.error('❌ Start Journey button not found');
        }
        
        // View Our Work button - scroll to portfolio
        if (viewWorkBtn) {
            viewWorkBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🎯 View Work clicked - scrolling to portfolio');
                
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                    const targetPosition = portfolioSection.offsetTop - headerHeight - 20;
                    smoothScrollTo(targetPosition, 800);
                } else {
                    console.error('❌ Portfolio section not found');
                }
            });
            console.log('✅ View Work button event attached');
        } else {
            console.error('❌ View Work button not found');
        }
    }, 100);
}

// ===========================================
// NAVIGATION & HEADER
// ===========================================

function initializeNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll-triggered header effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        header?.classList.toggle('scrolled', currentScrollY > 50);
        
        // Hide/show header on scroll
        if (header && currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else if (header) {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 100));
    
    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            this.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        } else {
            mobileMenu.classList.remove('hidden');
            this.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        }
        
        // Animate menu
        if (!isOpen) {
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                mobileMenu.style.transition = 'all 0.3s ease-out';
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                smoothScrollTo(targetPosition, 800);
                
                // Close mobile menu if open
                mobileMenu?.classList.add('hidden');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
                }
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator?.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const headerHeight = header?.offsetHeight || 80;
            const targetPosition = aboutSection.offsetTop - headerHeight - 20;
            smoothScrollTo(targetPosition, 800);
        }
    });
}

// ===========================================
// SCROLL ANIMATIONS & INTERSECTION OBSERVER
// ===========================================

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Add the fade-in animation class
                el.classList.add('animated');

                // Counter
                if (el.classList.contains('counter')) {
                    animateCounter(el);
                }

                // Process step entry animation
                if (el.classList.contains('process-step')) {
                    animateProcessStep(el);
                }

                observer.unobserve(el); // Animate only once
            }
        });
    }, observerOptions);

    // Target animated elements
    const animateElements = document.querySelectorAll(`
        .service-card,
        .portfolio-item,
        .testimonial-card,
        .process-step,
        .about-content,
        .about-image-container
    `);

    animateElements.forEach((el) => {
        el.classList.add('fade-in'); // Initial state for animation
        animationObserver.observe(el);
    });

    // Hero section manual fade-in
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-ctas, .hindi-quote');
        heroElements.forEach((el, index) => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = `opacity 0.6s ease ${index * 200}ms, transform 0.6s ease ${index * 200}ms`;
        });
    }, 300);
}

function animateProcessStep(stepEl) {
    const number = stepEl.querySelector('.process-step-number');
    if (number) {
        number.style.transform = 'translateY(-50%) scale(1.1)';
        number.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            number.style.transform = 'translateY(-50%) scale(1)';
        }, 600);
    }
}


// ===========================================
// COUNTER ANIMATIONS
// ===========================================

function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        counter.style.opacity = '0';
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
        
        counter.textContent = currentValue + (counter.textContent.includes('+') ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
        }
    }
    
    counter.style.opacity = '1';
    requestAnimationFrame(updateCounter);
}

// ===========================================
// SLIDERS & INTERACTIVE ELEMENTS (FIXED)
// ===========================================

function initializeSliders() {
  const sliders = document.querySelectorAll('.before-after-container');

  sliders.forEach((sliderContainer) => {
    const handle = sliderContainer.querySelector('.slider-handle');
    const afterImage = sliderContainer.querySelector('.after-layer');

    if (!handle || !afterImage) return;

    let isDragging = false;
    let currentX = 50;

    updateSlider(currentX);

    function updateSlider(percentage) {
      afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
      handle.style.left = `${percentage}%`;
    }

    function startDrag(e) {
      isDragging = true;
      document.body.style.userSelect = 'none';
      handle.style.cursor = 'grabbing';
      handle.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }

    function drag(e) {
      if (!isDragging) return;

      const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      const rect = sliderContainer.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      currentX = percentage;
      updateSlider(currentX);
    }

    function stopDrag() {
      isDragging = false;
      document.body.style.userSelect = '';
      handle.style.cursor = 'grab';
      handle.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    handle.addEventListener('touchstart', startDrag, { passive: true });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);

    // Optional demo animation
    setTimeout(() => {
      if (!isDragging) {
        let demoStep = 0;
        const demoInterval = setInterval(() => {
          if (isDragging) {
            clearInterval(demoInterval);
            return;
          }

          demoStep++;
          const demoPercentage = 50 + Math.sin(demoStep * 0.2) * 25;
          updateSlider(demoPercentage);

          if (demoStep > 30) {
            clearInterval(demoInterval);
            updateSlider(50);
          }
        }, 150);
      }
    }, 3000);
  });
}



// ===========================================
// CAROUSELS
// ===========================================


  const slider = document.querySelector('.testimonial-container');
  const cards = document.querySelectorAll('.testimonial-card');
  const next = document.querySelector('.testimonial-next');
  const prev = document.querySelector('.testimonial-prev');
  const dotsContainer = document.querySelector('.testimonial-dots');

  let index = 0;
  const totalCards = cards.length;
  let maxIndex = 0;
  let autoSlideInterval;
  let visibleCards = getVisibleCardCount();

  function getVisibleCardCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function updateSlider() {
    visibleCards = getVisibleCardCount();
    const cardWidth = cards[0].offsetWidth + 21;
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
    maxIndex = totalCards - visibleCards;
    updateDots();
  }

  function nextSlide() {
    index = (index + 1) > maxIndex ? 0 : index + 1;
    updateSlider();
  }

  function prevSlide() {
    index = (index - 1) < 0 ? maxIndex : index - 1;
    updateSlider();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 2000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  next.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prev.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  // Hover Pause
  slider.parentElement.addEventListener("mouseenter", stopAutoSlide);
  slider.parentElement.addEventListener("mouseleave", startAutoSlide);

  // Recalculate on Resize
  window.addEventListener("resize", () => {
    updateSlider();
    generateDots();
  });

  // ==================
  // 👆 SWIPE SUPPORT
  // ==================
  let startX = 0;

  slider.addEventListener('touchstart', (e) => {
    stopAutoSlide();
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    startAutoSlide();
  });

  // ==========================
  // 🔘 DOTS GENERATION
  // ==========================
  function generateDots() {
    dotsContainer.innerHTML = '';
    const dotCount = totalCards - visibleCards + 1;

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'w-3 h-3 rounded-full bg-[var(--theme-accent)] opacity-70 transition-all';
      dot.addEventListener('click', () => {
        index = i;
        updateSlider();
        stopAutoSlide();
        startAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }

    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('div');
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('bg-primary', 'opacity-100', 'scale-150');
      } else {
        dot.classList.remove('bg-primary', 'opacity-100', 'scale-150');
      }
    });
  }

  // ===================
  // 🚀 INIT
  // ===================
  generateDots();
  updateSlider();
  startAutoSlide();


// ===========================================
// MODALS & LIGHTBOXES (FIXED)
// ===========================================

function initializeModals() {
    console.log('🔧 Initializing modals...');
    
    setTimeout(() => {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const modal = document.getElementById('portfolioModal');
        const closeBtn = document.getElementById('closeModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');
        
        console.log('Portfolio items found:', portfolioItems.length);
        console.log('Modal element:', modal);
        
        // Portfolio data
        const portfolioData = {
            0: {
                title: 'Sharma Paint House',
                category: 'Paint Retail Store',
                description: 'Complete digital transformation for a local paint retail business including website design, inventory management system, and digital marketing campaign.',
                features: ['Responsive Website Design', 'Color Picker Tool', 'Online Paint Calculator', 'Customer Gallery', 'WhatsApp Integration'],
                results: ['300% increase in online orders', '150% growth in customer base', '40% improvement in customer satisfaction'],
                timeline: '6 weeks',
                technologies: 'HTML5, CSS3, JavaScript, PHP, MySQL'
            },
            1: {
                title: 'Kumar Hardware Store',
                category: 'Hardware Business', 
                description: 'Modern e-commerce solution for hardware and tools business with inventory tracking and customer management.',
                features: ['E-commerce Platform', 'Inventory Management', 'Customer Portal', 'Mobile App', 'Payment Gateway'],
                results: ['250% increase in sales', '60% reduction in manual work', '200% growth in repeat customers'],
                timeline: '8 weeks',
                technologies: 'React, Node.js, MongoDB, Stripe API'
            },
            2: {
                title: 'Priya Textiles',
                category: 'Textile Business',
                description: 'Brand identity and website for traditional textile business with modern digital presence.',
                features: ['Brand Identity Design', 'Fabric Catalog', 'Custom Order System', 'Virtual Showroom', 'Social Media Integration'],
                results: ['400% increase in brand visibility', '180% growth in custom orders', '90% customer retention rate'],
                timeline: '10 weeks',
                technologies: 'Vue.js, Laravel, PostgreSQL, AWS'
            }
        };
        
        // Add click handlers to portfolio items
        portfolioItems.forEach((item, index) => {
            // Remove existing listeners
            const newItem = item.cloneNode(true);
            item.parentNode.replaceChild(newItem, item);
            
            newItem.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🎯 Portfolio item clicked:', index);
                const data = portfolioData[index];
                if (data) {
                    showPortfolioModal(data);
                } else {
                    console.error('❌ No data for portfolio item:', index);
                }
            });
            
            // Make sure it's clickable
            newItem.style.cursor = 'pointer';
            console.log('✅ Event attached to portfolio item:', index);
        });
        
        function showPortfolioModal(data) {
            console.log('📱 Opening modal for:', data.title);
            
            if (!modal || !modalTitle || !modalContent) {
                console.error('❌ Modal elements not found');
                return;
            }
            
            modalTitle.textContent = data.title;
            modalContent.innerHTML = `
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <div class="bg-gradient-to-br from-blue-500 to-blue-700 h-64 rounded-lg flex items-center justify-center text-white text-6xl mb-6">
                            🎨
                        </div>
                        <h4 class="text-lg font-bold mb-2">Project Overview</h4>
                        <p class="text-text-secondary mb-4">${data.description}</p>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <strong>Timeline:</strong> ${data.timeline}
                            </div>
                            <div>
                                <strong>Category:</strong> ${data.category}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Key Features</h4>
                        <ul class="space-y-2 mb-6">
                            ${data.features.map(feature => `<li class="flex items-center space-x-2"><span class="text-green-500">✓</span><span>${feature}</span></li>`).join('')}
                        </ul>
                        <h4 class="text-lg font-bold mb-4">Results Achieved</h4>
                        <ul class="space-y-2 mb-6">
                            ${data.results.map(result => `<li class="flex items-center space-x-2"><span class="text-primary">📊</span><span>${result}</span></li>`).join('')}
                        </ul>
                        <p class="text-sm text-text-secondary"><strong>Technologies:</strong> ${data.technologies}</p>
                    </div>
                </div>
            `;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            modal.focus();
            console.log('✅ Modal opened successfully');
        }
        
        function closeModal() {
            console.log('❌ Closing modal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }
        
        closeBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
        
        console.log('✅ Portfolio modals initialized successfully');
    }, 1000);
}

// ===========================================
// FORMS & VALIDATION (FIXED)
// ===========================================

function initializeForms() {
    console.log('🔧 Initializing forms...');
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    console.log('Contact form:', contactForm);
    console.log('Success message:', successMessage);
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📝 Form submitted');
        
        const formData = new FormData(this);
        const data = {
            name: formData.get('name')?.trim() || '',
            email: formData.get('email')?.trim() || '', 
            message: formData.get('message')?.trim() || ''
        };
        
        console.log('Form data:', data);
        
        // Clear previous errors
        clearAllFieldErrors();
        
        // Validate form
        if (validateForm(data)) {
            submitForm(data, this, successMessage);
        } else {
            console.log('❌ Form validation failed');
        }
    });
    
    // Real-time validation
    const inputs = contactForm?.querySelectorAll('input, textarea');
    inputs?.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    console.log('✅ Forms initialized');
}

function validateForm(data) {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Name validation
    const nameInput = form?.querySelector('[name="name"]');
    if (!data.name || data.name.length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    } else {
        clearFieldError(nameInput);
    }
    
    // Email validation
    const emailInput = form?.querySelector('[name="email"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailPattern.test(data.email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError(emailInput);
    }
    
    // Message validation
    const messageInput = form?.querySelector('[name="message"]');
    if (!data.message || data.message.length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearFieldError(messageInput);
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch (field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters long');
                return false;
            }
            break;
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters long');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    if (!field) return;
    
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode?.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode?.appendChild(errorDiv);
}

function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error');
    const errorMessage = field.parentNode?.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearAllFieldErrors() {
    const form = document.getElementById('contactForm');
    const errorMessages = form?.querySelectorAll('.error-message');
    const errorFields = form?.querySelectorAll('.error');
    
    errorMessages?.forEach(msg => msg.remove());
    errorFields?.forEach(field => field.classList.remove('error'));
}

function submitForm(data, form, successMessage) {
    console.log('📤 Submitting form...');
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton?.textContent || 'Send Message';
    
    if (!submitButton || !successMessage) {
        console.error('❌ Submit button or success message not found');
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        console.log('✅ Form submission complete');
        
        // Show success message
        successMessage.classList.remove('hidden');
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            successMessage.style.transition = 'all 0.3s ease-out';
            successMessage.style.opacity = '1';
            successMessage.style.transform = 'translateY(0)';
        });
        
        // Reset form
        form.reset();
        clearAllFieldErrors();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 300);
        }, 5000);
        
        console.log('Form submitted successfully:', data);
    }, 2000);
}

// ===========================================
// FLOATING ACTION BUTTONS (FIXED)
// ===========================================

  const toggleBtn = document.getElementById("toggleWhatsapp");
  const dropdown = document.getElementById("whatsappOptions");

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("hidden");
  });

  // Close dropdown on outside click
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const callButton = document.querySelector(".sticky-cta");

    if (!callButton) {
      console.warn("📞 Sticky CTA button not found!");
      return;
    }

    callButton.addEventListener("click", () => {
      console.log("📞 Call Now button clicked!");

      // Add a small animation effect
      callButton.style.transform = 'scale(0.95)';
      setTimeout(() => {
        callButton.style.transform = 'scale(1)';
      }, 120);

      // OPTIONAL: Initiate a call (mobile only)
      window.location.href = "tel:+919409509069";
    });
  });



function initializeVCardDownload() {
    const vCardBtn = document.getElementById('downloadVCard');
    
    vCardBtn?.addEventListener('click', function() {
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Gridlabs Studio
ORG:Gridlabs Studio
TITLE:Digital Agency
TEL:+91-9876543210
EMAIL:hello@gridlabsstudio.com
URL:https://gridlabsstudio.com
ADR:;;MG Road;Bangalore;Karnataka;560001;India
NOTE:Premium web design and digital marketing agency serving small and medium businesses across India
END:VCARD`;
        
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gridlabs-studio.vcf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // Show feedback
        const originalText = this.textContent;
        this.textContent = '✅ Contact Saved!';
        this.style.background = '#10b981';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
}

// ===========================================
// BUSINESS STATUS & REAL-TIME FEATURES
// ===========================================

function initializeBusinessStatus() {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const currentTimeElement = document.getElementById('currentTime');
    
    function updateBusinessStatus() {
        const now = new Date();
        const hours = now.getHours();
        const timeString = now.toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        });
        
        if (currentTimeElement) {
            currentTimeElement.textContent = timeString;
        }
        
        const isOpen = hours >= businessHours.open && hours < businessHours.close;
        
        if (statusIndicator && statusText) {
            if (isOpen) {
                statusIndicator.className = 'w-3 h-3 rounded-full bg-green-500';
                statusText.textContent = `Open - Delivering until ${businessHours.close === 18 ? '6PM' : businessHours.close + 'PM'}`;
            } else {
                statusIndicator.className = 'w-3 h-3 rounded-full bg-red-500';
                const openTime = businessHours.open === 9 ? '9AM' : businessHours.open + 'AM';
                const openTomorrow = hours >= businessHours.close;
                statusText.textContent = `Closed - Opens ${openTomorrow ? 'tomorrow' : 'today'} at ${openTime}`;
            }
        }
    }
    
    // Update immediately and then every minute
    updateBusinessStatus();
    setInterval(updateBusinessStatus, 60000);
}

// ===========================================
// MISCELLANEOUS FEATURES
// ===========================================

function initializeMiscFeatures() {
    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }, 16));
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.6s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // Initialize store tour interaction
    const storeTourBtn = document.querySelector('.store-tour-container button');
    storeTourBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate 360° tour start
        const container = this.closest('.store-tour-container');
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-black/80 flex items-center justify-center text-white z-10 rounded-2xl';
        overlay.innerHTML = `
            <div class="text-center">
                <div class="text-4xl mb-4 animate-spin">🌐</div>
                <h3 class="text-xl font-bold mb-2">Loading Virtual Tour...</h3>
                <p class="text-gray-300">Experience our workspace in 360°</p>
            </div>
        `;
        
        container.appendChild(overlay);
        
        setTimeout(() => {
            overlay.innerHTML = `
                <div class="text-center">
                    <div class="text-4xl mb-4">🏢</div>
                    <h3 class="text-xl font-bold mb-4">Virtual Tour Active</h3>
                    <p class="text-gray-300 mb-4">Use navigation controls to explore</p>
                    <button class="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-100 close-tour-btn">
                        Close Tour
                    </button>
                </div>
            `;
            
            // Add close functionality
            const closeBtn = overlay.querySelector('.close-tour-btn');
            closeBtn.addEventListener('click', function() {
                overlay.remove();
            });
        }, 3000);
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Throttle function for performance optimization
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll function
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-in-out)
        const ease = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('💥 JavaScript Error:', e.error);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyTheme,
        validateForm,
        smoothScrollTo,
        throttle,
        debounce
    };
}
