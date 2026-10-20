// js/supabase-client.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Public client for frontend
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client with service role for migrations
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

// API Service Class
class ApiService {
    constructor() {
        this.supabase = supabase;
        this.admin = supabaseAdmin;
    }

    // ============ AUTH ============
    async signIn(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    }

    async signOut() {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
        return true;
    }

    async getCurrentUser() {
        const { data, error } = await this.supabase.auth.getUser();
        if (error) throw error;
        return data.user;
    }

    async isAuthenticated() {
        const { data } = await this.supabase.auth.getSession();
        return data.session !== null;
    }

    // ============ PROJECTS ============
    async getProjects(featuredOnly = false) {
        let query = this.supabase
            .from('projects')
            .select('*')
            .eq('is_enabled', true)
            .order('display_order', { ascending: true });

        if (featuredOnly) {
            query = query.eq('is_featured', true);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getAllProjects() {
        const { data, error } = await this.supabase
            .from('projects')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async getProjectBySlug(slug) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) throw error;
        return data;
    }

    async getProject(id) {
        const { data, error } = await this.supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    }

    async createProject(project) {
        const { data, error } = await this.supabase
            .from('projects')
            .insert([{
                ...project,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async updateProject(id, project) {
        const { data, error } = await this.supabase
            .from('projects')
            .update({
                ...project,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async deleteProject(id) {
        const { error } = await this.supabase
            .from('projects')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }

    // ============ BLOGS ============
    async getBlogs(limit = null) {
        let query = this.supabase
            .from('blogs')
            .select('*')
            .eq('is_enabled', true)
            .order('display_order', { ascending: true });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    }

    async getAllBlogs() {
        const { data, error } = await this.supabase
            .from('blogs')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async getBlogBySlug(slug) {
        const { data, error } = await this.supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) throw error;
        return data;
    }

    async getBlog(id) {
        const { data, error } = await this.supabase
            .from('blogs')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    }

    async createBlog(blog) {
        const { data, error } = await this.supabase
            .from('blogs')
            .insert([{
                ...blog,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async updateBlog(id, blog) {
        const { data, error } = await this.supabase
            .from('blogs')
            .update({
                ...blog,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async deleteBlog(id) {
        const { error } = await this.supabase
            .from('blogs')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }

    // ============ SERVICES ============
    async getServices() {
        const { data, error } = await this.supabase
            .from('services')
            .select('*')
            .eq('is_enabled', true)
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async getAllServices() {
        const { data, error } = await this.supabase
            .from('services')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async createService(service) {
        const { data, error } = await this.supabase
            .from('services')
            .insert([{
                ...service,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async updateService(id, service) {
        const { data, error } = await this.supabase
            .from('services')
            .update({
                ...service,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async deleteService(id) {
        const { error } = await this.supabase
            .from('services')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }

    // ============ TESTIMONIALS ============
    async getTestimonials() {
        const { data, error } = await this.supabase
            .from('testimonials')
            .select('*')
            .eq('is_enabled', true)
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async getAllTestimonials() {
        const { data, error } = await this.supabase
            .from('testimonials')
            .select('*')
            .order('display_order', { ascending: true });
        if (error) throw error;
        return data;
    }

    async createTestimonial(testimonial) {
        const { data, error } = await this.supabase
            .from('testimonials')
            .insert([{
                ...testimonial,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async updateTestimonial(id, testimonial) {
        const { data, error } = await this.supabase
            .from('testimonials')
            .update({
                ...testimonial,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data;
    }

    async deleteTestimonial(id) {
        const { error } = await this.supabase
            .from('testimonials')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }

    // ============ SITE SETTINGS ============
    async getSiteSettings() {
        const { data, error } = await this.supabase
            .from('site_settings')
            .select('*')
            .limit(1)
            .single();
        if (error) throw error;
        return data;
    }

    async updateSiteSettings(settings) {
        const { data, error } = await this.supabase
            .from('site_settings')
            .update({
                ...settings,
                updated_at: new Date().toISOString()
            })
            .eq('id', 1)
            .select()
            .single();
        if (error) throw error;
        return data;
    }
}

export const api = new ApiService();