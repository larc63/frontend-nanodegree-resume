/*global $*/
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
var bio = {
    "name": "Luis A. Rodriguez",
    "role": "Senior Software Developer",
    "welcomeMessage": "Hello!",
    "skills": [
        "Java",
        "C/C++/Objective-C",
        "Mobile Platforms: iOS, Android (NDK, AOSP), J2ME",
        "HTML, CSS, JavaScript",
        "Glue: Java Native Interface, Lua glue, JSObject"
    ],
    "contacts": {
        "mobile": "+1 972-850-6310",
        "email": "larc63@gmail.com",
        "twitter": "@larc63",
        "github": "larc63",
        "location": "Dallas, TX"
    },
    "displayBio": function () {
        "use strict";
        $("#header").prepend(HTMLheaderRole.replace("%data%", this.role));
        $("#header").prepend(HTMLheaderName.replace("%data%", this.name));
    },
    "displayContacts": function () {
        "use strict";
        var c;
        for (c in this.contacts) {
            if (this.contacts.hasOwnProperty(c)) {
                $("#footerContacts").append(HTMLcontactGeneric.replace("%data%", this.contacts[c]).replace("%contact%", c));
                $("#footerContactsInner").append(HTMLcontactGeneric.replace("%data%", this.contacts[c]).replace("%contact%", c));
            }
        }
    },
    "displaySkills": function () {
        "use strict";
        var i;
        $("#skillsDiv").append(HTMLskillsStart);
        for (i = 0; i < this.skills.length; i += 1) {
            $("#skillsDiv").append(HTMLskills.replace("%data%", this.skills[i]));
        }
    }
};

var work = {
    "jobs": [
        {
            "employer": "Texas Instruments",
            "title": "System Engineer",
            "location": "Dallas, TX",
            "dates": "November 2010 - Present",
            "description": "Create functional models for new features to be implemented on future releases of the company's client product lines. The product lines have source code written in different languages and architectures, as a System Engineer, the design and implementation of functionalities often require visiting all of these different layers",
            "roles": [
                "C/C++/Objective-C",
                "Worked with the team reposinsible for re-imagining and rewriting legacy products into more modern UI/UX and their corresponding architectures and languages.",
                "Part of the team that implemented HTML5 emulators for z80-based devices which have gone through our client's pilots involving 800k users without any reported issues.",
                "Compiled and modified the AOSP to research VNC server possibilities; test target at the time was an OMAP dev board.",
                "Worked in conjunction with the product managers and development leads to determine software requirements.",
                "Worked in conjunction with the development team to refactor the usage of JNI, improving performance and memory usage.",
                "Designed and implemented some of the infrastructure necessary to create new classroom activities using the Lua scripting language. The C counterpart for the Lua bindings, as well as the Lua engine itself gets cross-compiled to run on different platform including iOS, Nucleus and desktop operating systems."
            ],
            "url": "http://education.ti.com"
        },
        {
            "employer": "Digital Chocolate",
            "title": "Game Engineering Manager",
            "location": "Mexicali, B. C.",
            "dates": "June 2009 - October 2010",
            "description": "Coordinating project planning for various carriers in the US, working in conjunction with the sales and marketing teams to reduce production costs and improve revenue. Lead and mentor the engineering team, offering tutorials where needed. Ported a 3D game from the iPhone platform to Brew using OpenGL ES. Created client module for Qualcomm's Application Value Billing API in conjunction with the team in Bangalore, India. Aided the creation team to reduce the footprint for their project; done in j2me, targeting a device with strict hardware constraints.",
            "roles": [],
            "url": "http://en.wikipedia.org/wiki/Digital_Chocolate"
        },
        {
            "employer": "LemonQuest",
            "title": "iPhone Lead Programmer.",
            "location": "Salamanca, Spain",
            "dates": "April 2008 to June 2009",
            "description": "Developing games and applications for the iPhone OS. Coordinated development with a geographically distributed team. Prompted the company to implement updates to infrastructure to improve productivity.",
            "roles": [
                "Tool Programmer. Aided in the development of a stage editor for a game, done in Java. (April 2008 to May 2008)",
                "Circulate and Circulate Prologue. Originally a PC based game; it was ported to the iPhone platform. With this game, as in previous products we attempted to use every user-friendly feature on the iPhone, including it's 3d sound capabilities and the accelerometer. This game earned a bronze medal from pocketgamer.co.uk."
            ],
            "url": "http://www.ign.com/companies/lemonquest"
        },
        {
            "employer": "Gameloft",
            "title": "iPhone Programmer",
            "location": "Mexicali, Baja California, Mexico",
            "dates": "August 2005 to March 2008",
            "description": "Part of a team doing R&D for the iPhone OS, taking pieces of code from different platforms in order to exploit the full capabilities of the iPhone. This development team was the first to have a game ported on to the iPhone for the company, giving our local studio an edge against the other competing offices within the company.",
            "roles": [],
            "url": "http://www.gameloft.com"
        }
    ],
    "displayWorkExperience": function () {
        "use strict";
        var job;
        for (job = 0; job < this.jobs.length; job += 1) {
            $("#workExperience").append(HTMLworkStart);
            $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", this.jobs[job].employer).replace("%url%", this.jobs[job].url) + HTMLworkTitle.replace("%data%", this.jobs[job].title));
            $(".work-entry:last").append(HTMLworkDates.replace("%data%", this.jobs[job].dates));
            $(".work-entry:last").append(HTMLworkLocation.replace("%data%", this.jobs[job].location));
            $(".work-entry:last").append(HTMLworkDescription.replace("%data%", this.jobs[job].description));
        }
    }
};

