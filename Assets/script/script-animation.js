// apparrition en fonction de scrolling
const ratio = 0.3;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: ratio,
};

const detectionIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add("reveleContent");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(detectionIntersect, options);
document.querySelectorAll(".cacheContent").forEach((cache) => {
  observer.observe(cache);
});