export const dictionary = Object.freeze({
  en: {
    form:{
      title: 'Profile and settings',
      },
    membership:{
      title: 'Membership details',
      yearIncentive:'(safe 50% if you change to annual)',
      expiration:'Your next payment will be on ',
      mChildernVArray: ['1 child combo', '1 child one area of knowledge'],
    },
    randomText:[
      'How can we raise a good child, one who will do the right thing, even when no one may see them do it',
      'To encourage empathy in your child, encourage your child to talk about her feelings and make sure she knows that you care about them.',
      'Babies and young children learn best when they have warm, engaged and responsive relationships with their main carers.',
      'Letting your child make mistakes and find out for himself how the world works is a big part of learning.',
      'No two children learn the same way or at the same pace. ',
      'You and your family have a vital role in what your child learns in these early years.',
    ],
    planRadios: [
      {
        label: 'Gold Package',
        value: 'gold',
        price: '$21.99/mo',
      },
      {
        label: 'Combo Package',
        value: 'combo',
        price: '$15.99/mo'
      },
      {
        label: 'Solo Package',
        price: '$4.99/mo',
        value: 'solo',
      },
    ],
    combo: [
      {
        label: 'Math',
        value: 'combo_math'
      },
      {
        label: 'ELA + Sight Words',
        value: 'combo_esw'
      },
      {
        label: 'Science',
        value: 'combo_science'
      },
      {
        label: 'Financial Literacy',
        value: 'combo_finance'
      },
      {
        label: 'Health & Safety',
        value: 'combo_health'
      },
    ],
  },
});
