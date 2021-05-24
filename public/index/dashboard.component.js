import { TemplateElement } from 'https://cdn.skypack.dev/template-element';
import x from 'https://cdn.skypack.dev/hyperaxe';
import { auth } from 'https://cdn.skypack.dev/litelytics-client';
const pug = require('pug');

auth.setAuth(localStorage.token, localStorage.userId);
auth.setInstance(localStorage.instanceUrl);
export default class DashboardPage extends TemplateElement {
    externalStyles = ['/assets/app.css', '/assets/dashboard.css'];
    template = pug.render(`
div
    div#header
        button(@click="backToList") Back
        h1#title Litelytics Dashboard
        div
            button#addUserBtn(hidden @click="showAddUserDialog") Add User
            button(@click="logOut") Log Out
    div.view#mainContent
        div#siteList
    div.view#siteView(hidden)
        visits-table#siteData
    dialog#addUserDialog(flex-center text-center style="flex-direction: column")
        h1 Add User
        input#addUser_userId(type="number" placeholder="User ID")
        button(@click="addUser") Add
        button(@click="hideAddUserDialog") Close
    `)
    constructor() {
        super();
        this.addElementProperty('siteList', '#siteList');
        this.addElementProperty('siteData', '#siteData');
        this.addElementProperty('mainContent', '#mainContent');
        this.addElementProperty('siteView', '#siteView');
        this.addElementProperty('pageTitle', '#title');
        this.addElementProperty('addUserBtn', '#addUserBtn');
        this.addElementProperty('addUserDialog', '#addUserDialog');
        this.addElementProperty('addUser_userId', '#addUser_userId');
    }
    loadSiteData = async (domain, siteId) => {
        this.siteId = siteId;
        this.pageTitle.textContent = domain;
        this.mainContent.setAttribute('hidden', 'true');
        this.siteView.removeAttribute('hidden');
        this.addUserBtn.removeAttribute('hidden');
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
    showAddUserDialog() {
        this.addUserDialog.setAttribute('open', 'true');
    }
    hideAddUserDialog() {
        this.addUserDialog.removeAttribute('open');
    }
    async addUser() {
        const userId = this.addUser_userId.value;
        await auth.addUserToSite(this.siteId, userId);
        this.hideAddUserDialog();
    }
    backToList() {
        location.reload();
    }
    logOut() {
        delete localStorage.token;
        delete localStorage.userId;
        location.reload();
    }
}
customElements.define('dashboard-page', DashboardPage);