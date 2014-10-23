
function ResumeBuilder(){
  this.addAll = function(){
    this.displayBio();
    this.displayContacts();
    this.displaySkills();
    this.displayWorkExperience();
    this.displayProjects();
    this.displayEducation();
    $("#mapDiv").append(googleMap);
  };

  this.displaySkills = function(){
    $("#header").append(HTMLskillsStart);
    for(var i in data.bio.skills){
      $("#skills").append(HTMLskills.replace("%data%", data.bio.skills[i]));
    }
  };

  this.displayBio = function(){
    $("#header").prepend(HTMLheaderRole.replace("%data%", data.bio.role));
    $("#header").prepend(HTMLheaderName.replace("%data%", data.bio.name));
  };

  this.displayWorkExperience = function(){
    for(var job in data.work.jobs){
      $("#workExperience").append(HTMLworkStart);
      $(".work-entry:last").append(HTMLworkEmployer.replace("%data%", data.work.jobs[job].employer) + HTMLworkTitle.replace("%data%", data.work.jobs[job].title));
      $(".work-entry:last").append(HTMLworkDates.replace("%data%", data.work.jobs[job].dates));
      $(".work-entry:last").append(HTMLworkLocation.replace("%data%", data.work.jobs[job].location));
      $(".work-entry:last").append(HTMLworkDescription.replace("%data%", data.work.jobs[job].description));
    }
  };

  this.displayProjects = function(){
    for(var p in data.projects.projects){
      $("#projects").append(HTMLprojectStart);
      var s = HTMLprojectTitle.replace("%data%", data.projects.projects[p].title);
      s += HTMLprojectDates.replace("%data%", data.projects.projects[p].dates);
      s += HTMLprojectDescription.replace("%data%", data.projects.projects[p].description);
      $(".project-entry:last").append(s);
      if(typeof data.projects.projects[p].images[0] === "string"){
        $(".project-entry:last").append(HTMLprojectImage.replace("%data%", data.projects.projects[p].images[0]));
      }
      // for(var i in projects.projects[p].images){
      //   $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[p].images[i]));
      // }
    }
  };


  this.displayContacts = function(){
    for(c in data.bio.contacts){
//        console.log(c + ": " + data.bio.contacts[c]);
        $("#footerContacts").append(HTMLcontactGeneric.replace("%data%", data.bio.contacts[c]).replace("%contact%", c));
    }
  };

  this.displayEducation = function(){
      for(var s in data.education.schools){
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", data.education.schools[s].name));
        $(".education-entry:last").append(HTMLschoolDegree.replace("%data%", data.education.schools[s].degree));
        $(".education-entry:last").append(HTMLschoolDates.replace("%data%", data.education.schools[s].dates));
        $(".education-entry:last").append(HTMLschoolLocation.replace("%data%", data.education.schools[s].location));
        $(".education-entry:last").append(HTMLschoolMajor.replace("%data%", data.education.schools[s].majors[0]));
      }
  };
};

new ResumeBuilder().addAll();
