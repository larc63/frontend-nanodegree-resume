/*global $*/
/*global bio*/
/*global work*/
/*global projects*/
/*global education*/
/*global googleMap*/
//
//function ResumeBuilder() {
//    "use strict";
//    var i, job;
//    this.addAll = function () {
//        bio.displayBio();
//        bio.displayContacts();
//        bio.displaySkills();
//        projects.displayProjects();
//        work.displayWorkExperience();
//        education.displayEducation();
//        $("#mapDiv").append(googleMap);
//        this.hideEmptyDivs();
//    };
//
//    this.hideEmptyDivs = function () {
//        if (document.getElementsByClassName('flex-item').length === 0) {
//            document.getElementById('topContacts').style.display = 'none';
//        }
//        if (document.getElementsByTagName('h1').length === 0) {
//            document.getElementById('header').style.display = 'none';
//        }
//        if (document.getElementsByClassName('work-entry').length === 0) {
//            document.getElementById('workExperience').style.display = 'none';
//        }
//        if (document.getElementsByClassName('project-entry').length === 0) {
//            document.getElementById('projects').style.display = 'none';
//        }
//        if (document.getElementsByClassName('education-entry').length === 0) {
//            document.getElementById('education').style.display = 'none';
//        }
//        if (document.getElementsByClassName('flex-item').length === 0) {
//            document.getElementById('letsConnect').style.display = 'none';
//        }
//        if (document.getElementById('google-map') === undefined) {
//            document.getElementById('mapDiv').style.display = 'none';
//        }
//    };
//}
//
//new ResumeBuilder().addAll();

var Job(data){
    this.employer = data.employer;
    this.title = data.title;
    this.location = data.location;
    this.dates = data.dates;
    this.brief = data.brief;
    this.description = data.description;
    this.roles = data.roles;
    this.url = data.url;
};

var ViewModel = function () {
    var self = this;
    this.name = ko.observable(data.bio.name);
    this.role = ko.observable(data.bio.role);
    this.skills = ko.observableArray([]);
    for (i in data.bio.skills) {
        this.skills.push({
            skill: data.bio.skills[i]
        });
    }

    this.rows = ko.computed(function () {
        var result = [],
            row,
            colLength = 2;

        //loop through items and push each item to a row array that gets pushed to the final result
        for (var i = 0, j = data.bio.skills.length; i < j; i++) {
            if (i % colLength === 0) {
                if (row) {
                    result.push(row);
                }
                row = [];
            }
            row.push({skill: data.bio.skills[i]});
        }

        //push the final row  
        if (row) {
            result.push(row);
        }

        return result;
    }, this);

};

ko.applyBindings(new ViewModel()); // This makes Knockout get to work