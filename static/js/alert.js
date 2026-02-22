const ALERT_VARIANT_STYLES = {
    info:        { border: 'border-border',      icon: '' },
    success:     { border: 'border-primary/40',     icon: 'text-primary' },
    destructive: { border: 'border-destructive/40', icon: 'text-destructive' },
    warning:     { border: 'border-warning/40',     icon: 'text-warning' },
};

class XAlert extends HTMLElement {
    connectedCallback() {
        const variant = this.getAttribute('variant') || 'info';
        const title = this.getAttribute('title') || '';
        const styles = ALERT_VARIANT_STYLES[variant] || ALERT_VARIANT_STYLES.info;

        const closable = this.hasAttribute('closable');

        const wrapper = document.createElement('div');
        wrapper.setAttribute('role', 'alert');
        wrapper.className = [
            'grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5',
            'rounded-lg border px-2.5 py-2 text-left text-sm',
            'w-full relative group/alert bg-card text-card-foreground max-w-md',
            'has-data-[slot=alert-action]:pr-8',
            styles.border,
        ].join(' ');

        const templateEl = document.getElementById(`icon-${variant}`);
        if (templateEl) {
            const iconSpan = document.createElement('span');
            iconSpan.className = `row-span-2 translate-y-0.5 flex shrink-0 [&>svg]:size-4 ${styles.icon}`;
            iconSpan.appendChild(templateEl.content.cloneNode(true));
            wrapper.appendChild(iconSpan);
        }

        const titleEl = document.createElement('div');
        titleEl.setAttribute('data-slot', 'alert-title');
        titleEl.className = 'font-medium leading-none tracking-tight';
        titleEl.textContent = title;
        wrapper.appendChild(titleEl);

        const descEl = document.createElement('div');
        descEl.setAttribute('data-slot', 'alert-description');
        descEl.className = 'text-muted-foreground text-xs [&_p]:leading-relaxed [&_p]:!mt-0';
        while (this.firstChild) {
            descEl.appendChild(this.firstChild);
        }
        wrapper.appendChild(descEl);

        if (closable) {
            const crossTemplate = document.getElementById('icon-cross');
            const btn = document.createElement('button');
            btn.setAttribute('data-slot', 'alert-action');
            btn.setAttribute('aria-label', 'Dismiss');
            btn.className = 'absolute top-1 right-1 rounded p-0.5 opacity-50 hover:opacity-100 transition-opacity [&>svg]:size-4 cursor-pointer';
            if (crossTemplate) {
                btn.appendChild(crossTemplate.content.cloneNode(true));
            }
            btn.addEventListener('click', () => this.remove());
            wrapper.appendChild(btn);
        }

        this.appendChild(wrapper);
    }
}

customElements.define('x-alert', XAlert);
