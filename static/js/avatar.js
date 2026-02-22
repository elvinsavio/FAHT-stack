function buildAvatarCircle(src, alt, initials) {
    const circle = document.createElement('div');
    circle.className = 'size-10 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0';

    if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        img.className = 'size-full object-cover';
        circle.appendChild(img);
    } else {
        const span = document.createElement('span');
        span.className = 'text-xs font-semibold text-muted-foreground select-none';
        span.textContent = initials || '?';
        circle.appendChild(span);
    }

    return circle;
}

class XAvatar extends HTMLElement {
    connectedCallback() {
        const circle = buildAvatarCircle(
            this.getAttribute('src') || '',
            this.getAttribute('alt') || '',
            this.getAttribute('initials') || '',
        );
        this.appendChild(circle);
    }
}

customElements.define('x-avatar', XAvatar);

class XAvatarGroup extends HTMLElement {
    connectedCallback() {
        const items = Array.from(this.querySelectorAll('x-avatar')).map(el => ({
            src: el.getAttribute('src') || '',
            alt: el.getAttribute('alt') || '',
            initials: el.getAttribute('initials') || '',
        }));

        this.innerHTML = '';

        const group = document.createElement('div');
        group.className = 'flex items-center';

        const visible = items.slice(0, 3);
        const overflow = items.length - 3;

        visible.forEach((data, i) => {
            const circle = buildAvatarCircle(data.src, data.alt, data.initials);
            circle.classList.add('ring-2', 'ring-background');
            if (i > 0) circle.classList.add('-ml-3');
            group.appendChild(circle);
        });

        if (overflow > 0) {
            const more = document.createElement('div');
            more.className = 'size-10 rounded-full bg-muted flex items-center justify-center shrink-0 -ml-3 ring-2 ring-background text-xs font-semibold text-muted-foreground select-none';
            more.textContent = `+${overflow}`;
            group.appendChild(more);
        }

        this.appendChild(group);
    }
}

customElements.define('x-avatar-group', XAvatarGroup);
