import {TemplateElement} from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
import {auth} from 'https://cdn.skypack.dev/litelytics-client';
auth.setAuth(localStorage.token, localStorage.userId);
auth.setInstance(localStorage.instanceUrl);
export default class DashboardPage extends TemplateElement {
    externalStyles = ['https://cdn.skypack.dev/your.css', '/assets/app.css'];
    template = `
<div>
    <div id="header"></div>
    <div id="mainContent">
        <div id="siteList">
        </div>
    </div>
    <div id="siteView" hidden>
        <table id="siteData">
            <thead>
                <tr>
                    <th>User-Agent</th>
                    <th>Path</th>
                    <th title="It's misspelled, but it's a standard misspelling">Referer</th>
                    <th>Timestamp</th>
                    <th title="I think this is actually collecting the wrong piece of data right now.">IP Address</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
    `
    constructor() {
        super();
        this.addElementProperty('siteList', '#siteList');
        this.addElementProperty('siteData', '#siteData > tbody');
        this.addElementProperty('mainContent', '#mainContent');
        this.addElementProperty('siteView', '#siteView');
    }
    async loadSiteData(e) {
        this.mainContent.setAttribute('hidden', 'true');
        this.siteView.removeAttribute('hidden');
        const site = await auth.getSiteData(e.target.getAttribute('data-site-id'));
        for(let visit of site) {
            this.siteData.appendChild(x('tr')(x('td')(visit.useragent), x('td')(visit.path), x('td')(visit.referer), x('td')(visit.timestamp), x('td')(visit.ip)));
        }
    }
    async afterRenderCallback() {
        const sites = await auth.getSites();
        for(let site of sites) {
            const siteInfo = await auth.getSiteInfo(site);
            this.siteList.appendChild(x('.siteEntry')(
                x('h1')(siteInfo.domain),
                x('button.site-link')({onclick: this.loadSiteData, 'data-site-id': site}, 'View Data')
            ));
        }
    }
}
customElements.define('dashboard-page', DashboardPage);