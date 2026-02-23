class XBadge extends HTMLElement {
    connectedCallback() {
        const variant = this.getAttribute('variant') || 'secondary';
        this.classList.add('badge', `badge-${variant}`);
    }
}

customElements.define('x-badge', XBadge);
