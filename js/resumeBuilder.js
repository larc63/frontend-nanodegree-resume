var work = {
  "jobs" : [
  {
    "employer": "Texas Instruments",
    "title" : "System Engineer",
    "location": "Dallas, TX",
    "dates" : "November 2010 - Present",
    "description" : "Create functional models for new features to be implemented on future releases of the company's client product lines. The product lines have source code written in different languages and architectures, as a System Engineer, the design and implementation of functionalities often require visiting all of these different layers",
    "roles" : [	"C/C++/Objective-C",
		"Worked with the team reposinsible for re-imagining and rewriting legacy products into more modern UI/UX and their corresponding architectures and languages.",
		"Part of the team that implemented HTML5 emulators for z80-based devices which have gone through our client's pilots involving 800k users without any reported issues.",
		"Compiled and modified the AOSP to research VNC server possibilities; test target at the time was an OMAP dev board.",
		"Worked in conjunction with the product managers and development leads to determine software requirements.",
		"Worked in conjunction with the development team to refactor the usage of JNI, improving performance and memory usage.",
		"Designed and implemented some of the infrastructure necessary to create new classroom activities using the Lua scripting language. The C counterpart for the Lua bindings, as well as the Lua engine itself gets cross-compiled to run on different platform including iOS, Nucleus and desktop operating systems."]
  },
  {
    "employer": "Digital Chocolate",
    "title" : "Game Engineering Manager",
    "location": "Mexicali, B. C.",
    "dates" : "June 2009 - October 2010",
    "description" : "Coordinating project planning for various carriers in the US, working in conjunction with the sales and marketing teams to reduce production costs and improve revenue. Lead and mentor the engineering team, offering tutorials where needed. Ported a 3D game from the iPhone platform to Brew using OpenGL ES. Created client module for Qualcomm's Application Value Billing API in conjunction with the team in Bangalore, India. Aided the creation team to reduce the footprint for their project; done in j2me, targeting a device with strict hardware constraints.",
    "roles" : []
  },
  {
    "employer" : "LemonQuest",
    "title" : "iPhone Lead Programmer.",
    "location" : "Salamanca, Spain",
    "dates" : "April 2008 to June 2009",
    "description" : "Developing games and applications for the iPhone OS. Coordinated development with a geographically distributed team. Prompted the company to implement updates to infrastructure to improve productivity.",
    "roles" : ["Tool Programmer. Aided in the development of a stage editor for a game, done in Java. (April 2008 to May 2008)", "Circulate and Circulate Prologue. Originally a PC based game; it was ported to the iPhone platform. With this game, as in previous products we attempted to use every user-friendly feature on the iPhone, including it\'s 3d sound capabilities and the accelerometer. This game earned a bronze medal from pocketgamer.co.uk."]
  },
  {	
    "employer" : "Gameloft",
    "title" : "iPhone Programmer",
    "location" : "Mexicali, Baja California, Mexico",
    "dates" : "August 2005 to March 2008",
    "description" : "Part of a team doing R&D for the iPhone OS, taking pieces of code from different platforms in order to exploit the full capabilities of the iPhone. This development team was the first to have a game ported on to the iPhone for the company, giving our local studio an edge against the other competing offices within the company.",
    "roles" : []
  },
//   {	
//     "employer" : "",
//     "title" : "",
//     "location" : "",
//     "dates" : "",
//     "description" : "",
//     "roles" : []
//   }
  ]
};

var projects = {
  "projects" : [
  {
    "title" : "Chinese Characters",
    "location": "Mexicali, Baja California, Mexico",
    "dates" : "2009",
    "description" : "Chinese character writing tutor for the iPhone",
    "images" : []
  },
  {
    "title" : "Big 2 Poker",
    "location": "Mexicali, Baja California, Mexico",
    "dates" : "2010",
    "description" : "Card game for the iPhone and made all graphics.",
    "images" : []
  },
  {
    "title" : "",
    "location": "Mexicali, Baja California, Mexico",
    "dates" : "2010",
    "description" : "",
    "images" : []
  },
  {
    "title" : "",
    "location": "Mexicali, Baja California, Mexico",
    "dates" : "2010",
    "description" : "",
    "images" : []
  }
  ]
};

