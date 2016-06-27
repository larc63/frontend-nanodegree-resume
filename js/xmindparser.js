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

        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            $(this).children("children").children("topics").children("topic").each(function () {
                console.log(titleForTopic + " = " + $(this).children("title").text());
                data2.bio[titleForTopic] = $(this).children("title").text();
            });
        });

        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Skills";
        }).parent();
        data2.skills.skills = [];
        $bio.children("children").children("topics").children("topic").each(function () {
            data2.skills.skills.push($(this).children("title").text());
        });

        var $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Projects";
        }).parent();

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

        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Work Experience";
        }).parent();
        data2.work_experience.jobs = [];
        $bio.children("children").children("topics").children("topic").each(function (projectIndex) {
            var titleForTopic = $(this).children("title").text();
            data2.work_experience.jobs[projectIndex] = {};
            data2.work_experience.jobs[projectIndex].name = titleForTopic;
            $(this).children("children").children("topics").children("topic").each(function (detailIndex) {
                if (detailIndex === 0) {
                    data2.work_experience.jobs[projectIndex].date = $(this).children("title").text();
                }
            });
        });

        $bio = parser.$xml.find('topic>title').filter(function () {
            return $(this).text() == "Education";
        }).parent();
        data2.education.schools = [];
        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            data2.education.schools.push(titleForTopic);

        });
        vm.refreshData();
    };

    this.retrieve();
}