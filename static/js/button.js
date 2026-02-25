class XButton extends HTMLElement {
    connectedCallback() {
        const variant = this.getAttribute('variant') || 'default';
        const href = this.getAttribute('href');
        const disabled = this.hasAttribute('disabled');
        const type = this.getAttribute('type') || 'button';

        const el = document.createElement(href ? 'a' : 'button');

        if (href) {
            el.href = href;
        } else {
            el.type = type;
            if (disabled) el.disabled = true;
        }

        el.className = `btn btn-${variant}`;

        if (disabled) {
            el.setAttribute('aria-disabled', 'true');
        }

        while (this.firstChild) {
            el.appendChild(this.firstChild);
        }

        this.appendChild(el);
    }
}

customElements.define('x-button', XButton);
