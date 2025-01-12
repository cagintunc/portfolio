
function showSection(sectionId) {
    const width = window.innerWidth;
    const height = window.innerHeight;    
    console.log(width, height);
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
    const contact_tmp = document.getElementById("right-column");
    const left_column = document.getElementById("left-column");
    if(width > 1000) {
        if (sectionId === "contact") {
            
            if (contact_tmp) {
                contact_tmp.style.maxWidth = "50%";
                
            }
            
        } else {
            if (contact_tmp) {
                if (sectionId === "professions") {
                    contact_tmp.style.maxWidth = "50%";
                }
                else if (sectionId === "awards") {
                    contact_tmp.style.maxWidth = "50%";
                    
                }
                else if (sectionId === "education") {
                    contact_tmp.style.maxWidth = "70%"
                    
                }
                else {
                    contact_tmp.style.maxWidth = "35%";
                }
            }
        }
    } else {
        
        if (sectionId === "contact") {
            document.getElementById("contact").style.fontSize = "10px";    
            if (contact_tmp) {
                contact_tmp.style.minWidth = "90%";
            }
            
        } else {
            if (contact_tmp) {
                if (sectionId === "professions") {
                    document.getElementById("professions").style.fontSize = "10px";  
                    contact_tmp.style.maxWidth = "90%";
                }
                else if (sectionId === "awards") {
                    document.getElementById("awards").style.fontSize = "10px";  
                    contact_tmp.style.maxWidth = "90%";
                }
                else {
                    contact_tmp.style.maxWidth = "90%";
                }
            }
        }
    }
}

function showContactTable(button) {
    const className = button.className;
    let hiddenSection;
    if (className === "contact_1") {
        hiddenSection = document.getElementsByClassName("contact_table_1")[0];
    } else {
        hiddenSection = document.getElementsByClassName("contact_table_2")[0];
    }

    // Toggle display style between 'none' and 'block'
    if (hiddenSection.style.display === "none" || hiddenSection.style.display === "") {
        hiddenSection.style.display = "block";
    } else {
        hiddenSection.style.display = "none";
    }
}

function showAwardDesc(id) {
    const current_awards = document.getElementsByClassName("award_description");
    const arrow_icons = document.getElementsByClassName("down_arrow");
    var award = null;
    var icon = null;

    for (i=0;i<current_awards.length;i++) {
        if (current_awards[i].id == id) {
            award =current_awards[i];
            icon = arrow_icons[i];
            break;
        }
    }
    if (award.style.display === 'none' || award.style.display === "") {
        award.style.display = 'block';
        icon.src = "images/buttons/arrow_up_wight.png";
    } else {
        award.style.display = 'none';
        icon.src = "images/buttons/arrow_down_wight.png";
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


function showPicture(button, id) {
    const parent = button.parentElement;
    const imgElement = parent.querySelector(".award_pict");
    const button_name = button.classList[0];
    if (id == 2) {
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
    } else if(id == 3) {
        if (button_name === "next_button") {
            imgElement.setAttribute("src", "images/glb/DSC08644.JPG");
            const button = parent.querySelector(".next_button");
            button.setAttribute("src", "images/buttons/back_button.png");
            button.setAttribute("class", "back_button");
        }
        else {
            imgElement.setAttribute("src", "images/glb/DSC08668.JPG")
            const button = parent.querySelector(".back_button");
            button.setAttribute("src", "images/buttons/next_button.png");
            button.setAttribute("class", "next_button");
        }
    }
}

function showProjectDescription(id) {
    const width = window.innerWidth;
    const descriptions = document.getElementsByClassName("project_description");
    const match = descriptions[id-1];
    const arrow = document.getElementsByClassName("project_arrow_down")[id-1];
    const contact_tmp = document.getElementById("right-column");
    const project_container_table = document.getElementsByClassName("project_container_table");
    const project_videos_class = document.getElementsByClassName("project_video");

    if (match.style.display === "none" || match.style.display === "") {
        let video_array = [];
        if (is_project_video(project_videos_class, id)) {
            if (width > 900) {
                contact_tmp.style.maxWidth = "60%";
                for (i=0; i < project_videos_class.length;i++) {
                    video_array.push(project_videos_class[i].id);
                }
                for (i=0; i < project_container_table.length; i++) {
                    if(i != id-1) {
                        project_container_table[i].style.maxWidth = "45%";
                        if(descriptions[i].style.display === "block" && video_array.includes(project_container_table[i].id)) {
                            project_container_table[i].style.maxWidth = "95%";    
                        }
                    } else {
                        project_container_table[i].style.maxWidth = "95%";
                    }
                }
            } else {
                contact_tmp.style.maxWidth = "95%";
                for (i=0; i < project_videos_class.length;i++) {
                    video_array.push(project_videos_class[i].id);
                }
                for (i=0; i < project_container_table.length; i++) {
                    if(i != id-1) {
                        project_container_table[i].style.maxWidth = "95%";
                        if(descriptions[i].style.display === "block" && video_array.includes(project_container_table[i].id)) {
                            project_container_table[i].style.maxWidth = "95%";    
                        }
                    } else {
                        project_container_table[i].style.maxWidth = "95%";
                    }
                }
            }

        }

        match.style.display = "block";
        arrow.style.display = "none";
        

    } else {
        match.style.display = "none";
        arrow.style.display = "block";
        if (is_project_video(project_videos_class, id)) {
            if (width > 900) {
                project_container_table[id-1].style.maxWidth = "45%";
                check_videos(project_videos_class, id, 
                    contact_tmp, project_container_table, descriptions);
            } else {
                project_container_table[id-1].style.maxWidth = "95%";
                check_videos(project_videos_class, id, 
                    contact_tmp, project_container_table, descriptions);
            }
        }
    }
}

function is_project_video(array, id) {
    let result = false;
    for(i=0;i<array.length;i++) {
        if(array[i].id == id) {
            result = true;
        }
    }
    return result;
}

function check_videos(video_classes, id, 
    main_frame, project_frames, descriptions) {
        
        if (are_all_videos_closed(video_classes, descriptions)) {
            main_frame.style.maxWidth = "35%";
            for (i=0;i<project_frames.length;i++) {
                project_frames[i].style.maxWidth = "95%";
            }
        } 
    }

function are_all_videos_closed(video_classes, descriptions) {
    let result = true;
    for(i=0;i<video_classes.length; i++) {
        if (descriptions[video_classes[i].id-1].style.display === "block") {
            result=false;
            return result;
        }
    }
    return result;
}

