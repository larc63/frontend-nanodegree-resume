import zipfile, os.path, xml.etree.ElementTree, json, shutil
ns = {'xmind': 'urn:xmind:xmap:xmlns:content:2.0'}
output = {}
def unzip(source_filename, dest_dir):
    with zipfile.ZipFile(source_filename) as zf:
        for member in zf.infolist():
            # Path traversal defense copied from
            # http://hg.python.org/cpython/file/tip/Lib/http/server.py#l789
            words = member.filename.split('/')
            path = dest_dir
            for word in words[:-1]:
                drive, word = os.path.splitdrive(word)
                head, word = os.path.split(word)
                if word in (os.curdir, os.pardir, ''): continue
                path = os.path.join(path, word)
            zf.extract(member, path)
            
unzip("larc.xmind", "temp")

root = xml.etree.ElementTree.parse('temp/content.xml').getroot()
#print root.tag, root.text

sheet = root[0]
rootTopic = sheet[0]

name = rootTopic[0]
children = rootTopic[1]
topics = children[0]

for topic in topics:
    title = topic.find("xmind:title", ns).text.strip()
    print title
    if title == "Work Experience":
        children = topic.find("xmind:children", ns)
        innerTopics = children[0]
        jobs = []
        for job in innerTopics:
            jobTitle = job.find("xmind:title", ns)
            jobs.append(jobTitle.text)
        output["work_experience"] = {"jobs" : jobs}
    elif title == "Bio":
        children = topic.find("xmind:children", ns)
        innerTopics = children[0]
        # print innerTopics
        bioDict = {}
        for bioTopic in innerTopics:
            bioTopicTitle = bioTopic.find("xmind:title", ns).text
            children = bioTopic.find("xmind:children", ns)
            if children:
                bioTopicContent = children[0][0].find("xmind:title", ns).text
                print bioTopicTitle, bioTopicContent
                bioDict[bioTopicTitle.lower()] = bioTopicContent
        output["bio"] = bioDict
    elif title == "Education":
        children = topic.find("xmind:children", ns)
        innerTopics = children[0]
        # print innerTopics
        schools = []
        for job in innerTopics:
            jobTitle = job.find("xmind:title", ns)
            # print jobTitle.text
            schools.append(jobTitle.text)
        output["education"] = {"schools" : schools}
    elif title == "Courses":
        children = topic.find("xmind:children", ns)
        innerTopics = children[0]
        # print innerTopics
        courses = []
        for job in innerTopics:
            jobTitle = job.find("xmind:title", ns)
            # print jobTitle.text
            schools.append(jobTitle.text)
        output["education"] = {"courses" : courses}
    elif title == "Projects":
        children = topic.find("xmind:children", ns)
        innerTopics = children[0]
        projects = []
        for project in innerTopics:
            jobTitle = project.find("xmind:title", ns)
            projectDictionary = {"title": jobTitle.text}
            print jobTitle.text
            # walk the children
            children = project.find("xmind:children", ns)
            if children:
                projectTopics = children[0]
                projectDetails = []
                for projectTopic in projectTopics:
                    projectTopicTitle = projectTopic.find("xmind:title", ns)
                    projectDetails.append(projectTopicTitle.text)
                projectDictionary["details"] = projectDetails
            projects.append(projectDictionary)
        output["projects"] = {"projects" : projects}
jsonout = json.dumps(output)
print jsonout

# shutil.rmtree('./temp')