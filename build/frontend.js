/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
document.addEventListener("DOMContentLoaded", function () {
  // add event listener to tabs-list element
  const tabsList = document.querySelector(".tabs-list");
  tabsList.addEventListener("click", switchTab);

  //keep first tab active
  const firstTab = tabsList.querySelector(".tab");
  firstTab.classList.add("tab-active");

  //show content of first tab at start
  const firstTabIndex = Array.from(tabsList.children).indexOf(firstTab);
  const contentDivs = document.querySelectorAll(".tabs-content");
  contentDivs.forEach((div, index) => {
    if (index === firstTabIndex) {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  });
  function switchTab(event) {
    // identify clicked tab and content div
    const clickedTab = event.target;
    const tabIndex = Array.from(tabsList.children).indexOf(clickedTab);

    // hide all content divs and show selected one
    contentDivs.forEach((div, index) => {
      if (index === tabIndex) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });

    // mark clicked tab as active
    const tabList = clickedTab.parentNode;
    tabList.querySelectorAll(".tab").forEach(tab => {
      if (tab === clickedTab) {
        tab.classList.add("tab-active");
      } else {
        tab.classList.remove("tab-active");
      }
    });
  }
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map