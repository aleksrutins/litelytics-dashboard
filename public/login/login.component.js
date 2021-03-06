import {TemplateElement} from 'https://cdn.skypack.dev/template-element';
import { auth } from 'https://cdn.skypack.dev/litelytics-client';

export default class LoginPage extends TemplateElement {
    externalStyles = ['/assets/app.css'];
    template = `
<container flex-center text-center><div>
    <ll-logo></ll-logo>
    <h1>Litelytics Login</h1>
    <input type="text" id="instanceURL" placeholder="Instance URL">
    <button @click="logIn" primary>Log In</button>
</div></container>
    `
    constructor() {
        super();
        this.addElementProperty('instanceURL', '#instanceURL');
    }
    async logIn() {
        const res = await auth.logIn(this.instanceURL.value);
        console.log('Logged in as ' + res.detail.userId);
        localStorage['token'] = res.detail.token;
        localStorage['userId'] = res.detail.userId;
        localStorage['instanceUrl'] = this.instanceURL.value;
        location.assign('/');
    }
}

customElements.define('login-page', LoginPage);