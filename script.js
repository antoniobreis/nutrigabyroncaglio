// ===========================
// MENU MOBILE TOGGLE
// ===========================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

// Abrir/Fechar menu mobile
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevenir scroll quando menu estiver aberto
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===========================
// SCROLL SUAVE PARA LINKS INTERNOS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// HEADER STICKY COM SOMBRA AO ROLAR
// ===========================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adicionar/remover classe para sombra
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===========================
// ANIMAÇÃO DE ELEMENTOS AO SCROLL
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards de serviços, Nutrição na Prática e depoimentos
const animatedElements = document.querySelectorAll('.servico-card, .nutricao-na-pratica-item, .depoimento-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// DESTACAR LINK ATIVO NO MENU
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.style.color = 'var(--branco)';
            } else {
                correspondingLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

// ===========================
// PREVENÇÃO DE LINKS VAZIOS
// ===========================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===========================
// LAZY LOADING DE IMAGENS
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// CONTADOR DE ROLAGEM PARA BOTÃO WHATSAPP
// ===========================
const whatsappButton = document.querySelector('.whatsapp-float');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        whatsappButton.style.opacity = '1';
        whatsappButton.style.visibility = 'visible';
    } else {
        whatsappButton.style.opacity = '0.9';
    }
});

// ===========================
// PERFORMANCE: DEBOUNCE PARA SCROLL
// ===========================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce nas funções de scroll
window.addEventListener('scroll', debounce(highlightActiveLink, 15));

// ===========================
// MENSAGEM DE CONSOLE
// ===========================
console.log('%c💚 Site desenvolvido com carinho para Gabrielly Roncaglio - Nutricionista', 'color: #808571; font-size: 14px; font-weight: bold;');

// ===========================
// FORMULÁRIO DE CONTATO (Opcional)
// ===========================
// Caso adicione um formulário no futuro, use esta estrutura:
/*
const form = document.getElementById('contato-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obter dados do formulário
        const formData = new FormData(form);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const mensagem = formData.get('mensagem');
        
        // Validação simples
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Aqui você pode integrar com um serviço de e-mail
        // ou redirecionar para WhatsApp com a mensagem
        const whatsappMessage = `Olá! Meu nome é ${nome}. ${mensagem}`;
        const whatsappUrl = `https://wa.me/5547999999999?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        form.reset();
    });
}
*/

// ===========================
// GALERIA DE IMAGENS - NUTRIÇÃO NA PRÁTICA
// ===========================
class GalleryManager {
    constructor() {
        this.galleryItems = [];
        this.currentIndex = 0;
        this.galleryName = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('gallery-modal');
        this.image = document.getElementById('gallery-image');
        this.caption = document.getElementById('gallery-caption');
        this.closeBtn = document.querySelector('.gallery-close');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.counterCurrent = document.getElementById('gallery-current');
        this.counterTotal = document.getElementById('gallery-total');

        // Setup event listeners para items da galeria
        document.querySelectorAll('[data-gallery]').forEach(item => {
            item.addEventListener('click', (e) => this.openGallery(e));
        });

        // Setup event listeners do modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeGallery());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevImage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Fechar modal ao clicar fora da imagem
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeGallery();
                }
            });
        }

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') this.prevImage();
                if (e.key === 'ArrowRight') this.nextImage();
                if (e.key === 'Escape') this.closeGallery();
            }
        });
    }

    openGallery(event) {
        // Encontrar o item clicado
        const clickedItem = event.currentTarget;
        const galleryName = clickedItem.getAttribute('data-gallery');
        
        // Buscar todos os items da mesma galeria
        this.galleryItems = Array.from(document.querySelectorAll(`[data-gallery="${galleryName}"]`));
        this.currentIndex = this.galleryItems.indexOf(clickedItem);
        this.galleryName = galleryName;

        // Atualizar total
        this.counterTotal.textContent = this.galleryItems.length;

        // Mostrar imagem
        this.showImage();

        // Abrir modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeGallery() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    showImage() {
        const item = this.galleryItems[this.currentIndex];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.nutricao-na-pratica-overlay p, .contato-galeria-overlay p');
        const captionText = overlay ? overlay.textContent.trim() : '';
        
        this.image.src = img.src;
        this.image.alt = img.alt;
        this.caption.textContent = captionText;
        this.counterCurrent.textContent = this.currentIndex + 1;
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.showImage();
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.showImage();
    }
}

// Inicializar gerenciador de galeria quando o DOM estiver pronto
const gallery = new GalleryManager();

// ===========================
// BANNER DE COOKIES - LGPD
// ===========================
class CookieConsent {
    constructor() {
        this.consentKey = 'nutrigaby_cookie_consent';
        this.banner = document.getElementById('cookieConsent');
        this.btn = document.getElementById('cookieConsentBtn');
        this.init();
    }

    init() {
        // Verificar se já existe consentimento
        if (!this.hasConsent()) {
            this.showBanner();
        }

        // Setup event listener
        if (this.btn) {
            this.btn.addEventListener('click', () => this.acceptConsent());
        }
    }

    hasConsent() {
        return localStorage.getItem(this.consentKey) === 'accepted';
    }

    showBanner() {
        if (this.banner) {
            setTimeout(() => {
                this.banner.classList.add('show');
            }, 1000); // Mostrar após 1 segundo
        }
    }

    acceptConsent() {
        localStorage.setItem(this.consentKey, 'accepted');
        if (this.banner) {
            this.banner.classList.remove('show');
        }
    }
}

// Inicializar banner de cookies quando o DOM estiver pronto
const cookieConsent = new CookieConsent();

// ===========================
// ANO AUTOMÁTICO NO RODAPÉ
// ===========================
// Fallback múltiplo para compatibilidade com Safari/iPhone
function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Tentativa 1: DOMContentLoaded
document.addEventListener('DOMContentLoaded', updateYear);

// Tentativa 2: window.onload (fallback para Safari)
window.onload = updateYear;