var projects = {
    "projects": [
        {
            "title": "Chinese Characters",
            "location": "Mexicali, Baja California, Mexico",
            "dates": "2009",
            "description": "Chinese character writing tutor for the iPhone",
            "images": [
                "images/ChineseCharacters/thumb.jpeg",
                "images/ChineseCharacters/01.jpeg",
                "images/ChineseCharacters/02.jpeg",
                "images/ChineseCharacters/03.jpeg",
                "images/ChineseCharacters/04.jpeg",
                "images/ChineseCharacters/05.jpeg"
            ]
        },
        {
            "title": "Big 2 Poker",
            "location": "Mexicali, Baja California, Mexico",
            "dates": "2010",
            "description": "Card game for the iPhone and made all graphics.",
            "images": [
                "images/Big2Poker/thumb.jpeg",
                "images/Big2Poker/01.jpeg",
                "images/Big2Poker/02.jpeg",
                "images/Big2Poker/03.jpeg",
                "images/Big2Poker/04.jpeg",
                "images/Big2Poker/05.jpeg"
            ]
        }
    ],
    "displayProjects": function () {
        "use strict";
        var p, s;
        for (p = 0; p < this.projects.length; p += 1) {
            $("#projects").append(HTMLprojectStart);
            s = HTMLprojectTitle.replace("%data%", this.projects[p].title);
            s += HTMLprojectDates.replace("%data%", this.projects[p].dates);
            s += HTMLprojectDescription.replace("%data%", this.projects[p].description);
            $(".project-entry:last").append(s);
            if (typeof this.projects[p].images[0] === "string") {
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", this.projects[p].images[0]));
            }
        }
    }
};

var education = {
    "schools": [
        {
            "name": "Centro de Investigación Científica y Educacion Superior de Ensenada",
            "location": "Ensenada, B. C., Mexico",
            "degree": "Master's",
            "majors": [
                "Electronics and Telecommunications"
            ],
            "dates": "2002 - 2005",
            "url": "http://www.cicese.edu.mx/"
        },
        {
            "name": "Instituto Tecnológico y de Estudios Superiores de Monterrey ",
            "location": "Monterrey, N. L.",
            "degree": "Bachelor's",
            "majors": [
                "Electronics Systems Engineering"
            ],
            "dates": "1997-2001",
            "url": "http://www.itesm.mx/"
        }
    ],
    "onlineCourses": [
        {
            "title": "Javascript Basics",
            "school": "Udacity",
            "dates": "2014",
            "url": "https://www.udacity.com/course/ud804"
        },
        {
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "dates": "2014",
            "url": "https://www.udacity.com/course/ud304"
        },
        {
            "title": "HTML5 Game Development",
            "school": "Udacity",
            "dates": "2014",
            "url": "https://www.udacity.com/course/cs255",
            "certificate": "res/CS255.pdf"
        },
        {
            "title": "jQuery",
            "school": "Codecademy",
            "dates": "2013",
            "url": "http://www.codecademy.com/tracks/jquery"
        },
        {
            "title": "JavaScript",
            "school": "Codecademy",
            "dates": "2013",
            "url": "http://www.codecademy.com/tracks/javascript"
        },
        {
            "title": "Software Testing",
            "school": "Udacity",
            "dates": "2012",
            "url": "https://www.udacity.com/course/cs258",
            "certificate": "res/CS258.pdf"
        },
        {
            "title": "Web Application Engineering",
            "school": "Udacity",
            "dates": "2012",
            "url": "https://www.udacity.com/course/cs253",
            "certificate": "res/CS253.pdf"
        },
        {
            "title": "Artificial Intellingence for Robotics",
            "school": "Udacity",
            "dates": "2012",
            "url": "https://www.udacity.com/course/cs373",
            "certificate": "res/CS373.pdf"
        },
        {
            "title": "Introduction to Artificial Intelligence",
            "school": "Udacity",
            "dates": "2011",
            "url": "http://www.ai-class.com",
            "certificate": "res/AI_letter_signed.pdf"
        }
    ],
    "displayEducation": function () {
        "use strict";
        var s, courseString;
        for (s = 0; s < this.schools.length; s += 1) {
            $("#education").append(HTMLschoolStart);
            $(".education-entry:last").append(HTMLschoolName.replace("%data%", this.schools[s].name));
            $(".education-entry:last").append(HTMLschoolDegree.replace("%data%", this.schools[s].degree));
            $(".education-entry:last").append(HTMLschoolDates.replace("%data%", this.schools[s].dates));
            $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", this.schools[s].location));
            $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", this.schools[s].majors[0]));
        }
        $("#education").append(HTMLonlineClasses);
        this.onlineCourses.reverse();
        for (s = 0; s < this.onlineCourses.length; s += 1) {
            courseString = HTMLonlineStart;
            courseString += HTMLonlineTitle.replace("%data%", this.onlineCourses[s].title);
            courseString += HTMLonlineSchool.replace("%data%", this.onlineCourses[s].school);
            courseString += HTMLonlineURL.replace("%data%", this.onlineCourses[s].url).replace("%data%", this.onlineCourses[s].url);
            $("#education").after(courseString);
        }
    }
};