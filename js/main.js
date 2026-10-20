// js/main.js
import { api } from './supabase-client.js';

// ============ DOM Utilities ============
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

// ============ Render Functions ============
async function renderProjects(containerId = 'projects-container') {
    const container = $(`#${containerId}`);
    if (!container) return;

    try {
        const projects = await api.getProjects();
        
        if (!projects || !projects.length) {
            container.innerHTML = '<p class="text-center text-muted">No projects available.</p>';
            return;
        }

        container.innerHTML = projects.map(project => `
            <article class="project-card" itemscope itemtype="https://schema.org/SoftwareApplication">
                <div class="project-card-inner">
                    <div class="project-header">
                        <span class="status-badge ${project.status?.toLowerCase() || 'live'}">${project.status || 'Live'}</span>
                        <h3 itemprop="name">
                            <a href="${project.live_url || '#'}" target="_blank" rel="noopener noreferrer">
                                ${project.title}
                            </a>
                        </h3>
                        <span class="industry-tag">${project.industry || 'Technology'}</span>
                    </div>
                    <div class="project-body">
                        <p class="description" itemprop="description">${project.description || ''}</p>
                        <div class="tech-stack">
                            ${project.tech_stack?.frontend?.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('') || ''}
                            ${project.tech_stack?.backend?.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('') || ''}
                        </div>
                        <div class="project-meta">
                            <span><i class="fas fa-clock"></i> ${project.timeline || 'N/A'}</span>
                            <span><i class="fas fa-users"></i> ${project.team || 'N/A'}</span>
                            <span><i class="fas fa-calendar"></i> ${project.year || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="project-footer">
                        <a href="${project.live_url || '#'}" target="_blank" rel="noopener noreferrer" class="btn-visit">
                            Visit Site <i class="fas fa-arrow-right ms-1"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load projects.</p>';
    }
}

async function renderTestimonials(containerId = 'testimonials-container') {
    const container = $(`#${containerId}`);
    if (!container) return;

    try {
        const testimonials = await api.getTestimonials();
        
        if (!testimonials || !testimonials.length) {
            container.innerHTML = '<p class="text-center text-muted">No testimonials available.</p>';
            return;
        }

        container.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <i class="fas fa-quote-left"></i>
                    <p class="quote">${testimonial.content}</p>
                    <div class="testimonial-author">
                        <strong>${testimonial.client_name}</strong>
                        ${testimonial.company_name ? `<span>${testimonial.company_name}</span>` : ''}
                    </div>
                    ${testimonial.rating ? `
                        <div class="rating">
                            ${Array(testimonial.rating).fill('<i class="fas fa-star"></i>').join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading testimonials:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load testimonials.</p>';
    }
}

async function renderServices(containerId = 'services-container') {
    const container = $(`#${containerId}`);
    if (!container) return;

    try {
        const services = await api.getServices();
        
        if (!services || !services.length) {
            container.innerHTML = '<p class="text-center text-muted">No services available.</p>';
            return;
        }

        container.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon_class || 'fas fa-cog'}"></i>
                </div>
                <h3>${service.title}</h3>
                <p>${service.description || ''}</p>
                ${service.features?.length ? `
                    <ul class="service-features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading services:', error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load services.</p>';
    }
}

async function loadSiteSettings() {
    try {
        const settings = await api.getSiteSettings();
        if (!settings) return;
        
        // Update title
        if (settings.meta_title) {
            document.title = settings.meta_title;
        }
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && settings.meta_description) {
            metaDesc.content = settings.meta_description;
        }
        
        // Update header
        const brandLink = document.querySelector('.navbar-brand');
        if (brandLink && settings.site_name) {
            brandLink.innerHTML = settings.site_name.replace('PSWeb', 'PS<span>Web</span>');
        }
        
        // Update footer
        const footer = document.querySelector('.footer');
        if (footer && settings.footer_content) {
            const footerText = footer.querySelector('.footer-text');
            if (footerText) {
                footerText.textContent = settings.footer_content;
            }
        }
        
        // Update copyright
        const copyright = document.querySelector('.copyright-text');
        if (copyright && settings.copyright_text) {
            copyright.textContent = settings.copyright_text;
        }
        
    } catch (error) {
        console.error('Error loading site settings:', error);
    }
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', async () => {
    // Load all content
    await Promise.all([
        loadSiteSettings(),
        renderProjects(),
        renderServices(),
        renderTestimonials()
    ]);
});

// Export for use in other scripts
export { renderProjects, renderServices, renderTestimonials, loadSiteSettings };