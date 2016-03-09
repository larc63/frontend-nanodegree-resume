/* global ko*/
/* global data*/
/* global data2*/
/* global window*/
/* global document*/
var Course = function (data) {
    this.title = data.title;
    this.school = data.school;
    this.dates = data.dates;
    this.url = data.url;
    this.certificate = data.certificate;
};

var School = function (data) {
    this.name = data;
};

var Project = function (data) {
    var self = this;
    this.name = data.title;
    this.date = data.date;
    this.details = ko.observableArray([]);
    if (data.details) {
        data.details.forEach(function (d) {
            self.details.push({
                "detail": d
            });
        });
    }
};

var Job = function (data) {
    this.name = data.name;
    this.date = data.date;
};

var ViewModel = function () {
    var self = this,
        j;
    this.dummyObservable = ko.observable();
    this.name = ko.observable(data.bio.name);
    this.role = ko.observable(data.bio.role);
    this.email = ko.observable(data2.bio.email);
    this.emailurl = ko.computed(function () {
        return 'mailto:' + this.email();
    }, this);
    this.mobile = ko.observable(data2.bio.phone);
    this.mobileurl = ko.computed(function () {
        return 'callto:' + this.mobile();
    }, this);
    this.twitter = ko.observable(data2.bio.twitter);
    this.twitterurl = ko.computed(function () {
        return 'http://www.twitter.com/' + this.twitter();
    }, this);
    this.linkedin = ko.observable(data2.bio.linkedin);
    this.linkedinurl = ko.computed(function () {
        return 'https://www.linkedin.com/in/' + this.linkedin();
    }, this);
    this.github = ko.observable(data2.bio.github);
    this.githuburl = ko.computed(function () {
        return 'https://github.com/' + this.github();
    }, this);


    this.skills = ko.computed(function () {
        var result = [],
            row,
            colLength = (window.innerWidth / 180) >> 0;

        this.dummyObservable();

        //loop through items and push each item to a row array that gets pushed to the final result
        for (var i = 0, j = data2.skills.skills.length; i < j; i++) {
            if (i % colLength === 0) {
                if (row) {
                    result.push(row);
                }
                row = [];
            }
            row.push({
                skill: data2.skills.skills[i]
            });
        }

        //push the final row  
        if (row) {
            result.push(row);
        }

        return result;
    }, this);

    self.jobs = ko.observableArray([]);
    for (j in data2.work_experience.jobs) {
        this.jobs.push(new Job(data2.work_experience.jobs[j]));
    }

    self.projects = ko.observableArray([]);
    for (var p in data2.projects.projects) {
        this.projects.push(new Project(data2.projects.projects[p]));
    }

    self.schools = ko.observableArray([]);
    for (p in data2.education.schools) {
        this.schools.push(new School(data2.education.schools[p]));
    }

    self.courses = ko.observableArray([]);
    for (p in data.education.onlineCourses) {
        this.courses.push(new Course(data.education.onlineCourses[p]));
    }
    this.coursesDisplay = ko.computed(function () {
        var result = [],
            row = [],
            colLength = (window.innerWidth / 750) >> 0;
        this.dummyObservable();
        //loop through items and push each item to a row array that gets pushed to the final result
        for (var i = 0, j = data.education.onlineCourses.length; i < j; i++) {
            if (i % colLength === 0) {
                if (row) {
                    result.push(row);
                }
                row = [];
            }
            row.push({
                course: data.education.onlineCourses[i]
            });
        }

        //push the final row  
        if (row) {
            result.push(row);
        }

        return result;
    }, this);
};

ViewModel.prototype.resizeListener = function () {
    this.dummyObservable.notifySubscribers();
};
var vm = new ViewModel();

ko.applyBindings(vm); // This makes Knockout get to work

window.addEventListener('resize', function () {
    vm.resizeListener();
}, true);


window.addEventListener('load', function () {
    console.log("type the konami code!");
});
var secret = ["Up", "Up", "Down", "Down", "Left", "Right", "Left", "Right", "U+0042", "U+0041", "U+0042", "U+0041"];
var input = [];
var timer;
window.addEventListener('keyup', function (e) {
    console.log(e.keyIdentifier);
    var index = input.length;
    if (e.keyIdentifier === secret[index]) {
        input.push(e.keyIdentifier);
        console.log(input);
    }
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
        input = [];
    }, 500);
    if (input.length === secret.length) {
        var oldlink = document.getElementsByTagName("link").item(0);
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", "css/alternate-style.css");
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);

    }
});