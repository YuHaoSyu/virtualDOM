import createElement from "./createDOM.js";
import render from "./render.js";
import mount from "./mount.js";
import diff from "./diff.js";

const createVApp = count =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count
    },
    children: [
      createElement("input"),
      String(`Current count: ${count}`),
      ...Array.from({ length: count }, () =>
        createElement("img", {
          attrs: {
            src: "https://images.unsplash.com/photo-1565733293285-77aa342b22dd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
          }
        })
      )
    ]
  });

let count = 0;
let vApp = createVApp(count);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

// setInterval(() => {
  count = Math.floor(Math.random() * 10);
  const vNewApp = createVApp(count);
  const patch = diff(vApp, vNewApp);
  $rootEl = patch($rootEl);
  vApp = vNewApp;
// }, 1000);
