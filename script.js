function showSection(sectionId) {
    // Hide all sections first
    var sections = document.getElementsByClassName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show the selected section
    var section = document.getElementById(sectionId);
    if (section) {
        section.style.display = "block";
        
        // Show the right column when a section is shown
        document.getElementById("right-column").style.display = "block";
    }
}