var bio = {
    "name": "Luis A. Rodriguez",
    "role": "Senior Software Developer",
    "welcomeMessage": "Hello!",
    "skills": [
        "Java",
//         "Internet protocols (HTTP, FTP, etc.)",
        "C/C++/Objective-C",
//         "Apache, PHP, ASP",
        "Mobile Platforms: iOS, Android (NDK, AOSP), J2ME",
//         "Platforms: Unix/Linux, Mac OS, Windows",
//         "Adobe Photoshop, Gimp",
//         "SQL, Access, MySQL",
        "HTML, CSS, JavaScript",
        "Glue: Java Native Interface, Lua glue, JSObject"
//         "Build scripts Ant, make, jam, Perl, Python, Batch files",
//         "Traditional and digital photographic processes",
//         "Version Control Software (Accurev, SVN, git)",
//         "Network Programming (sockets, http, RPC)"
    ],
    "contacts": {
        "mobile": "972-850-6310",
        "email": "larc63@gmail.com",
        "twitter": "larc63",
        "github": "larc63",
        "location": "Dallas, TX"
    }
};

var education = {
  "schools" : [
    {
      "name" : "Centro de Investigación Científica y Educación Superior de Ensenada",
      "location" : "Ensenada, Baja California, Mexico",
      "degree" : "Master's",
      "majors" : ["Electronics", "Robotics"],
      "dates" : "2002 - 2005",
      "url" : "http://www.cicese.edu.mx/"
    },
    {
      "name" : "Instituto Tecnológico y de Estudios Superiores de Monterrey ",
      "location" : "Monterrey, N. L.",
      "degree" : "Bachelor's",
      "majors" : ["Electronics"],
      "dates" : "1997-2001",
      "url" : "http://www.itesm.mx/"
    }
  ],
  "onlineCourses" : [
    {
      "title" : "HTML5 Game Development",
      "school" : "Udacity",
      "dates" : "2014",
      "url" : "https://www.udacity.com/course/cs255"
    }

  ]
};

$("#header").prepend(HTMLheaderRole.replace("%data%", bio.role));
$("#header").prepend(HTMLheaderName.replace("%data%", bio.name));

bio.displaySkills = function(){
  $("#header").append(HTMLskillsStart);
  for(var i in bio.skills){
    $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
  }
}
bio.displaySkills();

for(var job in work.jobs){
  $("#workExperience").append(HTMLworkStart);
  $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", work.jobs[job].employer) + HTMLworkTitle.replace("%data%", work.jobs[job].title));
  $(".work-entry:last").append(HTMLworkDates.replace("%data%", work.jobs[job].dates));
  $(".work-entry:last").append(HTMLworkLocation.replace("%data%", work.jobs[job].location));
  $(".work-entry:last").append(HTMLworkDescription.replace("%data%", work.jobs[job].description));
}

var inName = function(){
  var a = "Sebastian Thrun".split(" ");
  a[0] = a[0].toLowerCase();
  a[0] = a[0][0].toUpperCase();
  a[1] = a[1].toUpperCase();

  return a.join(" ");
};

// $("#main").append(internationalizeButton);

projects.display = function(){
  for(var p in projects.projects){
    $("#projects").append(HTMLprojectStart);
    $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[p].title));
    $(".project-entry:last").append(HTMLprojectDates.replace("%data%", projects.projects[p].dates));
    $(".project-entry:last").append(HTMLprojectDescription.replace("%data%", projects.projects[p].description));
    for(var i in projects.projects[p].images){
      $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[p].images[i]));
    }
  }
}

projects.display();


$("#mapDiv").append(googleMap);
