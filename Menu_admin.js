document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".fon_nav_index");
    const toggleBtn = document.querySelector(".btnlat");

    if (localStorage.getItem("sidebarState") === "collapsed") {
        sidebar.classList.add("sidebar-collapsed");
    }

    toggleBtn.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-collapsed");

        if (sidebar.classList.contains("sidebar-collapsed")) {
            localStorage.setItem("sidebarState", "collapsed");
        } else {
            localStorage.setItem("sidebarState", "expanded");
        }
    });
});
