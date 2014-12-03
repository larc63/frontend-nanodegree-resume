/*global $*/
/*global bio*/
/*global work*/
/*global projects*/
/*global education*/
/*global googleMap*/

function ResumeBuilder() {
    "use strict";
    var i, job;
    this.addAll = function () {
        bio.displayBio();
        bio.displayContacts();
        bio.displaySkills();
        projects.displayProjects();
        work.displayWorkExperience();
        education.displayEducation();
        $("#mapDiv").append(googleMap);
        this.hideEmptyDivs();
    };

    this.hideEmptyDivs = function () {
        if (document.getElementsByClassName('flex-item').length === 0) {
            document.getElementById('topContacts').style.display = 'none';
        }
        if (document.getElementsByTagName('h1').length === 0) {
            document.getElementById('header').style.display = 'none';
        }
        if (document.getElementsByClassName('work-entry').length === 0) {
            document.getElementById('workExperience').style.display = 'none';
        }
        if (document.getElementsByClassName('project-entry').length === 0) {
            document.getElementById('projects').style.display = 'none';
        }
        if (document.getElementsByClassName('education-entry').length === 0) {
            document.getElementById('education').style.display = 'none';
        }
        if (document.getElementsByClassName('flex-item').length === 0) {
            document.getElementById('letsConnect').style.display = 'none';
        }
        if (document.getElementById('google-map') === undefined) {
            document.getElementById('mapDiv').style.display = 'none';
        }
    };
}

new ResumeBuilder().addAll();