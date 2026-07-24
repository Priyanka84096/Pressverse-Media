// Dummy data for profiles
const profiles = [
    { name: "Sneha Reddy", role: "Co-Founder", company: "HealthPlus", img: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "Vikram Singh", role: "CEO", company: "FinTech Pro", img: "https://randomuser.me/api/portraits/men/12.jpg" },
    { name: "Anjali Gupta", role: "Director", company: "EduSpark", img: "https://randomuser.me/api/portraits/women/70.jpg" },
    { name: "Rohan Mehta", role: "Venture Capitalist", company: "Growth Fund", img: "https://randomuser.me/api/portraits/men/9.jpg" },
    { name: "Kavita Rao", role: "President", company: "Women In Tech", img: "https://randomuser.me/api/portraits/women/36.jpg" },
    { name: "Siddharth Jain", role: "CEO", company: "Urban Builders", img: "https://randomuser.me/api/portraits/men/40.jpg" },
    { name: "Aditya Verma", role: "CTO", company: "CyberSafe", img: "https://randomuser.me/api/portraits/men/62.jpg" },
    { name: "Pooja Iyer", role: "Founder", company: "GreenEarth", img: "https://randomuser.me/api/portraits/women/71.jpg" }
];
// Auto Smooth Scroll to Form on Load
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
        const formSection = document.querySelector('.conversion-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 600);
});

