class XAccordion extends HTMLElement {
    connectedCallback() {
        const label = this.getAttribute('label');
        const isOpen = this.hasAttribute('open');
        const isDisabled = this.hasAttribute('disabled');

        const details = document.createElement('details');
        if (isOpen) details.open = true;
        if (isDisabled) {
            details.setAttribute('disabled', '');
            details.setAttribute('aria-disabled', 'true');
            details.addEventListener('click', (e) => e.preventDefault());
        }

        const summary = document.createElement('summary');
        summary.textContent = label;
        details.appendChild(summary);

        while (this.firstChild) {
            details.appendChild(this.firstChild);
        }

        this.appendChild(details);
    }
}

customElements.define('x-accordion', XAccordion);
