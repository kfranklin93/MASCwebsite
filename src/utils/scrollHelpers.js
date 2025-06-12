// Add this helper function to your component where needed:

const scrollToSection = (sectionId) => {
  const element = document.querySelector(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 100, // Adjust for navbar height
      behavior: 'instant' // Use instant instead of smooth
    });
  }
};

export { scrollToSection };