document.addEventListener("DOMContentLoaded", () => {

    // 0. Premium Headline Split Animation
    const splitLefts = document.querySelectorAll('.js-split-left');
    const splitRights = document.querySelectorAll('.js-split-right');
    const textContainers = document.querySelectorAll('.js-premium-container');

    if (splitLefts.length && splitRights.length && window.gsap) {
        gsap.set([...splitLefts, ...splitRights], { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", display: "inline-block", y: 40, opacity: 1 });

        gsap.to([...splitLefts, ...splitRights], {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
            stagger: 0.15
        });

        gsap.to(textContainers, {
            filter: "drop-shadow(0 0 16px rgba(255, 215, 0, 0.6)) drop-shadow(2px 4px 4px rgba(0,0,0,0.7))",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            delay: 1.0,
            ease: "power2.out",
            clearProps: "filter"
        });
    }

    // 0.5 Random Sparkles Generator
    const sparklesContainer = document.getElementById('sparkles-container');
    if (sparklesContainer) {
        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-particle';
            // Random position
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            sparkle.style.top = `${top}%`;
            sparkle.style.left = `${left}%`;

            // Random size between 2px and 5px
            const size = Math.random() * 3 + 2;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;

            sparklesContainer.appendChild(sparkle);

            if (window.gsap) {
                gsap.to(sparkle, {
                    opacity: Math.random() * 0.5 + 0.5,
                    scale: 1,
                    duration: 0.7,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut",
                    onComplete: () => {
                        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
                    }
                });
            }
        }, 400);
    }

    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });



    // 3. Populate Editorial Section (Show 10 with shuffle)
    const edGrid = document.getElementById('editorial-profiles');

    function renderEditorialProfiles(isInitial = false) {
        if (!edGrid) return;
        edGrid.innerHTML = '';

        let shuffled = [...profiles].sort(() => 0.5 - Math.random()).slice(0, 10);

        shuffled.forEach((p, i) => {
            let edCard = document.createElement('div');
            edCard.className = 'ed-profile';
            edCard.innerHTML = `
                <div class="ed-badge"><i class="fas fa-star"></i> Featured by Pressverse Media</div>
                <div class="profile-img-container">
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <h4>${p.name}</h4>
                <p>${p.role}</p>
                <p class="ed-company">${p.company}</p>
            `;
            edGrid.appendChild(edCard);
        });

        if (window.gsap) {
            if (isInitial && window.ScrollTrigger) {
                gsap.fromTo(edGrid.children,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: edGrid, start: "top 80%" } }
                );
            } else {
                gsap.fromTo(edGrid.children,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
                );
            }
        }
    }

    renderEditorialProfiles(true);

    // 4. Parallax Effect for Digital Article Card
    const heroSection = document.querySelector('.hero');
    const parallaxCard = document.querySelector('.parallax');

    if (heroSection && parallaxCard && window.innerWidth > 1024) {
        heroSection.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            parallaxCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            parallaxCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    // 5. GSAP Animations & ScrollTriggers
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Initial load animations
        gsap.utils.toArray('.fade-up').forEach((elem) => {
            let delay = 0;
            if (elem.classList.contains('stagger-1')) delay = 0.15;
            if (elem.classList.contains('stagger-2')) delay = 0.3;
            if (elem.classList.contains('stagger-3')) delay = 0.45;
            if (elem.classList.contains('stagger-4')) delay = 0.6;
            if (elem.classList.contains('stagger-5')) delay = 0.75;
            if (elem.classList.contains('stagger-6')) delay = 0.90;

            // Only trigger initial if in hero, else use scrolltrigger
            if (elem.closest('.hero')) {
                let heroDelay = delay * (100 / 150); // Scale 150ms stagger to 100ms
                gsap.fromTo(elem,
                    { opacity: 0, y: 20, filter: "blur(8px)" },
                    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, delay: heroDelay, ease: "power2.out" }
                );
            } else {
                gsap.fromTo(elem,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.8, delay: delay, ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

        // Floating media cards reveal & Hero Counter
        const floatingCards = document.querySelectorAll('.hero-floating-card');
        if (floatingCards.length > 0) {
            gsap.fromTo(floatingCards,
                { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 30 },
                { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.2, delay: 0.8, stagger: 0.2, ease: "back.out(1.5)" }
            );
        }

        const heroCounter = document.getElementById('hero-counter');
        if (heroCounter) {
            // Wait for floating cards reveal
            setTimeout(() => {
                let targetVal = 15; // e.g. 15M+
                gsap.to(heroCounter, {
                    innerHTML: targetVal,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            }, 1000);
        }

        gsap.utils.toArray('.fade-left').forEach((elem) => {
            gsap.fromTo(elem,
                { opacity: 0, x: 50 },
                {
                    opacity: 1, x: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%"
                    }
                }
            );
        });

        // 6. Number Counter Animation
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            let target = +counter.getAttribute('data-target');

            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                onEnter: () => {
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power1.inOut"
                    });
                },
                once: true
            });
        });
    }

    // 7. Magnetic Buttons Effect
    if (window.gsap) {
        const magneticBtns = document.querySelectorAll('.magnetic');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function (e) {
                const position = btn.getBoundingClientRect();
                const x = e.pageX - position.left - position.width / 2;
                const y = e.pageY - position.top - position.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });

                const btnText = btn.querySelector('.btn-text');
                if (btnText) {
                    gsap.to(btnText, {
                        x: x * 0.1,
                        y: y * 0.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });

            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                const btnText = btn.querySelector('.btn-text');
                if (btnText) {
                    gsap.to(btnText, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
                }
            });
        });
    }

    // 8. Sticky Button Logic (Show after 30% scroll)
    const stickyBookBtn = document.querySelector('.sticky-book');
    if (stickyBookBtn) {
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercent > 30) {
                stickyBookBtn.classList.add('visible');
            } else {
                stickyBookBtn.classList.remove('visible');
            }
        });
    }
    // Modal Logic
    const formModal = document.getElementById('form-modal');
    const closeBtn = document.querySelector('.close-modal');

    window.openModal = function () {
        if (formModal) {
            formModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    window.closeModal = function () {
        if (formModal) {
            formModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Intercept all #lead-form links
    const leadLinks = document.querySelectorAll('a[href="#lead-form"]');
    leadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.openModal();
        });
    });

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', window.closeModal);
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === formModal) {
            window.closeModal();
        }
    });

    // Close on Esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && formModal && formModal.classList.contains('active')) {
            window.closeModal();
        }
    });

    // Hamburger Menu Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');

            // Prevent background scrolling
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                if (faq.querySelector('.faq-answer')) {
                    faq.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });

    // Parallax for Gallery if ScrollTrigger is available
    if (window.gsap && window.ScrollTrigger) {
        gsap.utils.toArray('.gs-parallax').forEach(parallaxElement => {
            const speed = parallaxElement.getAttribute('data-speed') || 1;
            // Native-feel parallax movement based on scroll
            gsap.to(parallaxElement, {
                y: () => (1 - parseFloat(speed)) * 100, // Move at slightly different rates
                ease: "none",
                scrollTrigger: {
                    trigger: parallaxElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Hero Image 3D Parallax Tilt & Floating Cards Parallax
    const heroImageTilt = document.getElementById('hero-image-tilt');
    const parallaxCards = document.querySelectorAll('.js-parallax-card');
    
    if (heroImageTilt || parallaxCards.length > 0) {
        document.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const xOffset = e.clientX - window.innerWidth / 2;
            const yOffset = e.clientY - window.innerHeight / 2;
            
            // Hero Image Tilt
            if (heroImageTilt) {
                const rect = heroImageTilt.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                
                const maxTilt = 4;
                const tiltX = -(y / (window.innerHeight / 2)) * maxTilt;
                const tiltY = (x / (window.innerWidth / 2)) * maxTilt;
                
                const boundedTiltX = Math.max(-maxTilt, Math.min(maxTilt, tiltX));
                const boundedTiltY = Math.max(-maxTilt, Math.min(maxTilt, tiltY));
                
                const scale = heroImageTilt.matches(':hover') ? 1.02 : 1;
                heroImageTilt.style.transform = `perspective(1000px) scale(${scale}) rotateX(${boundedTiltX}deg) rotateY(${boundedTiltY}deg)`;
            }
            
            // Floating Cards Parallax
            parallaxCards.forEach(card => {
                const speed = parseFloat(card.getAttribute('data-parallax')) || 0.05;
                const xMove = xOffset * speed;
                const yMove = yOffset * speed;
                // Preserve existing position/transform if possible, but simpler to just apply translate
                card.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });
        
        // Reset
        document.addEventListener('mouseleave', () => {
            if (heroImageTilt) {
                heroImageTilt.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
            }
            parallaxCards.forEach(card => {
                card.style.transform = `translate(0px, 0px)`;
            });
        });
    }

});
