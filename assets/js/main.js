/**
 * Template Name: FlexBiz
 * Template URL: https://bootstrapmade.com/flexbiz-bootstrap-business-template/
 * Updated: Aug 04 2025 with Bootstrap v5.3.7
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  // DOM Elements Cache
  const elements = {
    body: document.querySelector('body'),
    header: document.querySelector('#header'),
    mobileNavToggleBtn: document.querySelector('.mobile-nav-toggle'),
    preloader: document.querySelector('#preloader'),
    scrollTop: document.querySelector('.scroll-top'),
    skillsAnimation: document.querySelectorAll('.skills-animation'),
    isotopeLayouts: document.querySelectorAll('.isotope-layout'),
    pricingContainers: document.querySelectorAll('.pricing-toggle-container'),
    faqItems: document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header'),
    navmenuLinks: document.querySelectorAll('.navmenu a')
  };

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const { body, header } = elements;
    if (!header || !header.classList.contains('scroll-up-sticky') && 
        !header.classList.contains('sticky-top') && 
        !header.classList.contains('fixed-top')) return;
    
    const shouldScroll = window.scrollY > 100;
    body.classList.toggle('scrolled', shouldScroll);
  }

  /**
   * Mobile nav toggle functionality
   */
  function mobileNavToggle() {
    const { body, mobileNavToggleBtn } = elements;
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  function initMobileNav() {
    const { mobileNavToggleBtn } = elements;
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
    }

    // Hide mobile nav on same-page/hash links
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle();
        }
      });
    });

    // Toggle mobile nav dropdowns
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentNode;
        const dropdown = parent.nextElementSibling;
        
        parent.classList.toggle('active');
        dropdown.classList.toggle('dropdown-active');
        
        // Close other dropdowns
        document.querySelectorAll('.navmenu .dropdown').forEach(otherDropdown => {
          if (otherDropdown !== parent && otherDropdown.classList.contains('active')) {
            otherDropdown.classList.remove('active');
            otherDropdown.nextElementSibling.classList.remove('dropdown-active');
          }
        });
        
        e.stopImmediatePropagation();
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navmenu')) {
        document.querySelectorAll('.navmenu .dropdown').forEach(dropdown => {
          dropdown.classList.remove('active');
          dropdown.nextElementSibling.classList.remove('dropdown-active');
        });
      }
    });
  }

  /**
   * Preloader removal
   */
  function initPreloader() {
    const { preloader } = elements;
    if (preloader) {
      window.addEventListener('load', () => {
        // Add fade-out animation
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
          preloader.remove();
        }, 500);
      });
    }
  }

  /**
   * Scroll top button functionality
   */
  function toggleScrollTop() {
    const { scrollTop } = elements;
    if (scrollTop) {
      const shouldActivate = window.scrollY > 100;
      scrollTop.classList.toggle('active', shouldActivate);
    }
  }

  function initScrollTop() {
    const { scrollTop } = elements;
    if (scrollTop) {
      scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('load', toggleScrollTop);
      document.addEventListener('scroll', toggleScrollTop);
    }
  }

  /**
   * Animation on scroll initialization
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
      });
    }
  }

  /**
   * Initialize GLightbox
   */
  function initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ 
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    }
  }

  /**
   * Initialize Pure Counter
   */
  function initPureCounter() {
    if (typeof PureCounter !== 'undefined') {
      new PureCounter({
        duration: 2,
        delay: 10
      });
    }
  }

  /**
   * Animate skills items on reveal
   */
  function initSkillsAnimation() {
    const { skillsAnimation } = elements;
    if (typeof Waypoint !== 'undefined' && skillsAnimation.length) {
      skillsAnimation.forEach((item) => {
        new Waypoint({
          element: item,
          offset: '80%',
          handler: function() {
            const progress = item.querySelectorAll('.progress .progress-bar');
            progress.forEach(el => {
              el.style.width = `${el.getAttribute('aria-valuenow')}%`;
              el.style.transition = 'width 1.5s ease-in-out';
            });
          }
        });
      });
    }
  }

  /**
   * Initialize isotope layout and filters
   */
  function initIsotope() {
    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      elements.isotopeLayouts.forEach(function(isotopeItem) {
        const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
        const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
        const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort,
            transitionDuration: '0.6s'
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
            this.classList.add('filter-active');
            initIsotope.arrange({ filter: this.getAttribute('data-filter') });
            
            if (typeof aosInit === 'function') {
              aosInit();
            }
          });
        });
      });
    }
  }

  /**
   * Initialize swiper sliders
   */
  function initSwiperWithCustomPagination(swiperElement, config) {
    const swiper = new Swiper(swiperElement, config);
    
    // Add custom pagination if needed
    if (swiperElement.classList.contains("swiper-tab")) {
      const paginationContainer = swiperElement.querySelector('.swiper-pagination');
      if (paginationContainer) {
        // Custom pagination logic here
      }
    }
    
    return swiper;
  }

  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        const configElement = swiperElement.querySelector(".swiper-config");
        if (!configElement) return;
        
        try {
          const config = JSON.parse(configElement.innerHTML.trim());
          
          if (swiperElement.classList.contains("swiper-tab")) {
            initSwiperWithCustomPagination(swiperElement, config);
          } else {
            new Swiper(swiperElement, config);
          }
        } catch (error) {
          console.error('Error parsing Swiper config:', error);
        }
      });
    }
  }

  /**
   * Pricing toggle functionality
   */
  function initPricingToggle() {
    elements.pricingContainers.forEach(function(container) {
      const pricingSwitch = container.querySelector('.pricing-toggle input[type="checkbox"]');
      const monthlyText = container.querySelector('.monthly');
      const yearlyText = container.querySelector('.yearly');

      if (pricingSwitch && monthlyText && yearlyText) {
        pricingSwitch.addEventListener('change', function() {
          const pricingItems = container.querySelectorAll('.pricing-item');
          const isChecked = this.checked;

          monthlyText.classList.toggle('active', !isChecked);
          yearlyText.classList.toggle('active', isChecked);
          
          pricingItems.forEach(item => {
            item.classList.toggle('yearly-active', isChecked);
          });
        });
      }
    });
  }

  /**
   * FAQ toggle functionality
   */
  function initFaqToggle() {
    elements.faqItems.forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });
  }

  /**
   * Correct scrolling position for hash links
   */
  function initHashScroll() {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMarginTop = getComputedStyle(targetSection).scrollMarginTop;
          const headerHeight = elements.header ? elements.header.offsetHeight : 0;
          const targetPosition = targetSection.offsetTop - parseInt(scrollMarginTop) - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }

  /**
   * Navmenu Scrollspy
   */
  function navmenuScrollspy() {
    const scrollPos = window.scrollY + 100;
    
    elements.navmenuLinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
        // Remove active class from all links
        elements.navmenuLinks.forEach(link => link.classList.remove('active'));
        // Add active class to current link
        navmenulink.classList.add('active');
      }
    });
  }

  /**
   * Initialize all event listeners
   */
  function initEventListeners() {
    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);
    window.addEventListener('load', aosInit);
    window.addEventListener('load', initSwiper);
    window.addEventListener('load', initHashScroll);
    window.addEventListener('load', navmenuScrollspy);
    document.addEventListener('scroll', navmenuScrollspy);
    
    // Handle resize events
    window.addEventListener('resize', function() {
      // Reinitialize AOS on resize
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  }

  // Initialize all components
  function initAll() {
    initMobileNav();
    initPreloader();
    initScrollTop();
    initGLightbox();
    initPureCounter();
    initSkillsAnimation();
    initIsotope();
    initPricingToggle();
    initFaqToggle();
    initEventListeners();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();

// Project list functionality
document.addEventListener('DOMContentLoaded', function() {
  const projects = [
    { url: "https://madhyapradeshdmc.com", name: "Madhya Pradesh DMC", desc: "Destination management" },
    { url: "https://hotelinandaman.com", name: "Hotel In Andaman", desc: "Hotels and resorts" },
    { url: "https://andaman.vacations", name: "Andaman Vacations", desc: "Holiday packages" },
    { url: "https://questguideindia.com", name: "Quest Guide India", desc: "Tourism & destinations" },
    { url: "https://mpdmc.com", name: "MP DMC", desc: "Travel services" },
    { url: "https://andamandmc.com", name: "Andaman DMC", desc: "Tours & travel" },
    { url: "https://andamantravelagent.com", name: "Andaman Travel Agent", desc: "Travel agency website" },
    { url: "https://tscbarcodeprinters.com", name: "TSC Barcode Printers", desc: "Barcode solutions" },
    { url: "https://markaa.in", name: "Markaa", desc: "Barcode services" }
  ];

  const section = document.getElementById("project-section");
  if (!section) return;

  function createProjectCard(project, index) {
    const card = document.createElement("a");
    card.href = project.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className = `project-card ${index === 0 ? 'active' : ''}`;
    
    const favicon = `https://www.google.com/s2/favicons?domain=${project.url}&sz=64`;
    card.style.setProperty(
      "--optionBackground",
      "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 100%)"
    );

    card.innerHTML = `
      <div class="project-shadow"></div>
      <div class="project-label">
        <div class="project-icon">
          <img src="${favicon}" alt="favicon" loading="lazy">
        </div>
        <div class="project-info">
          <div class="project-main">${project.name}</div>
          <div class="project-sub">${project.desc}</div>
        </div>
      </div>
    `;

    card.dataset.preview = `https://image.thum.io/get/width/800/crop/800/noanimate/${project.url}`;
    return card;
  }

  function setActiveCard(cards, index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    const activeCard = cards[index];
    if (activeCard && !activeCard.dataset.loaded) {
      // Create image preloader
      const img = new Image();
      img.onload = function() {
        activeCard.style.setProperty("--optionBackground", `url(${activeCard.dataset.preview})`);
        activeCard.dataset.loaded = "true";
      };
      img.src = activeCard.dataset.preview;
    }

    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest"
      });
    }
  }

  // Create and append project cards
  projects.forEach((project, index) => {
    section.appendChild(createProjectCard(project, index));
  });

  const cards = section.querySelectorAll(".project-card");
  let currentIndex = 0;

  cards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      if (!card.classList.contains("active")) {
        e.preventDefault(); 
        currentIndex = index;
        setActiveCard(cards, currentIndex);
        
        setTimeout(() => {
          window.open(card.href, '_blank');
        }, 300);
      }
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      currentIndex = Math.max(0, currentIndex - 1);
      setActiveCard(cards, currentIndex);
    } else if (e.key === 'ArrowRight') {
      currentIndex = Math.min(cards.length - 1, currentIndex + 1);
      setActiveCard(cards, currentIndex);
    }
  });
});

