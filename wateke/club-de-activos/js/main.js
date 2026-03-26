/**
 * Club de Activos - Main JavaScript
 * ADW ID: E9A9F6B5
 * Sponsorship Asset Management Platform for OpenCore/Grupo Wateke
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeComponents();
});

/**
 * Initialize all interactive components
 */
function initializeComponents() {
    initNavigation();
    initDropdowns();
    initModals();
    initMobileMenu();
    initTooltips();
}

/**
 * Navigation - Sidebar toggle and mobile menu
 */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            document.body.classList.toggle('sidebar-open');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                    document.body.classList.remove('sidebar-open');
                }
            }
        });
    }
}

/**
 * Dropdown menus
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('button, .dropdown-trigger');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                closeAllDropdowns();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.active').forEach(d => {
        d.classList.remove('active');
    });
}

/**
 * Modal handling
 */
function initModals() {
    // Close modal on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

/**
 * Open a modal by ID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close a modal by ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const publicNav = document.querySelector('.public-nav');

    if (mobileMenuToggle && publicNav) {
        mobileMenuToggle.addEventListener('click', () => {
            publicNav.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Show mobile menu toggle on small screens
    if (window.innerWidth < 768) {
        if (mobileMenuToggle) {
            mobileMenuToggle.style.display = 'block';
        }
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'none';
            }
            if (publicNav) {
                publicNav.classList.remove('mobile-open');
            }
        } else {
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'block';
            }
        }
    });
}

/**
 * Tooltips
 */
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    if (!text) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: #1e293b;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1070;
        pointer-events: none;
    `;

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8 + window.scrollY}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2 + window.scrollX}px`;

    e.target._tooltip = tooltip;
}

function hideTooltip(e) {
    if (e.target._tooltip) {
        e.target._tooltip.remove();
        delete e.target._tooltip;
    }
}

/**
 * Form validation helpers
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-+()]{8,}$/;
    return re.test(phone);
}

function showFormError(input, message) {
    input.classList.add('error');
    const errorEl = input.parentNode.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = message;
    } else {
        const newError = document.createElement('span');
        newError.className = 'form-error';
        newError.textContent = message;
        input.parentNode.appendChild(newError);
    }
}

function clearFormError(input) {
    input.classList.remove('error');
    const errorEl = input.parentNode.querySelector('.form-error');
    if (errorEl) {
        errorEl.textContent = '';
    }
}

/**
 * Debounce utility for search inputs
 */
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

/**
 * Format date for display
 */
function formatDate(dateString, locale = 'es-AR') {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Format relative time
 */
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'hace un momento';
    if (diffMin < 60) return `hace ${diffMin} ${diffMin === 1 ? 'minuto' : 'minutos'}`;
    if (diffHour < 24) return `hace ${diffHour} ${diffHour === 1 ? 'hora' : 'horas'}`;
    if (diffDay < 7) return `hace ${diffDay} ${diffDay === 1 ? 'día' : 'días'}`;

    return formatDate(dateString);
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}

/**
 * Show notification toast
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 1100;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

/**
 * Smooth scroll to element
 */
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Detect if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Storage helpers
 */
const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// Export utilities for use in other scripts
window.ClubDeActivos = {
    openModal,
    closeModal,
    validateEmail,
    validatePhone,
    showFormError,
    clearFormError,
    debounce,
    formatDate,
    formatRelativeTime,
    copyToClipboard,
    showToast,
    scrollToElement,
    prefersReducedMotion,
    storage
};
