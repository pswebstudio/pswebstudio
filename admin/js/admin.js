// admin/js/admin.js
import { api } from '../../js/supabase-client.js';

// ============ State ============
let currentSection = 'projects';
let currentData = [];
let editingItem = null;

// ============ DOM Utilities ============
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

function escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============ Auth Check ============
async function checkAuth() {
    const isAuth = await api.isAuthenticated();
    if (!isAuth) {
        window.location.href = '/pswebstudio/admin/login.html';
        return false;
    }
    
    try {
        const user = await api.getCurrentUser();
        $('#adminUser').textContent = user.email;
        return true;
    } catch (error) {
        console.error('Error getting user:', error);
        return false;
    }
}

// ============ Navigation ============
function initNavigation() {
    $$('.nav-link[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            $$('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentSection = link.dataset.section;
            loadSection(currentSection);
        });
    });
}

// ============ Load Content ============
async function loadSection(section) {
    const area = $('#content-area');
    area.innerHTML = `
        <div class="text-center loading-spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;

    try {
        switch (section) {
            case 'projects':
                await loadProjects();
                break;
            case 'services':
                await loadServices();
                break;
            case 'testimonials':
                await loadTestimonials();
                break;
            case 'settings':
                await loadSettings();
                break;
        }
    } catch (error) {
        console.error('Error loading section:', error);
        area.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle"></i> Error loading content. 
                <button class="btn btn-sm btn-outline-danger ms-2" onclick="loadSection('${section}')">
                    Retry
                </button>
            </div>
        `;
    }
}

