//function success(content) {
//    // use the content
//    self.name("yay" + content.length + " " + typeof content);
//    var xmlDoc = $.parseXML(content);
//    self.name("yay" + content.length + " ");
//    var $xml = $(xmlDoc);
//    var $bio = $xml.find('topic').filter(function () {
//        return $(this).find('title').text() == "Bio";
//    });
//}
/* global $ */
/* global JSZip */
/* global Uint8Array */
/* global setTimeout */
/* global XMLHttpRequest */
/* global data2 */
/* global isVitae */

function XMindParser(vm) {
    var parser = this;
    this.getTopicWithName = function (name) {
        return parser.$xml.find('topic').filter(function () {
            return $(this).find('title').text() == name;
        });
    };
    parser.original = undefined;
    parser.vm = vm;
    this.$xml = undefined;
    this.retrieve = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'master/larc.xmind', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
            // response is unsigned 8 bit integer
            var responseArray = new Uint8Array(this.response);
            var the_zip = new JSZip();
            // more files !
            the_zip.loadAsync(responseArray)
                .then(function (zip) {
                    zip.file('content.xml').async("string").then(
                        function success(content) {
                            console.log("length: " + content.length);
                            parser.original = content;
                            setTimeout(function () {
                                parser.parse();
                            }, 0);

                        },
                        function error(e) {
                            console.log("nay", e);
                        });
                });

        };

        xhr.send();
    };

    this.parse = function () {
        var xmlDoc = $.parseXML(parser.original);
        parser.$xml = $(xmlDoc);
        var $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Bio";
        }).parent();
        // parse Bio
        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            $(this).children("children").children("topics").children("topic").each(function () {
                console.log(titleForTopic + " = " + $(this).children("title").text());
                data2.bio[titleForTopic] = $(this).children("title").text();
            });
        });
        // parse Skills
        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Skills";
        }).parent();
        data2.skills.skills = [];
        $bio.children("children").children("topics").children("topic").each(function () {
            data2.skills.skills.push($(this).children("title").text());
        });
        // Parse projects
        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Projects";
        }).parent();
        // parse Projects
        $bio.children("children").children("topics").children("topic").each(function (projectIndex) {
            var titleForTopic = $(this).children("title").text();
            data2.projects.projects[projectIndex] = {};
            data2.projects.projects[projectIndex].details = [];
            data2.projects.projects[projectIndex].title = titleForTopic;
            $(this).children("children").children("topics").children("topic").each(function (detailIndex) {
                if (detailIndex === 0) {
                    data2.projects.projects[projectIndex].date = $(this).children("title").text();
                } else {
                    data2.projects.projects[projectIndex].details.push($(this).children("title").text());
                }
            });
        });

        // parse Work Experience
        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Work Experience";
        }).parent();
        data2.work_experience.jobs = [];
        $bio.children("children").children("topics").children("topic").each(function (jobIndex) {
            var titleForTopic = $(this).children("title").text();
            data2.work_experience.jobs[jobIndex] = {};
            data2.work_experience.jobs[jobIndex].name = titleForTopic;
            $(this).children("children").children("topics").children("topic").each(function (jobDetailIndex) {
                if (jobDetailIndex === 0) {
                    data2.work_experience.jobs[jobIndex].date = $(this).children("title").text();
                } else if(jobDetailIndex === 1 && $(this).children("title").text() == "Projects") {
                    console.log("" + $(this).children("title").text());
                    // parse Projects
                    var projects = $(this).children("children").children("topics").children("topic");
                    data2.work_experience.jobs[jobIndex].projects = [];
                    projects.each(function (projectIndex) {
                        var titleForTopic = $(this).children("title").text();
                        data2.work_experience.jobs[jobIndex].projects[projectIndex] = {};
                        data2.work_experience.jobs[jobIndex].projects[projectIndex].title = titleForTopic;
                        data2.work_experience.jobs[jobIndex].projects[projectIndex].details = [];
                        $(this).children("children").children("topics").children("topic").each(function (detailIndex) {
                            if (detailIndex === 0) {
                                data2.work_experience.jobs[jobIndex].projects[projectIndex].date = $(this).children("title").text();
                            } else {
                                data2.work_experience.jobs[jobIndex].projects[projectIndex].details.push($(this).children("title").text());
                            }
                        });
                    });
                }
            });
        });

        // parse Education
        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Education";
        }).parent();
        data2.education.schools = [];
        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            data2.education.schools.push(titleForTopic);
        });

        // parse Courses
        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Courses";
        }).parent();
        data2.courses.courses = [];
        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            data2.courses.courses.push(titleForTopic);
        });

        if (isVitae) {
            $bio = parser.$xml.find('topic>title').filter(function () {
                return $(this).text() == "Projects Repository";
            }).parent();
            data2.projects.additionalProjects = [];
            $bio.children("children").children("topics").children("topic").each(function (projectIndex) {
                var titleForTopic = $(this).children("title").text();
                data2.projects.additionalProjects[projectIndex] = {};
                data2.projects.additionalProjects[projectIndex].details = [];
                data2.projects.additionalProjects[projectIndex].title = titleForTopic;
                $(this).children("children").children("topics").children("topic").each(function (detailIndex) {
                    if (detailIndex === 0) {
                        data2.projects.additionalProjects[projectIndex].date = $(this).children("title").text();
                    } else {
                        data2.projects.additionalProjects[projectIndex].details.push($(this).children("title").text());
                    }
                });
            });

            $bio = parser.$xml.find('topic>title').filter(function () {
                return $(this).text() == "Courses Repository";
            }).parent();
            data2.courses.additionalCourses = [];
            $bio.children("children").children("topics").children("topic").each(function () {
                var titleForTopic = $(this).children("title").text();
                data2.courses.additionalCourses.push(titleForTopic);
            });

            $bio = parser.$xml.find('topic>title').filter(function () {
                return $(this).text() == "Skills Repository";
            }).parent();
            data2.skills.additionalSkills = [];
            $bio.children("children").children("topics").children("topic").each(function () {
                data2.skills.additionalSkills.push($(this).children("title").text());

            });
            $bio = parser.$xml.find('topic>title').filter(function () {
                return $(this).text() == "Work Experience Repository";
            }).parent();
            data2.work_experience.additionalJobs = [];
            $bio.children("children").children("topics").children("topic").each(function (projectIndex) {
                var titleForTopic = $(this).children("title").text();
                data2.work_experience.additionalJobs[projectIndex] = {};
                data2.work_experience.additionalJobs[projectIndex].name = titleForTopic;
                $(this).children("children").children("topics").children("topic").each(function (detailIndex) {
                    if (detailIndex === 0) {
                        data2.work_experience.additionalJobs[projectIndex].date = $(this).children("title").text();
                    }
                });
            });

            $bio = parser.$xml.find('topic>title').filter(function () {
                return $(this).text() == "Education Repository";
            }).parent();
            data2.education.additionalSchools = [];
            $bio.children("children").children("topics").children("topic").each(function () {
                var titleForTopic = $(this).children("title").text();
                data2.education.additionalSchools.push(titleForTopic);
            });
        }
        vm.refreshData();
    };

    this.retrieve();
}
