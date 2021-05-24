import { TemplateElement } from 'https://cdn.skypack.dev/template-element';

customElements.define('site-info', class extends TemplateElement {
    externalStyles = ['/assets/app.css', '/assets/site-info.css'];
    constructor() {
        super();
        this.addObservable('domain');
        this.addObservable('siteId');
    }
    template = `
<div>
<h1>{{domain}}</h1>
<button @click="loadData" primary>View Data</button>
</div>
    `;
    loadData() {
        this.loadDataCallback(this.domain, this.siteId);
    }
    loadDataCallback(domain, siteId) {
        console.log("This site's data does not load.");
    }
});