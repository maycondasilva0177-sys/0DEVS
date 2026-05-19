document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initScroll();
    initHover();
    initForm();
});

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1506135479131832480/6J_7O2GINrv06S_uScSwy1PUB_p7CN8AEsVk5EoK0JkJ6uVJOa27IqnP96udLfymOcxH';

function initForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const discord = document.getElementById('discord').value;
        const message = document.getElementById('message').value;

        if (!name || !discord || !message) {
            alert('preenche tudo aí');
            return;
        }

        const payload = {
            embeds: [{
                title: '🎯 NOVA MENSAGEM DO SITE',
                description: '```\n[0]DEVS - Bots & Scripts\n```',
                color: 0x111111,
                fields: [
                    { name: '👤 **NOME**', value: name, inline: true },
                    { name: '📱 **DISCORD**', value: `\`${discord}\``, inline: true },
                    { name: '💬 **MENSAGEM**', value: `> ${message}` }
                ],
                footer: {
                    text: '0DEVS — Feito à mão, sem IA'
                },
                timestamp: new Date().toISOString()
            }]
        };

        try {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            alert('mensagem enviada! 🎉');
            form.reset();
        } catch (err) {
            alert('deu erro, tenta de novo');
        }
    });
}

function initTypewriter() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;
    
    let visible = true;
    setInterval(() => {
        visible = !visible;
        cursor.style.opacity = visible ? '1' : '0';
    }, 500);
}

function initScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

function initHover() {
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

console.log('%c[0]DEVS — carregado', 'color: #f5f5f5; font-weight: bold;');