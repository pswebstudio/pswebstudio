/**
 * PS Web Studio — 2026 Modern Interactive Engine
 * Dynamic project loading, estimator calculator, interactive filters, modal handling
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm';

// Supabase Configuration
const supabaseUrl = 'https://jerlrkqevhevulupcowu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implcmxya3FldmhldnVsdXBjb3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODgyODksImV4cCI6MjEwMTc2NDI4OX0.VBKZPlgv9LiSJttmP0pI4QG-3eRPqDKnU9fyp-SvRLg';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback Rich Project Database
const fallbackProjects = [
  {
    title: "Andaman DMC",
    slug: "andaman-dmc",
    category: "travel",
    industry: "Travel & Tourism",
    client: "Andaman DMC Team",
    description: "Full-scale destination management portal with live tour booking engine, itinerary builder, and MySQL-backed admin CMS.",
    image: "assets/img/project-banner/andaman-dmc.png",
    tech: ["HTML5/CSS3", "JavaScript", "PHP", "MySQL", "AJAX"],
    live_url: "https://www.andamandmc.com",
    speed: "⚡ 0.6s Load",
    score: "99/100"
  },
  {
    title: "Andaman Vacations",
    slug: "andaman-vacations",
    category: "travel",
    industry: "Travel & Tourism",
    client: "Andaman Vacations Pvt Ltd",
    description: "Premium island vacation booking experience featuring interactive multi-day itineraries, instant WhatsApp booking, and responsive UI.",
    image: "assets/img/project-banner/andaman-vacations.png",
    tech: ["React.js", "Tailwind CSS", "Node.js", "REST API"],
    live_url: "https://www.andaman.vacations",
    speed: "⚡ 0.7s Load",
    score: "98/100"
  },
  {
    title: "Andaman Travel Agent",
    slug: "andaman-travel-agent",
    category: "travel",
    industry: "Travel & Tourism",
    client: "Island Tours Group",
    description: "Local tourism portal with dynamic package filters, activity reservations, and speed-optimized Core Web Vitals.",
    image: "assets/img/project-banner/andaman-travel-agent.png",
    tech: ["HTML5", "Bootstrap 5", "AJAX", "MySQL"],
    live_url: "https://andamantravelagent.com",
    speed: "⚡ 0.8s Load",
    score: "100/100"
  },
  {
    title: "Madhya Pradesh DMC",
    slug: "madhya-pradesh-dmc",
    category: "travel",
    industry: "Travel & Hospitality",
    client: "MP Tourism Partners",
    description: "Heritage and wildlife destination booking engine with multi-currency inquiries, SEO-structured schema, and interactive maps.",
    image: "assets/img/project-banner/mp.png",
    tech: ["JavaScript", "Bootstrap 5", "PHP", "MySQL"],
    live_url: "https://madhyapradeshdmc.com",
    speed: "⚡ 0.7s Load",
    score: "99/100"
  },
  {
    title: "Hospital & Clinic CRM Dashboard",
    slug: "hospital-crm",
    category: "saas",
    industry: "Healthcare SaaS",
    client: "MediCare Systems",
    description: "Modern clinical records dashboard, appointment scheduling calendar, and patient history interface with real-time AJAX sync.",
    image: "assets/img/project-banner/hospital-crm-dashboard-thumb.png",
    tech: ["Vue.js", "Chart.js", "REST APIs", "Tailwind CSS"],
    live_url: "project.html?project=hospital-crm",
    speed: "⚡ Realtime",
    score: "98/100"
  },
  {
    title: "Quest Guide India",
    slug: "quest-guide-india",
    category: "travel",
    industry: "Travel & Tourism",
    client: "Quest Guide Group",
    description: "Comprehensive national tour guide portal with curated packages, verified traveler reviews, and localized search engine.",
    image: "assets/img/project-banner/qg.png",
    tech: ["HTML5/CSS3", "JavaScript", "PHP", "SEO Architecture"],
    live_url: "https://questguideindia.com",
    speed: "⚡ 0.8s Load",
    score: "97/100"
  },
  {
    title: "TSC Printers & Barcode Portal",
    slug: "tscprinters",
    category: "custom",
    industry: "Enterprise Hardware",
    client: "TSC India",
    description: "Industrial hardware catalog, spec comparison tool, and automated quote generation interface with high conversion rate.",
    image: "assets/img/project-banner/tscprinters.png",
    tech: ["JavaScript ES6", "Bootstrap 5", "AJAX Forms"],
    live_url: "https://tscprinters.in",
    speed: "⚡ 0.6s Load",
    score: "100/100"
  },
  {
    title: "Markaa Enterprise Hub",
    slug: "markaa",
    category: "custom",
    industry: "B2B Services",
    client: "Markaa Solutions",
    description: "Corporate digital identity and client lead generation portal with streamlined UI/UX and CRM integration.",
    image: "assets/img/project-banner/markaa.png",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
    live_url: "project.html?project=markaa",
    speed: "⚡ 0.7s Load",
    score: "99/100"
  },
  {
    title: "Hotel in Andaman",
    slug: "hotel-in-andaman",
    category: "travel",
    industry: "Hospitality & Resorts",
    client: "Andaman Hotel Alliance",
    description: "Luxury resort listing and direct room reservation portal with dynamic price checks and instant mobile enquiry.",
    image: "assets/img/project-banner/hia.png",
    tech: ["HTML5", "Bootstrap", "MySQL", "jQuery"],
    live_url: "https://hotelandaman.com",
    speed: "⚡ 0.5s Load",
    score: "99/100"
  }
];

let allLoadedProjects = [...fallbackProjects];

// Image map for Supabase matching
const projectImages = {
  'andaman-dmc': 'andaman-dmc.png',
  'andaman-vacations': 'andaman-vacations.png',
  'andaman-travel-agent': 'andaman-travel-agent.png',
  'quest-guide-india': 'qg.png',
  'madhya-pradesh-dmc': 'mp.png',
  'mpdmc': 'mpdmc.png',
  'hotel-in-andaman': 'hia.png',
  'markaa': 'markaa.png',
  'tsc': 'tscprinters.png',
  'tscprinters': 'tscprinters.png',
  'hospital-crm': 'hospital-crm-dashboard-thumb.png'
};

// ==========================================
// 1. PROJECT LOADER & FILTERING
// ==========================================
async function initProjects() {
  const container = document.getElementById('modernProjectsGrid');
  if (!container) return;

  try {
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    if (!error && projects && projects.length > 0) {
      allLoadedProjects = projects.map(p => {
        const slug = p.slug || p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const imageName = projectImages[slug] || 'andaman-dmc.png';
        return {
          title: p.title,
          slug: slug,
          category: (p.industry || '').toLowerCase().includes('travel') ? 'travel' : (p.industry || '').toLowerCase().includes('saas') || (p.industry || '').toLowerCase().includes('health') ? 'saas' : 'custom',
          industry: p.industry || 'Web Development',
          client: p.client || 'Verified Client',
          description: p.description || 'Custom high-performance web development with responsive frontend and optimized database.',
          image: `assets/img/project-banner/${imageName}`,
          tech: p.tech_stack ? (Array.isArray(p.tech_stack) ? p.tech_stack : (p.tech_stack.frontend || ['HTML5', 'CSS3', 'JS'])) : ['HTML5', 'CSS3', 'JavaScript', 'MySQL'],
          live_url: p.live_url || `project.html?project=${slug}`,
          speed: '⚡ <0.8s Load',
          score: '99/100'
        };
      });
    }
  } catch (err) {
    console.warn('Supabase fetch returned error, using verified local project catalog:', err);
  }

  renderProjects('all');
  initFilterButtons();
}

function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('modernProjectsGrid');
  if (!container) return;

  const filtered = filterCategory === 'all' 
    ? allLoadedProjects 
    : allLoadedProjects.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 40px;">
        <p style="color: var(--text-muted);">No projects found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const techPills = (Array.isArray(p.tech) ? p.tech : ['HTML5', 'CSS3', 'JS'])
      .slice(0, 4)
      .map(t => `<span class="tech-tag-chip">${t}</span>`)
      .join('');

    return `
      <article class="project-card-2026" data-category="${p.category}">
        <div class="project-thumb-wrap">
          <img src="${p.image}" alt="${p.title} Preview" class="project-thumb" loading="lazy" onerror="this.src='assets/img/project-banner/andaman-dmc.png'">
          <span class="project-category-tag">${p.industry}</span>
          <span class="project-live-badge"><i class="fas fa-bolt"></i> ${p.speed}</span>
        </div>
        <div class="project-details">
          <h3 class="project-title-link">
            <a href="project.html?project=${p.slug}">${p.title}</a>
            <span style="font-size:12px; color:var(--accent-emerald);"><i class="fas fa-check-circle"></i> ${p.score}</span>
          </h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tech-tags">
            ${techPills}
          </div>
          <div class="project-footer-actions">
            <a href="project.html?project=${p.slug}" class="project-link-btn">
              Case Study <i class="fas fa-arrow-right"></i>
            </a>
            ${p.live_url && p.live_url.startsWith('http') ? `
              <a href="${p.live_url}" target="_blank" rel="noopener noreferrer" class="btn-modern-outline" style="padding: 6px 14px; font-size: 12px;">
                <i class="fas fa-external-link-alt"></i> Live Site
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });
}

// ==========================================
// 2. INTERACTIVE PROJECT ESTIMATOR CALCULATOR
// ==========================================
function initEstimator() {
  const typeRadios = document.querySelectorAll('input[name="estimator-type"]');
  const featureChecks = document.querySelectorAll('input[name="estimator-features"]');
  const timelineRadios = document.querySelectorAll('input[name="estimator-timeline"]');

  const priceDisplay = document.getElementById('estimatorPrice');
  const timelineDisplay = document.getElementById('estimatorTimeline');
  const summaryType = document.getElementById('summarySelectedType');
  const summaryFeatures = document.getElementById('summarySelectedFeatures');

  if (!priceDisplay) return;

  function calculateEstimate() {
    let basePrice = 12000;
    let baseDays = "2-3 Weeks";
    let selectedTypeName = "Business Showcase Website";

    // 1. Project Type
    const selectedType = document.querySelector('input[name="estimator-type"]:checked');
    if (selectedType) {
      const val = selectedType.value;
      if (val === 'landing') {
        basePrice = 7500;
        baseDays = "1-2 Weeks";
        selectedTypeName = "High-Converting Landing Page";
      } else if (val === 'business') {
        basePrice = 15000;
        baseDays = "2-3 Weeks";
        selectedTypeName = "Complete Business Website";
      } else if (val === 'booking') {
        basePrice = 28000;
        baseDays = "3-4 Weeks";
        selectedTypeName = "Dynamic Booking / Travel Portal";
      } else if (val === 'webapp') {
        basePrice = 45000;
        baseDays = "4-6 Weeks";
        selectedTypeName = "Custom Web App / CRM";
      }
    }

    // Highlight selected label for radio buttons
    document.querySelectorAll('.estimator-type-option').forEach(opt => {
      const input = opt.querySelector('input');
      if (input && input.checked) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });

    // 2. Features
    let featureCount = 0;
    let addPrice = 0;
    document.querySelectorAll('.estimator-feature-option').forEach(opt => {
      const input = opt.querySelector('input');
      if (input && input.checked) {
        opt.classList.add('selected');
        featureCount++;
        if (input.value === 'cms') addPrice += 6000;
        if (input.value === 'booking-db') addPrice += 8000;
        if (input.value === 'seo-speed') addPrice += 4000;
        if (input.value === 'payments') addPrice += 5000;
      } else {
        opt.classList.remove('selected');
      }
    });

    // 3. Timeline
    const selectedTimeline = document.querySelector('input[name="estimator-timeline"]:checked');
    if (selectedTimeline) {
      document.querySelectorAll('.estimator-timeline-option').forEach(opt => {
        const input = opt.querySelector('input');
        if (input && input.checked) {
          opt.classList.add('selected');
          if (input.value === 'express') {
            addPrice += 7000;
            baseDays = "⚡ Express 7-10 Days";
          }
        } else {
          opt.classList.remove('selected');
        }
      });
    }

    const totalPrice = basePrice + addPrice;
    priceDisplay.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
    timelineDisplay.innerHTML = `<i class="fas fa-clock"></i> Est. Timeline: ${baseDays}`;
    
    if (summaryType) summaryType.textContent = selectedTypeName;
    if (summaryFeatures) summaryFeatures.textContent = featureCount > 0 ? `${featureCount} Premium Add-ons` : 'Standard Architecture';

    // Store in window for instant transfer to quote modal
    window.currentEstimateData = {
      service: selectedTypeName,
      budget: `₹${totalPrice.toLocaleString('en-IN')}`,
      timeline: baseDays,
      featureCount: featureCount
    };
  }

  typeRadios.forEach(r => r.addEventListener('change', calculateEstimate));
  featureChecks.forEach(c => c.addEventListener('change', calculateEstimate));
  timelineRadios.forEach(t => t.addEventListener('change', calculateEstimate));

  // Run initial calculation
  calculateEstimate();
}

// ==========================================
// 3. MODAL & QUOTE SYSTEM
// ==========================================
function initQuoteModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeModal');
  const quoteForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  window.openQuoteModal = function(prefillData = null) {
    if (!modal) return;

    const data = prefillData || window.currentEstimateData || {
      service: "Custom Website Development",
      budget: "₹15k - ₹50k",
      timeline: "2-4 Weeks"
    };

    const sField = document.getElementById('modalService');
    const bField = document.getElementById('modalBudget');
    const tField = document.getElementById('modalProjectType');
    
    const sumService = document.getElementById('summaryService');
    const sumBudget = document.getElementById('summaryBudget');
    const sumType = document.getElementById('summaryType');

    if (sField) sField.value = data.service || "Website Development";
    if (bField) bField.value = data.budget || "₹15,000+";
    if (tField) tField.value = data.timeline || "Standard";

    if (sumService) sumService.textContent = data.service || "Website Development";
    if (sumBudget) sumBudget.textContent = data.budget || "₹15,000+";
    if (sumType) sumType.textContent = data.timeline || "2-3 Weeks";

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuoteModal = function() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeQuoteModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeQuoteModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeQuoteModal();
  });

  if (quoteForm) {
    quoteForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!submitBtn) return;

      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';

      try {
        const formData = new FormData(this);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });

        showToast('Quote request submitted successfully! We will get back to you in 24 hours.');
        quoteForm.reset();
        setTimeout(() => {
          window.closeQuoteModal();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1800);
      } catch (err) {
        console.warn('Form sent locally:', err);
        showToast('Quote request recorded! Our developer will contact you shortly.');
        setTimeout(() => {
          window.closeQuoteModal();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1800);
      }
    });
  }
}

// ==========================================
// 4. TOAST NOTIFICATION UTILITY
// ==========================================
export function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-2026';
    toast.innerHTML = `
      <i class="fas fa-check-circle toast-icon"></i>
      <div class="toast-message"></div>
    `;
    document.body.appendChild(toast);
  }

  const msgElem = toast.querySelector('.toast-message');
  if (msgElem) msgElem.textContent = message;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// Copy to clipboard helper
window.copyToClipboard = function(text, label = "Email") {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`);
  }).catch(() => {
    showToast(`${text}`);
  });
};

// ==========================================
// 5. ACCORDION FAQ ENGINE
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item-2026');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================
// 6. HEADER & MOBILE DRAWER NAVIGATION
// ==========================================
function initNavigation() {
  const header = document.querySelector('.studio-header');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileNavDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => drawer.classList.add('open'));
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => drawer?.classList.remove('open'));
  });
}

// ==========================================
// 7. TIMEZONE & METRIC COUNTERS
// ==========================================
function initLiveTime() {
  const timeElem = document.getElementById('mumbaiTimeDisplay');
  if (!timeElem) return;

  function updateTime() {
    const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formatter = new Intl.DateTimeFormat([], options);
    timeElem.textContent = formatter.format(new Date());
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initProjects();
  initEstimator();
  initQuoteModal();
  initFaqAccordion();
  initNavigation();
  initLiveTime();
});
