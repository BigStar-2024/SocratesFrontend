export const TEACHER_SCHEMA = `
    id
    identifier
    isActive
    deletedTimestamp
    randomSlug
    createTimestamp
    updateTimestamp
    user: UserSchema
    school: SchoolSchema
    discountCode: DiscountCodeSchema
    name
    lastName
    gender: SchoolPersonnelGender
    dateOfBirth
    identificationNumber
    position
    zip
    country
    district
    schoolpersonnelPtr: SchoolPersonnelSchema!
    classroomSet: [ClassroomSchema!]!
`