// Skills dynamic content
document.addEventListener('DOMContentLoaded', function () {
  const skills = [
    {
      title: "UI / UX in Code",
      value: 88,
      description: "Building clean, intuitive interfaces directly in HTML, CSS, and JavaScript without design tools."
    },
    {
      title: "Front-End Development",
      value: 90,
      description: "Developing responsive, maintainable websites using modern HTML, CSS, JavaScript, and frameworks."
    },
    {
      title: "Web Animations",
      value: 82,
      description: "Creating smooth, performance-friendly animations using CSS and JavaScript to improve user interaction."
    },
    {
      title: "SEO & Analytics",
      value: 85,
      description: "Implementing on-page SEO, structured markup, and analytics tracking directly into the codebase."
    },
    {
      title: "Performance Optimization",
      value: 89,
      description: "Optimizing load speed, layout stability, and runtime performance for real-world usage."
    },
    {
      title: "Client Collaboration",
      value: 92,
      description: "Clear communication, feedback-driven changes, and practical solutions delivered through code."
    }
  ];

  const skillsContainer = document.getElementById("skills-container");
  if (!skillsContainer) return;

  function createSkillItem(skill) {
    const skillItem = document.createElement("div");
    skillItem.className = "skill-item";
    skillItem.innerHTML = `
      <div class="skill-header">
        <h4>${skill.title}</h4>
        <span class="skill-value">${skill.value}%</span>
      </div>
      <div class="skill-bar progress">
        <div class="progress-bar"
             role="progressbar"
             aria-valuenow="${skill.value}"
             aria-valuemin="0"
             aria-valuemax="100"
             style="width: 0%">
        </div>
      </div>
      <p>${skill.description}</p>
    `;
    return skillItem;
  }

  skills.forEach(skill => {
    skillsContainer.appendChild(createSkillItem(skill));
  });
});


