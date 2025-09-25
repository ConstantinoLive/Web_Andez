document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { 
            threshold: 0.6,
            //rootMargin: '0px 0px -10% 0px'
        }
    );

    document.querySelectorAll(".content").forEach((el) => {
        observer.observe(el);
    });
    document.querySelectorAll(".fraseFooter").forEach((el) => {
        observer.observe(el);
    });
    document.querySelectorAll(".listaFooter").forEach((el) => {
        observer.observe(el);
    });
});