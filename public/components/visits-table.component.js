import {TemplateElement} from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
const pug = require('pug');
const {tr, td} = x;
const cell = (text) => td({title: text}, text);
customElements.define('visits-table', class extends TemplateElement {
    externalStyles = ['/assets/visits-table.css'];
    constructor() {
        super();
        this.addElementProperty('siteData', 'table > tbody');
    }
    template = pug.render(`
div.container
    table.styled-table
        thead
            tr.header
                th User-Agent
                th Path
                th Referer
                th Timestamp
                th IP
        tbody
            tr
                td Loading...
    `);
    loadData(visits) {
        this.siteData.innerHTML = '';
        for(let visit of visits) {
            this.siteData.appendChild(
                tr(
                    cell(visit.useragent),
                    cell(visit.path),
                    cell(visit.referer),
                    cell(new Date(visit.timestamp).toLocaleString()),
                    cell(visit.ip)
                )
            );
        }
    }
});