// Clients section
document.addEventListener('DOMContentLoaded', function() {
  const projects = [
    { 
        url: "https://madhyapradeshdmc.com", 
        name: "Madhya Pradesh DMC", 
        desc: "Destination management",
        image: "images/project-banner/mp.png"
    },
    { 
        url: "https://mpdmc.com", 
        name: "MP DMC", 
        desc: "Destination management", 
        image: "images/project-banner/mpdmc.png"
    },
    { 
        url: "https://hotelinandaman.com", 
        name: "Hotel In Andaman", 
        desc: "Hotels and resorts",
        image: "images/project-banner/hia.png"
    },
    { 
        url: "https://andamandmc.com", 
        name: "Andaman DMC", 
        desc: "Destination Management Company",
        image: "images/project-banner/andaman-dmc.png"
    },
    {
        url: "https://andamantravelagent.com", 
        name: "Andaman Travel Agent", 
        desc: "Travel services for Andaman Islands",
        image: "images/project-banner/andaman-travel-agent.png"
    },
    { 
        url: "https://andaman.vacations", 
        name: "Andaman Vacations", 
        desc: "Holiday packages",
        image: "images/project-banner/av.png"
    },
    { 
        url: "https://questguideindia.com", 
        name: "Quest Guide India", 
        desc: "Tourism & destinations",
        image: "images/project-banner/qg.png"
    },
    { 
        url: "https://markaa.in", 
        name: "Markaa", 
        desc: "E-commerce solutions",
        image: "images/project-banner/markaa.png"
    },
    { 
        url: "https://tscbarcodeprinters.com", 
        name: "TSC Barcode Printers", 
        desc: "Barcode solutions",
        image: "images/project-banner/tsc.png"
    },
    { 
        url: "https://exploreandaman.co.in/crm.html", 
        name: "Explore Andaman CRM", 
        desc: "CRM solutions for Andaman", 
        image: "images/project-banner/crm.png" 
    }
  ];

  const optionsContainer = document.getElementById('psweb-project-options-container');
  if (!optionsContainer) return;

  function createProjectOption(project, index) {
    const option = document.createElement('div');
    option.className = `psweb-project-option ${index === 0 ? 'active' : ''}`;
    option.style.setProperty('--optionBackground', `url('${project.image}')`);

    const targetName = project.name.replace(/\s+/g, '_').toLowerCase();

    option.innerHTML = `
      <div class="psweb-project-shadow"></div>
      <div class="psweb-project-label">
          <div class="psweb-project-icon">
              <img src="https://www.google.com/s2/favicons?domain=${project.url}&sz=32" 
                   alt="favicon" class="psweb-project-favicon" loading="lazy">
          </div>
          <div class="psweb-project-info">
              <div class="psweb-project-main">
                  <a href="${project.url}" target="${targetName}" 
                     class="psweb-project-name-link" rel="noopener noreferrer">
                      ${project.name}
                  </a>
              </div>
              <div class="psweb-project-sub">${project.desc}</div>
          </div>
      </div>
    `;
    return option;
  }

  // Create option elements
  projects.forEach((project, index) => {
    optionsContainer.appendChild(createProjectOption(project, index));
  });

  const options = document.querySelectorAll('.psweb-project-option');
  let isAnimating = false;

  options.forEach(option => {
    option.addEventListener('click', function(e) {
      if (isAnimating || e.target.classList.contains('psweb-project-name-link')) return;
      isAnimating = true;

      options.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');

      setTimeout(() => isAnimating = false, 800);
    });
  });
});

