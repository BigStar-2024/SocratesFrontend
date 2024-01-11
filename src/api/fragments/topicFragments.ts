export const TopicFields = (studentId: number) => `
    id
    name
    report(student: ${ studentId }) {
        questionsAnswered
        correctQuestion
        accuracy
    }
    mastery(student: ${ studentId })
`

export const TopicsRecursive = (studentId: number) => `
    subTopics {
        ${ TopicFields(studentId) }
        subTopics {
            ${ TopicFields(studentId) }
            subTopics {
                ${ TopicFields(studentId) }
            }
        }
    }
`

export const TopicReport = (studentId: number, aokId: number) => `
    rootTopicsByAok(aokId: ${ aokId }) {
        ${ TopicFields(studentId) }
        ${ TopicsRecursive(studentId) }
    }
`

export const TopicReportWithGrade = (studentId: number, aokId: number, gradeId: number) => `
    rootTopicsByAok(aokId: ${ aokId }) {
        ${ TopicFields(studentId) }
        ${ TopicsRecursive(studentId) }
        standardTopic
        subTopicsByGrade(gradeId: ${gradeId}){
            id
            mastery(student: ${studentId})
            name
            standardTopic
            report(student: ${ studentId }) {
                questionsAnswered
                correctQuestion
                accuracy
            }
            topicgradeSet{
                grade{
                    id
                    name
                }
            }
            subTopicsByGrade(gradeId: ${gradeId}){
                id
                mastery(student: ${studentId})
                name
                report(student: ${ studentId }) {
                    questionsAnswered
                    correctQuestion
                    accuracy
                }
                standardTopic
                topicgradeSet{
                    grade{
                        id
                        name
                    }
                }
                subTopicsByGrade(gradeId: ${gradeId}){
                    id
                    mastery(student: ${studentId})
                    name
                    report(student: ${ studentId }) {
                        questionsAnswered
                        correctQuestion
                        accuracy
                    }
                    standardTopic
                    topicgradeSet{
                        grade{
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`

export const TopicReportByAokAndGrade = (studentId: number, aokId: number, gradeId: number) => `
    rootTopicsByAokAndGrade(aokId: ${ aokId }, gradeId: ${gradeId}) {
        ${ TopicFields(studentId) }
        ${ TopicsRecursive(studentId) }
    }
`

export const AreasOfKnowledge =() => `
    areasOfKnowledge {
        id
        name
    }
`

export const Grades = () => `
    grades {
        id
        name
    }
`

export const AvaliableGrades = (id: number) => `
    areaOfKnowledgeById(id: ${id}) {
        audience {
            gradeSet {
                id
                name
            }
        }
    }
`
