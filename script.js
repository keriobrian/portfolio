// This file handles a few interactions:
// 1. Wave background animation that happens on scroll
// 2. The hover over the projects shows a project image that follows the cursor
// 3. Hover over the contact button changes the bg color of the whole page

// Only run anything after the page has loaded
window.addEventListener("load", fn, false);

// Everything goes into this function 👇🏾
function fn() {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	// Get DOM elements
	const root = document.querySelector(":root");
	const area = document.querySelector(".projects");
	const contact = document.querySelector(".email");
	const skillsSection = document.querySelector(".skills");
	const workSection = document.querySelector(".work");

	// Hook event listeners
	document.addEventListener("scroll", scroll);
	area.addEventListener("mousemove", mousemove);
	contact.addEventListener("mouseenter", mouseenter);
	contact.addEventListener("mouseleave", mouseleave);

	// Setup an observer
	const options = {
		root: null,
		threshold: 0.5,
	};

	const callback = function (entries, observer) {
		entries.forEach((entry) => {
			entry.isIntersecting && entry.target.classList.add("is-visible");
		});
	};

	const observer = new IntersectionObserver(callback, options);

	observer.observe(skillsSection);
	observer.observe(workSection);

	function scroll() {
		const factor = 0.25;
		root.style.setProperty("--scroll-y", `-${window.scrollY * factor}px`);
	}

	function mousemove(e) {
		const x = e.offsetX;
		const y = e.offsetY;

		root.style.setProperty("--pos-x", `${x}px`);
		root.style.setProperty("--pos-y", `${y}px`);
	}

	function mouseenter() {
		root.style.setProperty("--contact-bg-opacity", 1);
	}

	function mouseleave() {
		root.style.removeProperty("--contact-bg-opacity");
	}
}
