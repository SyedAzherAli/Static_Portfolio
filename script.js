document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
    const headers = document.querySelectorAll("h1"); // added

    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute("href").substring(1) === sectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute("href").substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            setActiveLink(sectionId);
            // added: focus on header
            document.querySelector(`#${sectionId} h1`).focus();
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});