function onLoad() {
  window.myOverlay = new myCustomOverlay();
}

class myCustomOverlay {
  constructor() {
    this.transformLinks();
  }

  transformLinks() {
    // add styles class a.gumroad-button
    // all the links which has class name a.gumroad-button, needs a unique brand styling
    // as a test, i added only one style - we can add more styling based on the design
    const buttonStyle = "a.gumroad-button {background-color: green }";
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.appendChild(document.createTextNode(buttonStyle));
    document.getElementsByTagName("head")[0].append(styleElement);

    // now that we did the styling part
    // we need to create an iframe and show it inline as overlay on click of the link
    // so, let get all the gumRoad buttons in the page
    // prevent the default click action
    // call createIframe and then voila you should be able to see the iframe onclick on the button
    const gumRoadButtons = document.getElementsByClassName("gumroad-button");

    for (let index = 0; index < gumRoadButtons.length; index++) {
      gumRoadButtons[index].onclick = function (e) {
        e.preventDefault();
        myCustomOverlay.createIframe();
      };
    }
  }

  static createIframe() {
    // the primary goal of this function is to create a div container to hold iframe
    // append the parent div to the body tag
    // we will be setting few attributes to iframe
    // also the SRC < i picked up the src value from demo page >

    const iframeContainer = document.createElement("div");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("scrolling", "no");
    iframe.allowtransparency = true;
    iframe.setAttribute("allowFullScreen", "allowFullscreen");
    iframe.setAttribute(
      "style",
      "min-width: 100%; min-height:100%; position:absolute; border:none"
    );

    iframe.src =
      "https://gumroad.com/overlay_page?single_product_mode=true&all_permalinks=demo";

    iframeContainer.append(iframe);
    document.getElementsByTagName("body")[0].append(iframeContainer);

    let url_parameters = {
    source_url: "http%3A%2F%2Flocalhost%3A8080%2F",
    };

    let obj_url = {
      as_modal: true,
      offerCodeName: null,
      permalink: 'demo',
    }
 
    let sourceUrl = [];

    sourceUrl.push("as_modal=true");
    sourceUrl.push("offerCodeName=null");
    sourceUrl.push("permalink=demo")
    sourceUrl.push("referrer=");
    sourceUrl.push("url_parameters=" + url_parameters);

    let url = sourceUrl.join("&");

    let event = {
      overlayMethod: "getProduct",
      overlayArgs: obj_url
    };
    iframe.contentWindow.postMessage(event, "http://localhost:8000/");
  }
}

window.addEventListener
  ? window.addEventListener("load", onLoad)
  : window.attachEvent && window.attachEvent("onload", onLoad);
