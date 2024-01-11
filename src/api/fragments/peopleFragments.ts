export const ORGANIZATIONS = `
    {
        id
        identifier
        isActive
        randomSlug
        name
        typeOf
        slug
        lft
        rght
        treeId
        level
    }
`;

export const ORGANIZATIONS_PERSONNEL = `
    {
        id
        identifier
        isActive
        randomSlug
        name
        lastName
        dateOfBirth
        identificationNumber
        position
    }
`;

export const GROUPS = `
        id
        identifier
        isActive
        randomSlug
        name
        internalCode
        population
        slug
`;

export const SCHOOLS = `
    {
        id
        identifier
        isActive
        randomSlug
        name
        slug
        internalCode
        typeOf
    }
`;

export const SCHOOLS_PERSONNEL = `
    {
        id
        identifier
        isActive
        randomSlug
        name
        lastName
        dateOfBirth
        identificationNumber
        position
    }
`;

export const GRADES = `
    id
    slug
    name
`;

export const PREREQUISITES = `
    {
        id
        identifier
        isActive
        randomSlug
        information
        advancePercentage
        advanceMinum
    }
`;



export const GUARIDANS_GENDER = `
`

export const AUDIENCES = `
        id
        slug
        standardCode
        name
`;
export const AUDIENCES_ALL = `
        id
        identifier
        isActive
        createTimestamp
        updateTimestamp
        randomSlug
        slug
        standardCode
        name
`;
