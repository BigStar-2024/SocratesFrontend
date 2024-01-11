import { AUDIENCES } from './peopleFragments'
import { TOPIC }     from './questionFragments'
import { GROUPS }    from './peopleFragments'
export const UNIVERSAL_AREA_KNOWLEDGE = `
    id
    identifier
    createTimestamp
    updateTimestamp
    name
    slug
`

export const AREA_OF_KNOWLEDGE = `
    id
    identifier
    createTimestamp
    updateTimestamp
    hexColor
    slug
    image
    islandImage
    isActive
    audience {
        ${AUDIENCES}
    }
    universalAreaKnowledge {
        ${UNIVERSAL_AREA_KNOWLEDGE}
    }
    topicSet{
        ${TOPIC}
    }
    groupSet{
        ${GROUPS}
    }
    name
`

export const AREA_OF_KNOWLEDGE_RAW = `
    id
    name
    audience {
        id
        standardCode
        name
    }
    universalAreaKnowledge{
        name
      }
    hexColor
    image
    islandImage
    isActive
`
