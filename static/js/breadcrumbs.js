class XBreadcrumbs extends HTMLElement {
    connectedCallback() {
        const items = [...this.querySelectorAll('x-crumb')];
        const nav = document.createElement('nav');
        nav.setAttribute('aria-label', 'Breadcrumb');

        const ol = document.createElement('ol');
        ol.className = 'breadcrumbs';

        items.forEach((crumb, index) => {
            const isLast = index === items.length - 1;
            const href = crumb.getAttribute('href');
            const label = crumb.textContent.trim();

            const li = document.createElement('li');
            li.className = 'breadcrumb-item';

            if (isLast) {
                const span = document.createElement('span');
                span.setAttribute('aria-current', 'page');
                span.className = 'breadcrumb-current';
                span.textContent = label;
                li.appendChild(span);
            } else {
                const a = document.createElement('a');
                a.href = href || '#';
                a.className = 'breadcrumb-link';
                a.textContent = label;
                li.appendChild(a);

                const sep = document.createElement('span');
                sep.setAttribute('aria-hidden', 'true');
                sep.className = 'breadcrumb-sep';
                sep.textContent = '›';
                li.appendChild(sep);
            }

            ol.appendChild(li);
        });

        this.innerHTML = '';
        nav.appendChild(ol);
        this.appendChild(nav);
    }
}

customElements.define('x-breadcrumbs', XBreadcrumbs);
customElements.define('x-crumb', class extends HTMLElement {});