// ============ Projects ============
async function loadProjects() {
    const area = $('#content-area');
    const projects = await api.getAllProjects();
    currentData = projects;

    area.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-project-diagram text-primary"></i> Projects</h2>
            <button class="btn btn-primary" onclick="window.addProject()">
                <i class="fas fa-plus"></i> Add Project
            </button>
        </div>
        ${projects.length === 0 ? `
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">No projects found. Create your first project!</p>
            </div>
        ` : `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Client</th>
                            <th>Industry</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${projects.map(project => `
                            <tr>
                                <td><strong>${escapeHtml(project.title)}</strong></td>
                                <td>${escapeHtml(project.client || 'N/A')}</td>
                                <td>${escapeHtml(project.industry || 'N/A')}</td>
                                <td>
                                    <span class="badge ${project.status === 'Live' ? 'bg-success' : 'bg-secondary'}">
                                        ${escapeHtml(project.status || 'Draft')}
                                    </span>
                                </td>
                                <td>
                                    ${project.is_featured ? '<i class="fas fa-star text-warning"></i>' : 
                                    '<span class="text-muted">—</span>'}
                                </td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button class="btn btn-outline-info" onclick="window.editProject('${project.id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-outline-danger" onclick="window.deleteProject('${project.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// ============ Services ============
async function loadServices() {
    const area = $('#content-area');
    const services = await api.getAllServices();
    currentData = services;

    area.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-cogs text-primary"></i> Services</h2>
            <button class="btn btn-primary" onclick="window.addService()">
                <i class="fas fa-plus"></i> Add Service
            </button>
        </div>
        ${services.length === 0 ? `
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">No services found. Create your first service!</p>
            </div>
        ` : `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Features</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${services.map(service => `
                            <tr>
                                <td><strong>${escapeHtml(service.title)}</strong></td>
                                <td>${escapeHtml(service.description?.substring(0, 60) || 'N/A')}${service.description?.length > 60 ? '...' : ''}</td>
                                <td>${service.features?.length || 0}</td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button class="btn btn-outline-info" onclick="window.editService('${service.id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-outline-danger" onclick="window.deleteService('${service.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// ============ Testimonials ============
async function loadTestimonials() {
    const area = $('#content-area');
    const testimonials = await api.getAllTestimonials();
    currentData = testimonials;

    area.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-comment text-primary"></i> Testimonials</h2>
            <button class="btn btn-primary" onclick="window.addTestimonial()">
                <i class="fas fa-plus"></i> Add Testimonial
            </button>
        </div>
        ${testimonials.length === 0 ? `
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">No testimonials found. Add your first testimonial!</p>
            </div>
        ` : `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Company</th>
                            <th>Content</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${testimonials.map(testimonial => `
                            <tr>
                                <td><strong>${escapeHtml(testimonial.client_name)}</strong></td>
                                <td>${escapeHtml(testimonial.company_name || 'N/A')}</td>
                                <td>${escapeHtml(testimonial.content?.substring(0, 50) || 'N/A')}${testimonial.content?.length > 50 ? '...' : ''}</td>
                                <td>${'★'.repeat(testimonial.rating || 5)}</td>
                                <td>
                                    <div class="btn-group btn-group-sm">
                                        <button class="btn btn-outline-info" onclick="window.editTestimonial('${testimonial.id}')">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="btn btn-outline-danger" onclick="window.deleteTestimonial('${testimonial.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `}
    `;
}

// ============ Settings ============
async function loadSettings() {
    const area = $('#content-area');
    const settings = await api.getSiteSettings();

    area.innerHTML = `
        <h2><i class="fas fa-cog text-primary"></i> Site Settings</h2>
        <p class="text-muted">Manage your site's global settings and content.</p>
        <hr>
        <form id="settingsForm" class="needs-validation" novalidate>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Site Name</label>
                    <input type="text" class="form-control" name="site_name" value="${escapeHtml(settings.site_name || '')}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Meta Title</label>
                    <input type="text" class="form-control" name="meta_title" value="${escapeHtml(settings.meta_title || '')}">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Meta Description</label>
                    <textarea class="form-control" name="meta_description" rows="2">${escapeHtml(settings.meta_description || '')}</textarea>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Contact Email</label>
                    <input type="email" class="form-control" name="contact_email" value="${escapeHtml(settings.contact_email || '')}">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number</label>
                    <input type="text" class="form-control" name="phone_number" value="${escapeHtml(settings.phone_number || '')}">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" name="address" rows="2">${escapeHtml(settings.address || '')}</textarea>
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Footer Content</label>
                    <input type="text" class="form-control" name="footer_content" value="${escapeHtml(settings.footer_content || '')}">
                </div>
                <div class="col-12 mb-3">
                    <label class="form-label">Copyright Text</label>
                    <input type="text" class="form-control" name="copyright_text" value="${escapeHtml(settings.copyright_text || '')}">
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </div>
        </form>
    `;

    $('#settingsForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            await api.updateSiteSettings(data);
            alert('Settings updated successfully!');
            loadSettings();
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings: ' + error.message);
        }
    });
}

// ============ CRUD Operations ============
window.addProject = () => showProjectForm();
window.editProject = (id) => {
    const project = currentData.find(p => p.id === id);
    if (project) showProjectForm(project);
};

window.deleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
        try {
            await api.deleteProject(id);
            await loadSection('projects');
            showToast('Project deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting project:', error);
            showToast('Failed to delete project', 'danger');
        }
    }
};

window.addService = () => showServiceForm();
window.editService = (id) => {
    const service = currentData.find(s => s.id === id);
    if (service) showServiceForm(service);
};

window.deleteService = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
        try {
            await api.deleteService(id);
            await loadSection('services');
            showToast('Service deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting service:', error);
            showToast('Failed to delete service', 'danger');
        }
    }
};

window.addTestimonial = () => showTestimonialForm();
window.editTestimonial = (id) => {
    const testimonial = currentData.find(t => t.id === id);
    if (testimonial) showTestimonialForm(testimonial);
};

window.deleteTestimonial = async (id) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
        try {
            await api.deleteTestimonial(id);
            await loadSection('testimonials');
            showToast('Testimonial deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            showToast('Failed to delete testimonial', 'danger');
        }
    }
};

// ============ Toast Notifications ============
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// ============ Forms ============
function showProjectForm(project = null) {
    const action = project ? 'Edit' : 'Add';
    const title = project ? project.title : '';
    
    if (confirm(`${action} Project: ${title}\n\nFull form implementation coming soon!`)) {
        loadSection('projects');
        showToast(`${action} project functionality coming soon!`, 'info');
    }
}

function showServiceForm(service = null) {
    const action = service ? 'Edit' : 'Add';
    showToast(`${action} service functionality coming soon!`, 'info');
}

function showTestimonialForm(testimonial = null) {
    const action = testimonial ? 'Edit' : 'Add';
    showToast(`${action} testimonial functionality coming soon!`, 'info');
}

// ============ Logout ============
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    if (confirm('Are you sure you want to logout?')) {
        try {
            await api.signOut();
            window.location.href = '/pswebstudio/admin/login.html';
        } catch (error) {
            console.error('Error logging out:', error);
            showToast('Failed to logout', 'danger');
        }
    }
});

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', async () => {
    const isAuth = await checkAuth();
    if (isAuth) {
        initNavigation();
        await loadSection('projects');
    }
});