import {TemplateElement} from 'https://cdn.skypack.dev/template-element';

export default class Logo extends TemplateElement {
    template = `
<div class="Logo">
    <img src="/litelytics-logo-black.webp" height=200>
</div>
    `
}

customElements.define('ll-logo', Logo);