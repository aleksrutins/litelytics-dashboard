import { TemplateElement } from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
import { auth } from 'https://cdn.skypack.dev/litelytics-client';

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
        <visits-table id="siteData"></visits-table>
    </div>
</div>
    `
    constructor() {
        super();
        this.addElementProperty('siteList', '#siteList');
        this.addElementProperty('siteData', '#siteData');
        this.addElementProperty('mainContent', '#mainContent');
        this.addElementProperty('siteView', '#siteView');
    }
    loadSiteData = async (domain, siteId) => {
        this.mainContent.setAttribute('hidden', 'true');
        this.siteView.removeAttribute('hidden');
        const site = await auth.getSiteData(siteId);
        this.siteData.loadData(site);
    }
    async afterRenderCallback() {
        const sites = await auth.getSites();
        for (let site of sites) {
            const siteInfo = await auth.getSiteInfo(site);
            let siteView = x('site-info')({ domain: siteInfo.domain, siteId: site });
            siteView.loadDataCallback = this.loadSiteData;
            this.siteList.appendChild(siteView);
        }
    }
}
customElements.define('dashboard-page', DashboardPage);