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

function XMindParser() {
    var parser = this;
    this.getTopicWithName = function (name) {
        return parser.$xml.find('topic').filter(function () {
            return $(this).find('title').text() == name;
        });
    };
    parser.original = undefined;
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

        //        var $bio = parser.getTopicWithName("Bio");
        var bioTitle = $bio.first().children("title").text();
        console.log("section -->" + bioTitle);
        $bio.children("children").children("topics").children("topic").each(function () {
            var titleForTopic = $(this).children("title").text();
            $(this).children("children").children("topics").children("topic").each(function () {
                console.log(titleForTopic + " = " + $(this).children("title").text());
                data2[titleForTopic] = $(this).children("title").text();
            });
        });
    };

    this.retrieve();
}
