import {TemplateElement} from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
const {tr, td} = x;
const cell = (text) => td({title: text}, text);
customElements.define('visits-table', class extends TemplateElement {
    externalStyles = ['/assets/visits-table.css'];
    constructor() {
        super();
        this.addElementProperty('siteData', 'table > tbody');
    }
    template = `
<table>
    <thead>
        <tr>
            <th>User-Agent</th>
            <th>Path</th>
            <th>Referer</th>
            <th>Timestamp</th>
            <th>IP Address</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Loading...</td>
        </tr>
    </tbody>
</table>
    `;
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