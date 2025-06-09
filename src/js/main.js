/**
 * @license
 * Copyright (C) Greensky Intelligence - All Rights Reserved
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Matthew Smith <m@lattejed.com>, 2025
 */

/**
 * Collects elements by their IDs and retrieves their text content.
 * @param {string[]} ids - An array of element IDs to collect.
 * @returns {Array<{element: Element, text: string}>} - An array of objects containing the element and its text content.
 */
const elementsAndTextContent = (ids) => {
  return ids
    .map((id) => {
      const element = document.querySelector(id);
      if (element) {
        const text = element.textContent;
        return { element, text };
      }
      return null;
    })
    .filter((item) => item !== null);
};

/**
 * Sets up an IntersectionObserver to apply a typing effect to elements with the specified IDs.
 * The typing effect will start when the first element becomes visible in the viewport.
 * @param {string[]} ids - An array of element IDs to apply the typing effect to.
 */
const setTypingEffectObserver = (ids) => {
  const elements = elementsAndTextContent(ids);
  for (const { element } of elements) {
    element.textContent = "";
  }
  const typeElement = (element, text, speed) => {
    return new Promise((resolve, _reject) => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(typingInterval);
          resolve();
        }
      }, speed);
    });
  };
  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry && entry.isIntersecting) {
        observer.disconnect();
        let speed = 50;
        for (const { element, text } of elements) {
          await typeElement(element, text, speed);
          speed = 5;
        }
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    }
  );
  observer.observe(elements[0].element);
};

/**
 * Initializes the typing effect for specific elements.
 * This function sets up the observer for two sets of elements with IDs.
 */
const initTypingEffect = () => {
  setTypingEffectObserver(["#type-in-0-0", "#type-in-0-1", "#type-in-0-2"]);
  setTypingEffectObserver(["#type-in-1-0", "#type-in-1-1", "#type-in-1-2"]);
};

/*
 * Initializes the script by setting up the typing effect when the DOM is fully loaded.
 */
const init = () => {
  initTypingEffect();
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
