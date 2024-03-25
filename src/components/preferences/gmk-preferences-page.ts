import {globalStyles} from "/src/styles/global-styles.js";
import {css, html} from "/src/helper-functions.js";
import '/src/components/gmk-subpage-container.js';
import '/src/components/gmk-title-panel.js';
import '/src/components/icons/gmk-info-icon.js';
import '/src/components/password-options/gmk-algo-output-format.js';
import '/src/components/preferences/gmk-visibility.js';
import '/src/components/preferences/gmk-saving.js';
import '/src/components/preferences/gmk-danger-zone.js';
import '/src/components/preferences/gmk-convenience.js';

export class GmkPreferencesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = this.render();
    }

    render() {
        return html`
            <style>${globalStyles}</style>
            <gmk-subpage-container>
                <span slot="headerText">User Preferences</span>
                <div slot="content" class="settingsColumn">       
                    <gmk-visibility></gmk-visibility>
                    <gmk-saving></gmk-saving>
                    <gmk-convenience></gmk-convenience>
                    <gmk-danger-zone></gmk-danger-zone>
                </div>
            </gmk-subpage-container>
        `
    }
}

customElements.define('gmk-settings-page', GmkPreferencesPage);