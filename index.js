const faker = require('faker');
const fs = require('fs');
function generateUsers() {
  let users = [];
  let bills = [];
  let billsType = ['water', 'electricity', 'internet', 'mobile'];
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  for (let counter = 1; counter <= 100; counter++) {
    let id = counter;
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let mobile_num = faker.phone.phoneNumberFormat();
    let is_married = faker.random.boolean();
    let family_count = 0;
    if (is_married) {
      family_count = faker.random.number(10);
    }

    let billsTypes = [
      {
        text: 1,
        ran: (() => {
          const random = faker.random.number({ min: 30, max: 100 });
          return () =>
            faker.random.number({
              min: random,
              max: random + 20,
            });
        })(),
      },
      {
        text: 2,
        ran: (() => {
          const random = faker.random.number({ min: 50, max: 300 });
          return () =>
            faker.random.number({
              min: random,
              max: random + 20,
            });
        })(),
      },
      {
        text: 3,
        ran: (() => {
          const random = faker.random.number({ min: 50, max: 200 });
          return () =>
            faker.random.number({
              min: random,
              max: random + 20,
            });
        })(),
      },
      {
        text: 4,
        ran: (() => {
          const random = faker.random.number({ min: 20, max: 100 });
          return () =>
            faker.random.number({
              min: random,
              max: random + 20,
            });
        })(),
      },
    ];

    let billsPerMonth = months
      .map((month, monthIndex) =>
        billsTypes.map(({ text, ran }) => ({
          id,
          type: text,
          billing_year: 2020,
          billing_month: monthIndex + 1,
          amount: ran(),
        }))
      )
      .flat();

    users.push({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      password: '$2b$10$iKuTb4mbRTnkmJ8mvvCUmOUAoph0w2OM8kSEj3HCFaM3T99GW.Pri',
      mobile_num,
      is_married,
      family_count,
    });
    bills.push(...billsPerMonth);
  }
  return { users, bills, types: billsType };
}

let result = generateUsers();
fs.writeFileSync('data.json', JSON.stringify(result, null, '\t'));
