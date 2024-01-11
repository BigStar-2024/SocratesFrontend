import {AREA_OF_KNOWLEDGE, AREA_OF_KNOWLEDGE_RAW} from './areaOfKnowledgeFragments'
import {STUDENT}           from './studentFragments'
export const PAYMENT_METHOD = `
  id
  method
  cardFirstName
  cardLastName
  cardNumber
  cardExpMonth
  cardExpYear
  cardCvc
  address1
  address2
  city
  state
  postCode
  country
  phone
  isDefault
`
export const PLAN = `
    id
    identifier
    name
    description
    areaOfKnowledge
    slug
    priceMonth
    priceYear
    currency
    isCancel
    subjects {
        ${AREA_OF_KNOWLEDGE_RAW}
    }
`

export const PLAN_RAW = `
  id
  identifier
  name
  description
  areaOfKnowledge
  slug
  priceMonth
  priceYear
  currency
  isCancel
`
export const GUARDIAN_STUDENT_PLAN = `
    id
    identifier
    randomSlug
    student {
        ${STUDENT}
    }
    slug
    plan {
      ${PLAN}
    }
    subject {
        ${AREA_OF_KNOWLEDGE}
    }
    cancelReason
    isCancel
    isPaid
    expiredAt
    period
    price

`
export const GUARDIAN_STUDENT_PLAN_RAW = `
    id
    cancelReason
    isCancel
    isPaid
    expiredAt
    period
    price
`

export const ORDER_DETAIL = `
    id
    identifier
    createTimestamp
    updateTimestamp
    guardianstudentplanSet{
        ${GUARDIAN_STUDENT_PLAN}
    }
    plan{
        ${PLAN}
    }
    paymentMethodPlanId
    subscriptionId
    quantity
    period
    updateFromDetailId
    status
    onDiscount
    discount
    expiredAt
    isPaid
    cancelReason
    isCancel
    slug
    total
`

export const ORDER = `
  id
  subTotal
  discountCode
  discount
  total
  paymentMethod
  isPaid
  slug
  orderdetailSet {
    ${ORDER_DETAIL}
  }
`

export const COUPON_COODE = `
  id
  identifier
  code
  percentage
  trialDay
  expiredAt
  stripeCouponId
`

export const AVAILABLE_PLANS = `
  availableGuardianstudentplan {
    id
    plan {
      ${PLAN}
    }
  }
`
