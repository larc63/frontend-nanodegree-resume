var work = {
  "jobs" : [
  {
    "employer": "Texas Instruments",
    "title" : "System Engineer",
    "location": "Dallas, TX",
    "dates" : "2010 - Present",
    "description" : "Create functional models for new features to be implemented on future releases of the company's client product lines. The product lines have source code written in different languages and architectures, as a System Engineer, the design and implementation of functionalities often require visiting all of these different layers"
  },
  {
    "employer": "Digital Chocolate",
    "title" : "Game Engineering Manager",
    "location": "Mexicali, B. C.",
    "dates" : "2009 - 2010",
    "description" : "Coordinating project planning for various carriers in the US, working in conjunction with the sales and marketing teams to reduce production costs and improve revenue."
  }
  ]
};

var projects = {
  "projects" : [
  {
    "title" : "iAarti",
    "location": "Mexicali, Mexico",
    "dates" : "2010",
    "description" : "Aarti application",
    "images" : []
  }
  ]
};

var bio = {
  "name" : "Luis Antonio Rodriguez",
  "role" : "System Engineer",
  "welcomeMessage" : "Hello!",
  "skills" : ["C/C++"],
  "contacts" : {
    "mobile" : "555-555-5555",
    "email" : "larc63@gmail.com",
    "twitter" : "larc63",
    "github" : "larc63",
    "location" : "Dallas, TX"
  }
};

var education = {
  "schools" : [
    {
      "name" : "Centro de Investigación Científica y Educación Superior de Ensenada",
      "location" : "Ensenada, B. C.",
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

$("#header").append(HTMLskillsStart);
if(bio.skills.length > 0){
  $("#skills").append(HTMLskills.replace("%data%", bio.skills[0]));
}

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