// FAQ section
document.addEventListener('DOMContentLoaded', function () {
  const faqData = [
    {
      heading: "Web Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop",
      faqs: [
        {
          q: "What technologies do you use?",
          a: "We build websites using HTML, CSS, JavaScript, Bootstrap, Tailwind, and modern frontend techniques."
        },
        {
          q: "Do you provide backend development?",
          a: "Yes, backend integration is available based on project scope and requirements."
        },
        {
          q: "Can you redesign an existing website?",
          a: "Yes. We rebuild layouts, improve performance, and modernize UI while keeping things practical and fast."
        },
        {
          q: "Are your websites responsive?",
          a: "Absolutely. Every website is mobile-first and tested across devices."
        },
        {
          q: "How long does development usually take?",
          a: "Most projects are completed within 2 to 5 weeks depending on complexity."
        }
      ]
    },

    {
      heading: "UI Design & Implementation",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop",
      faqs: [
        {
          q: "Do you use Figma?",
          a: "No. We don’t rely on Figma for UI design."
        },
        {
          q: "What design tools do you use?",
          a: "We use Canva for visual references, layout direction, and branding elements."
        },
        {
          q: "How is the final UI created?",
          a: "The actual design is built directly in code using HTML, CSS, and JavaScript for accuracy and performance."
        },
        {
          q: "Can you follow a design reference?",
          a: "Yes. We can adapt Canva designs, screenshots, or sample websites into clean, functional code."
        },
        {
          q: "Why design directly in code?",
          a: "It avoids design-to-development gaps and ensures what you see is exactly what gets delivered."
        }
      ]
    },

    {
      heading: "SEO & Performance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      faqs: [
        {
          q: "Do you provide SEO services?",
          a: "Yes. We handle on-page SEO, performance optimization, and clean HTML structure."
        },
        {
          q: "Will my website load fast?",
          a: "Speed is a priority. We optimize images, code, and layouts for fast loading."
        },
        {
          q: "Do you integrate analytics?",
          a: "Yes, Google Analytics and basic tracking can be added."
        },
        {
          q: "Can you improve existing SEO issues?",
          a: "Yes. We fix technical issues that hurt rankings and usability."
        },
        {
          q: "Is SEO included by default?",
          a: "Basic SEO best practices are included in every project."
        }
      ]
    },

    {
      heading: "Maintenance & Support",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop",
      faqs: [
        {
          q: "Do you provide post-launch support?",
          a: "Yes. We offer ongoing support after the website goes live."
        },
        {
          q: "Can you fix bugs or issues later?",
          a: "Yes. Bug fixes and improvements are handled efficiently."
        },
        {
          q: "Do you offer maintenance plans?",
          a: "Yes, both short-term and long-term support plans are available."
        },
        {
          q: "Can features be added later?",
          a: "Yes. Websites are built to scale as your business grows."
        },
        {
          q: "Is security handled?",
          a: "We follow standard security and performance best practices."
        }
      ]
    },

    {
      heading: "Pricing & Consultation",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
      faqs: [
        {
          q: "Do you offer a free consultation?",
          a: "Yes. Initial discussion and project evaluation are completely free."
        },
        {
          q: "How is pricing calculated?",
          a: "Pricing depends on features, pages, integrations, and timelines."
        },
        {
          q: "Are there hidden charges?",
          a: "No. Everything is discussed and finalized upfront."
        },
        {
          q: "Can I get a custom quote?",
          a: "Yes. Every project is quoted based on actual requirements."
        },
        {
          q: "Is payment flexible?",
          a: "Yes. Payment structure is discussed before starting."
        }
      ]
    }
  ];

  const headingsContainer = document.getElementById("faqHeadings");
  const contentContainer = document.getElementById("faqContent");
  if (!headingsContainer || !contentContainer) return;

  function createFaqGroup(item, index) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "faq-group";
    if (index === 0) groupDiv.classList.add("active");

    groupDiv.innerHTML = `
      <h3>${item.heading}</h3>
      <img src="${item.image}" alt="${item.heading}" class="faq-image" loading="lazy">
      ${item.faqs.map(faq => `
        <div class="faq-item">
          <strong>${faq.q}</strong>
          <p>${faq.a}</p>
        </div>
      `).join("")}
    `;
    return groupDiv;
  }

  function createFaqHeading(item, index) {
    const li = document.createElement("li");
    li.textContent = item.heading;
    if (index === 0) li.classList.add("active");
    li.dataset.index = index;
    return li;
  }

  faqData.forEach((item, index) => {
    headingsContainer.appendChild(createFaqHeading(item, index));
    contentContainer.appendChild(createFaqGroup(item, index));
  });

  document.querySelectorAll("#faqHeadings li").forEach(item => {
    item.addEventListener("click", () => {
      const idx = item.dataset.index;
      document.querySelectorAll("#faqHeadings li").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".faq-group").forEach(g => g.classList.remove("active"));
      item.classList.add("active");
      document.querySelectorAll(".faq-group")[idx].classList.add("active");
    });
  });
});


