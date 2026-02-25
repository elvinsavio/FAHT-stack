class XCard extends HTMLElement {
    connectedCallback() {
        this.classList.add(
            'ring-foreground/10', 'bg-card', 'text-card-foreground',
            'flex', 'flex-col', 'overflow-hidden', 'rounded-xl', 'text-sm', 'ring-1', 'w-full'
        );
    }
}

class XCardHeader extends HTMLElement {
    connectedCallback() {
        this.classList.add('block', 'px-4', 'py-4', 'border-b', 'border-border', 'font-semibold');
    }
}

class XCardContent extends HTMLElement {
    connectedCallback() {
        this.classList.add('block', 'px-4', 'py-3');
    }
}

class XCardFooter extends HTMLElement {
    connectedCallback() {
        this.classList.add('block', 'px-4', 'py-3', 'bg-muted', 'text-muted-foreground', 'border-t', 'border-border');
    }
}

customElements.define('x-card', XCard);
customElements.define('x-card-header', XCardHeader);
customElements.define('x-card-content', XCardContent);
customElements.define('x-card-footer', XCardFooter);
