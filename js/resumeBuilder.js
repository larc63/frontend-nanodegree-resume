var Course = function (data) {
    this.title = data.title;
    this.school = data.school;
    this.dates = data.dates;
    this.url = data.url;
    this.certificate = data.certificate;
}

var School = function (data) {
    this.name = data.name;
    this.location = data.location;
    this.degree = data.degree;
    this.major = data.major;
    this.dates = data.dates;
    this.url = data.url;
}

var Project = function (data) {
    this.name = data.name;
    this.description = data.description;
}

var Job = function (data) {
    this.employer = data.employer;
    this.title = data.title;
    this.location = data.location;
    this.dates = data.dates;
    this.brief = data.brief;
    this.description = data.description;
    this.roles = ko.observableArray([]);
    for (r in data.roles) {
        this.roles.push({
            role: data.roles[r]
        });
    }
    this.url = data.url;
};

var ViewModel = function () {
    var self = this;
    this.dummyObservable = ko.observable();
    this.name = ko.observable(data.bio.name);
    this.role = ko.observable(data.bio.role);
    this.email = ko.observable(data.bio.contacts.email);
    this.emailurl = ko.computed(function(){return 'mailto:' + this.email()}, this);
    this.mobile = ko.observable(data.bio.contacts.mobile);
    this.mobileurl = ko.computed(function(){return 'callto:' + this.mobile()}, this);
    
    
    this.skills = ko.computed(function () {
        var result = [],
            row,
            colLength = (window.innerWidth / 300) >> 0;
            
        this.dummyObservable();

        //loop through items and push each item to a row array that gets pushed to the final result
        for (var i = 0, j = data.bio.skills.length; i < j; i++) {
            if (i % colLength === 0) {
                if (row) {
                    result.push(row);
                }
                row = [];
            }
            row.push({
                skill: data.bio.skills[i]
            });
        }

        //push the final row  
        if (row) {
            result.push(row);
        }

        return result;
    }, this);

    this.jobs = ko.observableArray([]);
    for (j in data.work.jobs) {
        this.jobs.push(new Job(data.work.jobs[j]));
    }

    this.projects = ko.observableArray([]);
    for (p in data.projects.projects) {
        this.projects.push(new Project(data.projects.projects[p]));
    }

    this.schools = ko.observableArray([]);
    for (p in data.education.schools) {
        this.schools.push(new School(data.education.schools[p]));
    }

    this.courses = ko.observableArray([]);
    for (p in data.education.onlineCourses) {
        this.courses.push(new Course(data.education.onlineCourses[p]));
    }
    this.coursesDisplay = ko.computed(function () {
        var result = [],
            row,
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
}
var vm = new ViewModel();

ko.applyBindings(vm); // This makes Knockout get to work

window.addEventListener('resize', function () {
    vm.resizeListener();
}, true);