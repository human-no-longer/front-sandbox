// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = ".the-fixed-child";
function findCulprits(elem) {
  if (!elem) {
    throw new Error("Could not find element with that selector");
  }
  let parent = elem.parentElement;
  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== "visible") {
      console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));

/*
  If you intend for an element to sit right against the edge of the viewport, you might discover a thin 1px gap between the element and the edge in Chrome.

This is a rounding issue with fractional pixels. I've solved this issue by insetting the sticky element by a single pixel:

header {
  position: sticky;
  top: -1px; // -1px instead of 0px 
}
*/
