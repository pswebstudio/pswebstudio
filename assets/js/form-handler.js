/**
 * form-handler.js — Centralized Form & Quote Modal Handler for PS Web Studio
 * 
 * Handles all website forms:
 * 1. Offcanvas Contact Form / Triggers
 * 2. Contact Page Form (#contact-form1)
 * 3. Quote Modal Form (#contactForm)
 * 4. Newsletter Forms (.newsletter-content form)
 * 
 * Stores all submissions in Supabase and sends email notifications via EmailJS
 * directly to pswebstudio.dev@gmail.com.
 */

(function () {
    'use strict';

    // ========================
    // CONFIGURATION
    // ========================
    const SUPABASE_URL = 'https://jerlrkqevhevulupcowu.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Implcmxya3FldmhldnVsdXBjb3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODgyODksImV4cCI6MjEwMTc2NDI4OX0.VBKZPlgv9LiSJttmP0pI4QG-3eRPqDKnU9fyp-SvRLg';

    // EmailJS Configuration
    const EMAILJS_PUBLIC_KEY = 'MbGaigcq6jsw45cDx';
    const EMAILJS_SERVICE_ID = 'service_b2li8zd';
    const EMAILJS_TEMPLATE_ID = 'template_9hlhaxr';
    const EMAILJS_NEWSLETTER_TEMPLATE_ID = '';

    const RECIPIENT_EMAIL = 'pswebstudio.dev@gmail.com';

    // ========================
    // SUPABASE REST HELPERS
    // ========================
    function supabaseInsert(table, data) {
        return fetch(SUPABASE_URL + '/rest/v1/' + table, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(data)
        });
    }

    // ========================
    // EMAILJS HELPER
    // ========================
    function sendEmailNotification(templateId, templateParams) {
        if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !templateId) {
            console.warn('EmailJS not configured — skipping email notification.');
            return Promise.resolve();
        }

        var params = Object.assign({}, templateParams);
        ['phone', 'service', 'budget', 'timeline'].forEach(function (k) {
            if (!params[k]) params[k] = 'Not provided';
        });
        params.to_email = RECIPIENT_EMAIL;
        params.page_url = window.location.href;
        params.submitted_at = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        return fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: EMAILJS_SERVICE_ID,
                template_id: templateId,
                user_id: EMAILJS_PUBLIC_KEY,
                template_params: params
            })
        }).then(function (res) {
            if (!res.ok) {
                return res.text().then(function (t) {
                    console.error('EmailJS failed:', res.status, t);
                });
            }
            console.log('✅ EmailJS notification delivered to ' + RECIPIENT_EMAIL);
        }).catch(function (err) {
            console.error('EmailJS network error:', err);
        });
    }

    // ========================
    // TOAST / UI FEEDBACK
    // ========================
    function showToast(message, type) {
        var toast = document.getElementById('toastNotification');
        if (toast) {
            var toastContent = toast.querySelector('.toast-content p') || toast.querySelector('p');
            if (toastContent) toastContent.textContent = message;
            toast.classList.add('show');
            setTimeout(function () { toast.classList.remove('show'); }, 4000);
            return;
        }

        var toastEl = document.createElement('div');
        toastEl.className = 'psws-toast psws-toast--' + (type || 'success');
        toastEl.innerHTML =
            '<div class="psws-toast-icon">' +
            (type === 'error'
                ? '<i class="fa-solid fa-circle-xmark"></i>'
                : '<i class="fa-solid fa-circle-check"></i>') +
            '</div>' +
            '<div class="psws-toast-msg">' + message + '</div>';
        document.body.appendChild(toastEl);

        requestAnimationFrame(function () { toastEl.classList.add('psws-toast--visible'); });
        setTimeout(function () {
            toastEl.classList.remove('psws-toast--visible');
            setTimeout(function () { toastEl.remove(); }, 400);
        }, 4000);
    }

    function injectToastStyles() {
        if (document.getElementById('psws-toast-styles')) return;
        var style = document.createElement('style');
        style.id = 'psws-toast-styles';
        style.textContent =
            '.psws-toast{position:fixed;bottom:95px;right:25px;display:flex;align-items:center;gap:12px;' +
            'background:#fff;color:#1e293b;padding:16px 22px;border-radius:12px;box-shadow:0 10px 35px rgba(0,0,0,.18);' +
            'z-index:2147483647;transform:translateY(30px);opacity:0;transition:all .35s cubic-bezier(.4,0,.2,1);font-size:14.5px;font-weight:500;border:1px solid #e2e8f0;}' +
            '.psws-toast--visible{transform:translateY(0);opacity:1;}' +
            '.psws-toast--success .psws-toast-icon{color:#10b981;font-size:22px;}' +
            '.psws-toast--error .psws-toast-icon{color:#ef4444;font-size:22px;}' +
            '.psws-toast--error{border-left:4px solid #ef4444;}' +
            '.psws-toast--success{border-left:4px solid #10b981;}' +
            '.topbar-lets-talk{display:inline-flex;align-items:center;cursor:pointer;text-decoration:none;transition:all .25s ease;color:inherit;}' +
            '.topbar-lets-talk b{color:var(--theme,#0d9ce0)!important;border-bottom:1.5px solid var(--theme,#0d9ce0)!important;transition:all .25s ease;}' +
            '.topbar-lets-talk:hover b{color:#ffffff!important;border-bottom-color:#ffffff!important;}' +
            '.topbar-lets-talk i{font-size:11px;margin-left:4px;color:var(--theme,#0d9ce0);transition:transform .25s ease,color .25s ease;}' +
            '.topbar-lets-talk:hover i{color:#ffffff;transform:translateX(3px);}';
        document.head.appendChild(style);
    }

    // ========================
    // FORM: SET LOADING STATE
    // ========================
    function setFormLoading(btn, isLoading) {
        if (!btn) return;
        if (isLoading) {
            btn.disabled = true;
            btn.dataset.originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
        } else {
            btn.disabled = false;
            btn.innerHTML = btn.dataset.originalText || 'Send Message';
        }
    }

    // ========================
    // GLOBAL QUOTE MODAL SYSTEM
    // ========================
    window.openQuoteModal = function (prefillService, prefillBudget, prefillType) {
        var modal = document.getElementById('contactModal');
        if (!modal) {
            console.warn('contactModal not found on page');
            window.location.href = 'contact.html';
            return;
        }

        var service = prefillService || (document.getElementById('service-required') ? document.getElementById('service-required').value : '') || 'Custom Web Development';
        var budget = prefillBudget || (document.getElementById('budget-range') ? document.getElementById('budget-range').value : '') || 'Flexible';
        var projectType = prefillType || (document.getElementById('project-type') ? document.getElementById('project-type').value : '') || 'Commercial Website';

        var sInput = document.getElementById('modalService');
        var bInput = document.getElementById('modalBudget');
        var tInput = document.getElementById('modalProjectType');
        if (sInput) sInput.value = service;
        if (bInput) bInput.value = budget;
        if (tInput) tInput.value = projectType;

        var sSum = document.getElementById('summaryService');
        var bSum = document.getElementById('summaryBudget');
        var tSum = document.getElementById('summaryType');
        if (sSum) sSum.textContent = service;
        if (bSum) bSum.textContent = budget;
        if (tSum) tSum.textContent = projectType;

        modal.classList.add('active');
        document.body.classList.add('overflow-hidden');

        // Close offcanvas if it was open
        var offcanvas = document.querySelector('.offcanvas__info');
        var overlay = document.querySelector('.offcanvas__overlay');
        if (offcanvas) offcanvas.classList.remove('info-open');
        if (overlay) overlay.classList.remove('overlay-open');

        // Reset form states
        var form = document.getElementById('contactForm');
        if (form) {
            var successDiv = form.querySelector('.form-success');
            if (successDiv) successDiv.classList.add('d-none');
            var submitBtn = form.querySelector('#submitBtn') || form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('d-none');
            }
            var btnText = form.querySelector('.btn-text');
            var btnSpinner = form.querySelector('.btn-spinner');
            if (btnText) btnText.classList.remove('d-none');
            if (btnSpinner) btnSpinner.classList.add('d-none');
        }
    };

    window.closeQuoteModal = function () {
        var modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // ========================
    // HANDLER: OFFCANVAS CONTACT (#contact-form)
    // ========================
    function handleOffcanvasContact(form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            setFormLoading(btn, true);

            var data = {
                name: (form.querySelector('[name="name"]') || {}).value || '',
                email: (form.querySelector('[name="email"]') || {}).value || '',
                message: (form.querySelector('[name="message"]') || {}).value || '',
                source: 'offcanvas-contact'
            };

            if (!data.name || !data.email || !data.message) {
                showToast('Please fill in all required fields.', 'error');
                setFormLoading(btn, false);
                return;
            }

            try {
                // 1. Supabase DB insert
                try {
                    var res = await supabaseInsert('inquiries', data);
                    if (res.ok) console.log('✅ Saved to Supabase (inquiries)');
                    else console.warn('Supabase insert status:', res.status);
                } catch (dbErr) {
                    console.warn('Supabase DB error:', dbErr);
                }

                // 2. EmailJS notification
                await sendEmailNotification(EMAILJS_TEMPLATE_ID, {
                    to_email: RECIPIENT_EMAIL,
                    from_name: data.name,
                    from_email: data.email,
                    user_name: data.name,
                    user_email: data.email,
                    name: data.name,
                    email: data.email,
                    phone: 'Not provided',
                    subject: 'Offcanvas Quick Inquiry',
                    service: 'General Website Inquiry',
                    budget: 'Flexible',
                    message: data.message,
                    source: 'Offcanvas Contact Form (' + (window.location.pathname || '/') + ')'
                });

                showToast('Your message has been sent successfully! We will get back to you soon.', 'success');
                form.reset();

                // Close offcanvas if open
                setTimeout(function () {
                    var offcanvas = document.querySelector('.offcanvas__info');
                    var overlay = document.querySelector('.offcanvas__overlay');
                    if (offcanvas) offcanvas.classList.remove('info-open');
                    if (overlay) overlay.classList.remove('overlay-open');
                }, 1200);

            } catch (err) {
                console.error('Offcanvas form error:', err);
                showToast('Something went wrong. Please WhatsApp us at +91 87934 00545.', 'error');
            } finally {
                setFormLoading(btn, false);
            }
        });
    }

    // ========================
    // HANDLER: CONTACT PAGE FORM (#contact-form1)
    // ========================
    function handleContactPageForm(form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            setFormLoading(btn, true);

            var data = {
                name: (form.querySelector('[name="name"]') || {}).value || '',
                phone: (form.querySelector('[name="phone"]') || {}).value || '',
                email: (form.querySelector('[name="email"]') || {}).value || '',
                subject: (form.querySelector('[name="subject"]') || {}).value || 'Website Inquiry',
                message: (form.querySelector('[name="message"]') || {}).value || '',
                source: 'contact-page'
            };

            if (!data.name || !data.email || !data.message) {
                showToast('Please fill in all required fields.', 'error');
                setFormLoading(btn, false);
                return;
            }

            try {
                // 1. Supabase DB insert
                try {
                    var res = await supabaseInsert('inquiries', data);
                    if (res.ok) console.log('✅ Saved to Supabase (inquiries)');
                    else console.warn('Supabase insert status:', res.status);
                } catch (dbErr) {
                    console.warn('Supabase DB error:', dbErr);
                }

                // 2. EmailJS notification
                await sendEmailNotification(EMAILJS_TEMPLATE_ID, {
                    to_email: RECIPIENT_EMAIL,
                    from_name: data.name,
                    from_email: data.email,
                    user_name: data.name,
                    user_email: data.email,
                    name: data.name,
                    email: data.email,
                    phone: data.phone || 'Not provided',
                    subject: data.subject || 'Contact Page Inquiry',
                    service: data.subject || 'Website Inquiry',
                    budget: 'Flexible',
                    message: data.message,
                    source: 'Contact Page Form'
                });

                showToast('Thank you! Your message has been sent successfully. We will contact you within 24 hours.', 'success');
                form.reset();
            } catch (err) {
                console.error('Contact form error:', err);
                showToast('Something went wrong. Please try again or WhatsApp us at +91 87934 00545.', 'error');
            } finally {
                setFormLoading(btn, false);
            }
        });
    }

    // ========================
    // HANDLER: QUOTE MODAL (#contactForm)
    // ========================
    function handleQuoteModal(form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var submitBtn = form.querySelector('#submitBtn') || form.querySelector('button[type="submit"]');
            var btnText = form.querySelector('.btn-text');
            var btnSpinner = form.querySelector('.btn-spinner');

            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.classList.add('d-none');
            if (btnSpinner) btnSpinner.classList.remove('d-none');

            var data = {
                name: (form.querySelector('[name="name"]') || {}).value || '',
                email: (form.querySelector('[name="email"]') || {}).value || '',
                phone: (form.querySelector('[name="phone"]') || {}).value || '',
                service: (form.querySelector('[name="service"]') || {}).value || '',
                budget: (form.querySelector('[name="budget"]') || {}).value || '',
                subject: (form.querySelector('[name="project-type"]') || {}).value || (form.querySelector('[name="service"]') || {}).value || 'Project Quote Request',
                message: (form.querySelector('[name="message"]') || {}).value || '',
                source: 'quote-modal'
            };

            var company = (form.querySelector('[name="company"]') || {}).value || '';
            var timeline = (form.querySelector('[name="timeline"]') || {}).value || '';
            if (company) data.message = 'Company: ' + company + '\n' + (data.message || '');
            if (timeline) data.message = 'Timeline: ' + timeline + '\n' + (data.message || '');

            if (!data.name || !data.email || !data.phone) {
                showToast('Please fill in all required fields (*).', 'error');
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('d-none');
                if (btnSpinner) btnSpinner.classList.add('d-none');
                return;
            }

            try {
                // 1. Supabase DB insert
                try {
                    var res = await supabaseInsert('inquiries', data);
                    if (res.ok) console.log('✅ Saved to Supabase (inquiries)');
                    else console.warn('Supabase insert status:', res.status);
                } catch (dbErr) {
                    console.warn('Supabase DB error:', dbErr);
                }

                // 2. EmailJS notification
                await sendEmailNotification(EMAILJS_TEMPLATE_ID, {
                    to_email: RECIPIENT_EMAIL,
                    from_name: data.name,
                    from_email: data.email,
                    user_name: data.name,
                    user_email: data.email,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    company: company || 'Not provided',
                    timeline: timeline || 'Flexible',
                    subject: 'Quote Request — ' + (data.service || 'Website Project'),
                    service: data.service || 'Custom Web Development',
                    budget: data.budget || 'Flexible',
                    message: data.message || 'No additional requirements provided.',
                    source: 'Quote Modal (' + (data.service || '') + ' | ' + (data.budget || '') + ')'
                });

                // Show success in modal
                var successDiv = form.querySelector('.form-success');
                if (successDiv) successDiv.classList.remove('d-none');
                if (submitBtn) submitBtn.classList.add('d-none');
                showToast('Quote request sent successfully! We will contact you within 24 hours.', 'success');

                setTimeout(function () {
                    window.closeQuoteModal();
                }, 4000);

            } catch (err) {
                console.error('Quote form error:', err);
                showToast('There was an error sending your request. Please try again or WhatsApp us.', 'error');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.classList.remove('d-none');
                if (btnSpinner) btnSpinner.classList.add('d-none');
            }
        });
    }

    // ========================
    // HANDLER: NEWSLETTER FORMS
    // ========================
    function handleNewsletter(form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var emailInput = form.querySelector('[name="email"]') || form.querySelector('input[type="email"]') || form.querySelector('input[type="text"]');
            setFormLoading(btn, true);

            var email = emailInput ? emailInput.value.trim() : '';

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                setFormLoading(btn, false);
                return;
            }

            try {
                // 1. Supabase DB insert
                try {
                    var res = await supabaseInsert('newsletter_subscribers', {
                        email: email,
                        source: window.location.pathname || 'website'
                    });
                    if (res.status === 409) {
                        showToast('You are already subscribed! Thank you.', 'success');
                        form.reset();
                        setFormLoading(btn, false);
                        return;
                    }
                    if (res.ok) console.log('✅ Saved to Supabase (newsletter_subscribers)');
                } catch (dbErr) {
                    console.warn('Supabase DB error:', dbErr);
                }

                // 2. EmailJS notification
                await sendEmailNotification(EMAILJS_NEWSLETTER_TEMPLATE_ID || EMAILJS_TEMPLATE_ID, {
                    to_email: RECIPIENT_EMAIL,
                    from_name: 'Newsletter Subscriber',
                    from_email: email,
                    user_name: 'Subscriber',
                    user_email: email,
                    name: 'Subscriber',
                    email: email,
                    phone: 'N/A',
                    subject: 'New Newsletter Subscriber: ' + email,
                    service: 'Newsletter Subscription',
                    budget: 'N/A',
                    message: 'New newsletter subscription from ' + email + ' on page: ' + (window.location.pathname || '/'),
                    source: 'Newsletter Footer Form'
                });

                showToast('Subscribed successfully! Thank you.', 'success');
                form.reset();
            } catch (err) {
                console.error('Newsletter form error:', err);
                showToast('Something went wrong. Please try again.', 'error');
            } finally {
                setFormLoading(btn, false);
            }
        });
    }

    // ========================
    // INITIALIZE & BIND
    // ========================
    function init() {
        injectToastStyles();

        // Bind modal close buttons
        var modal = document.getElementById('contactModal');
        if (modal) {
            var closeBtn = document.getElementById('closeModal');
            if (closeBtn) closeBtn.addEventListener('click', window.closeQuoteModal);
            modal.addEventListener('click', function (e) {
                if (e.target === modal) window.closeQuoteModal();
            });
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') window.closeQuoteModal();
            });
        }

        // Global delegate for any click on topbar "Let's Talk" or "Get a Quote"
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest('.topbar-lets-talk, .open-quote-modal, .open-quote-btn, [data-open-modal="quote"]');
            if (trigger) {
                e.preventDefault();
                window.openQuoteModal();
            }
        });

        // 1. Offcanvas contact forms
        document.querySelectorAll('#contact-form').forEach(function (form) {
            handleOffcanvasContact(form);
        });

        // 2. Contact page form
        document.querySelectorAll('#contact-form1').forEach(function (form) {
            form.removeAttribute('action');
            form.setAttribute('method', 'POST');
            handleContactPageForm(form);
        });

        // 3. Quote modal form
        var quoteForm = document.getElementById('contactForm');
        if (quoteForm) {
            handleQuoteModal(quoteForm);
        }

        // 4. Newsletter forms
        document.querySelectorAll('.newsletter-content form').forEach(function (form) {
            handleNewsletter(form);
        });

        console.log('✅ PS Web Studio — Central Form Handler Active (Supabase DB + EmailJS: ' + RECIPIENT_EMAIL + ')');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
