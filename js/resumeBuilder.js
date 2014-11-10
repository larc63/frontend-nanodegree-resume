/*global $*/
/*global data*/
/*global googleMap*/
/*global HTMLheaderRole*/
/*global HTMLheaderName*/
/*global HTMLskills*/
/*global HTMLskillsStart*/
/*global HTMLworkStart*/
/*global HTMLworkEmployer*/
/*global HTMLworkTitle*/
/*global HTMLworkDates*/
/*global HTMLworkLocation*/
/*global HTMLworkDescription*/
/*global HTMLprojectStart*/
/*global HTMLprojectTitle*/
/*global HTMLprojectDates*/
/*global HTMLprojectDescription*/
/*global HTMLprojectImage*/
/*global HTMLcontactGeneric*/
/*global HTMLschoolStart*/
/*global HTMLschoolName*/
/*global HTMLschoolDegree*/
/*global HTMLschoolDates*/
/*global HTMLschoolLocation*/
/*global HTMLschoolMajor*/
/*global HTMLonlineClasses*/
/*global HTMLonlineStart*/
/*global HTMLonlineTitle*/
/*global HTMLonlineSchool*/
/*global HTMLonlineURL*/
/*global HTML*/
/*global HTML*/

function ResumeBuilder() {
    "use strict";
    var i, job;
    this.addAll = function () {
        this.displayBio();
        this.displayContacts();
        this.displaySkills();
        this.displayWorkExperience();
        this.displayProjects();
        this.displayEducation();
        $("#mapDiv").append(googleMap);
        this.hideEmptyDivs();
    };

    this.displaySkills = function () {
        $("#skillsDiv").append(HTMLskillsStart);
        for (i = 0; i < data.bio.skills.length; i += 1) {
            $("#skillsDiv").append(HTMLskills.replace("%data%", data.bio.skills[i]));
        }
    };

    this.displayBio = function () {
        $("#header").prepend(HTMLheaderRole.replace("%data%", data.bio.role));
        $("#header").prepend(HTMLheaderName.replace("%data%", data.bio.name));
    };

    this.displayWorkExperience = function () {
        for (job = 0; job < data.work.jobs.length; job += 1) {
            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", data.work.jobs[job].employer).replace("%url%", data.work.jobs[job].url) + HTMLworkTitle.replace("%data%", data.work.jobs[job].title));
            $(".work-entry:last").append(HTMLworkDates.replace("%data%", data.work.jobs[job].dates));
            $(".work-entry:last").append(HTMLworkLocation.replace("%data%", data.work.jobs[job].location));
            $(".work-entry:last").append(HTMLworkDescription.replace("%data%", data.work.jobs[job].description));
        }
    };

    this.displayProjects = function () {
        var p, s;
        for (p = 0; p < data.projects.projects.length; p += 1) {
            $("#projects").append(HTMLprojectStart);
            s = HTMLprojectTitle.replace("%data%", data.projects.projects[p].title);
            s += HTMLprojectDates.replace("%data%", data.projects.projects[p].dates);
            s += HTMLprojectDescription.replace("%data%", data.projects.projects[p].description);
            $(".project-entry:last").append(s);
            if (typeof data.projects.projects[p].images[0] === "string") {
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", data.projects.projects[p].images[0]));
            }
        }
    };

    this.displayContacts = function () {
        var c;
        for (c in data.bio.contacts) {
            if (data.bio.contacts.hasOwnProperty(c)) {
                $("#footerContacts").append(HTMLcontactGeneric.replace("%data%", data.bio.contacts[c]).replace("%contact%", c));
                $("#footerContactsInner").append(HTMLcontactGeneric.replace("%data%", data.bio.contacts[c]).replace("%contact%", c));
            }
        }
    };

    this.displayEducation = function () {
        var s, courseString;
        for (s = 0; s < data.education.schools.length; s += 1) {
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(HTMLschoolName.replace("%data%", data.education.schools[s].name));
            $(".education-entry:last").append(HTMLschoolDegree.replace("%data%", data.education.schools[s].degree));
            $(".education-entry:last").append(HTMLschoolDates.replace("%data%", data.education.schools[s].dates));
            $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", data.education.schools[s].location));
            $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", data.education.schools[s].majors[0]));
        }
        $("#education").append(HTMLonlineClasses);
        data.education.onlineCourses.reverse();
        for (s = 0; s < data.education.onlineCourses.length; s += 1) {
            courseString = HTMLonlineStart;
            courseString += HTMLonlineTitle.replace("%data%", data.education.onlineCourses[s].title);
            courseString += HTMLonlineSchool.replace("%data%", data.education.onlineCourses[s].school);
            courseString += HTMLonlineURL.replace("%data%", data.education.onlineCourses[s].url).replace("%data%", data.education.onlineCourses[s].url);
            $("#education").after(courseString);
        }
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