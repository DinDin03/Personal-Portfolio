// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Here you would typically send the form data to a server
    // For now, let's just show a success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Add animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.transitionDelay = `${index * 0.05}s`;
        
        observer.observe(item);
    });
});

// Dark mode toggle
const createDarkModeToggle = () => {
    const header = document.getElementById('header');
    const toggle = document.createElement('button');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.className = 'dark-mode-toggle';
    toggle.style.background = 'none';
    toggle.style.border = 'none';
    toggle.style.color = 'var(--dark)';
    toggle.style.fontSize = '1.2rem';
    toggle.style.cursor = 'pointer';
    toggle.style.marginLeft = '1rem';
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
    
    header.querySelector('nav').appendChild(toggle);
    
    // Add dark mode styles
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            --primary: #6495ED;
            --primary-dark: #4169E1;
            --secondary: #34495e;
            --light: #1a1a1a;
            --dark: #f8f9fa;
            --gray: #a0a0a0;
        }
        
        body.dark-mode header,
        body.dark-mode .card,
        body.dark-mode #about,
        body.dark-mode #skills,
        body.dark-mode .project-card,
        body.dark-mode .timeline-content {
            background-color: #222;
            color: var(--dark);
        }
        
        body.dark-mode .skill-item {
            background-color: #333;
            color: var(--dark);
        }
        
        body.dark-mode .nav-links a {
            color: var(--dark);
        }
        
        body.dark-mode .nav-links.active {
            background-color: #222;
        }
    `;
    document.head.appendChild(style);
};

// Initialize dark mode toggle
document.addEventListener('DOMContentLoaded', createDarkModeToggle);