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

function goToUrl(url) {
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class 'profession_type_1'
    const professionItems = document.querySelectorAll('.profession_type_1, .profession_type_2');

    professionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle the 'large-width' class
            item.classList.toggle('large-width');

            // Adjust visibility of .descr based on current state
            const isExpanded = item.classList.contains('large-width');
            const descr = item.querySelector('.descr');
            if (descr) {
                descr.style.display = isExpanded ? 'block' : 'none';
            }
        });
    });
});


function showPicture(button) {
    const parent = button.parentElement;
    const imgElement = parent.querySelector(".award_pict");
    const button_name = button.classList[0];

    if (button_name == "next_button") {
        imgElement.setAttribute("src", "images/cagin (4).png")
        const button = parent.querySelector(".next_button");
        button.setAttribute("src", "images/buttons/back_button.png");
        button.setAttribute("class", "back_button");
    }
    else {
        imgElement.setAttribute("src", "images/cagin (3).png")
        const button = parent.querySelector(".back_button");
        button.setAttribute("src", "images/buttons/next_button.png");
        button.setAttribute("class", "next_button");
    }
}
