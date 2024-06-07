import { getConfiguration } from "../config.js";
import { pushEvent } from "./tracking-function.js";

window.pushEvent = pushEvent;

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowDom = this.attachShadow({
      mode: "open",
    });
  }

  async connectedCallback() {
    this.render();
  }

  render() {
    this.configuration = getConfiguration();
    getHtml().then((data) => {
      this.shadowDom.innerHTML = data;
      const style = document.createElement("style");
      style.textContent = `
            @import '/static-assets/styles/footer-v2.css';`;
      this.shadowDom.appendChild(style);
      const footerNavElements = this.shadowDom.querySelectorAll(".footer-nav");
      for (let obj of footerNavElements) {
        let pathArry = obj.href.split("'");
        let suffix = pathArry[pathArry.length - 2];
        if (suffix) {
          obj.href = this.configuration.footerBaseUrl + suffix;
        }
      }
    });
  }
}

window.customElements.define("footer-component-v2", FooterComponent);

async function getHtml() {
  return await fetch("/static-assets/common-components/footer-v2.html")
    .then((data) => {
      return data.text();
    })
    .then((htmlData) => {
      return htmlData;
    });
}