// Marquee functionality
document.addEventListener('DOMContentLoaded', function() {
  const topMarquee = document.getElementById("topMarquee");
  const bottomMarquee = document.getElementById("bottomMarquee");

  [topMarquee, bottomMarquee].forEach(marquee => {
    if (marquee) {
      // Clone content for seamless loop
      marquee.innerHTML += marquee.innerHTML;
      
      // Add pause on hover
      marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
      });
      
      marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
      });
    }
  });
});

// Brand list functionality
document.addEventListener('DOMContentLoaded', function() {
  const urls = [
    "https://madhyapradeshdmc.com", 
    "https://mpdmc.com", 
    "https://hotelinandaman.com", 
    "https://andamandmc.com", 
    "https://andamantravelagent.com", 
    "https://andaman.vacations", 
    "https://questguideindia.com", 
    "https://markaa.in", 
    "https://tscbarcodeprinters.com", 
    "https://exploreandaman.co.in/crm.html"
  ];

  const brandList = document.getElementById('brandList');
  if (!brandList) return;

  function createBrandItem(url) {
    try {
      const domain = new URL(url).hostname;
      const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
      
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.title = domain;

      const img = document.createElement('img');
      img.src = faviconUrl;
      img.alt = domain;
      img.loading = "lazy";
      img.style.width = "45px";
      img.style.height = "45px";

      a.appendChild(img);
      li.appendChild(a);
      return li;
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  }

  urls.forEach(url => {
    const brandItem = createBrandItem(url);
    if (brandItem) brandList.appendChild(brandItem);
  });
});
$(document).ready(function() {
            // Initialize Owl Carousel
            $(".portfolio-carousel").owlCarousel({
                autoWidth: true,
                loop: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
            
            // Handle click events for game items
            $(".portfolio-game-item").click(function() {
                $(".portfolio-game-item").not($(this)).removeClass("portfolio-active");
                $(this).toggleClass("portfolio-active");
            });
        });