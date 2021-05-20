import { TemplateElement } from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
import { auth } from 'https://cdn.skypack.dev/litelytics-client';

auth.setAuth(localStorage.token, localStorage.userId);
auth.setInstance(localStorage.instanceUrl);
export default class DashboardPage extends TemplateElement {
    externalStyles = ['https://cdn.skypack.dev/your.css', '/assets/app.css', '/assets/dashboard.css'];
    template = `
<div>
    <div id="header">
        <h1 id="title">Litelytics Dashboard</h1>
        <button hidden primary @click="addUser" id="addUserBtn">+ Add User</button>
    </div>
    <div id="mainContent" class="view">
        <div id="siteList">
        </div>
    </div>
    <div id="siteView" class="view" hidden>
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
        this.addElementProperty('pageTitle', '#title');
        this.addElementProperty('addUserBtn', '#addUserBtn');
    }
    loadSiteData = async (domain, siteId) => {
        this.pageTitle.textContent = domain;
        this.mainContent.setAttribute('hidden', 'true');
        this.siteView.removeAttribute('hidden');
        const site = await auth.getSiteData(siteId);
        this.siteData.loadData(site);
    }
    async afterRenderCallback() {
        let sites;
        try {
            sites = await auth.getSites();
        } catch(e) {
            location.assign('/login.html'); // Most likely, the token has expired
        }
        for (let site of sites) {
            const siteInfo = await auth.getSiteInfo(site);
            let siteView = x('site-info')({ domain: siteInfo.domain, siteId: site });
            siteView.loadDataCallback = this.loadSiteData;
            this.siteList.appendChild(siteView);
        }
    }
    async addUser() {
        
    }
}
customElements.define('dashboard-page', DashboardPage);