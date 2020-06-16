const faker = require('faker');
const fs = require('fs');
function generateUsers() {
  let users = [];
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

  for (let counter = 0; counter <= 100; counter++) {
    let uuid = faker.random.uuid();
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let mobile = faker.phone.phoneNumberFormat();
    let status = faker.random.boolean();

    let billsTypes = [
      {
        text: 'water',
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
        text: 'electricity',
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
        text: 'internet',
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
        text: 'mobile',
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
    if (status) {
      var adult = faker.random.number(7);
      var kids = faker.random.number(7);
    } else {
      var adult = 0;
      var kids = 0;
    }

    let billsPerMonth = months.map((month, monthIndex) =>
      billsTypes.map(({ text, ran }) => ({
        uuid,
        type: text,
        billingYear: 2020,
        billingMonth: monthIndex + 1,
        amount: ran(),
      }))
    );
    console.log(billsPerMonth);
    users.push({
      uuid,
      first_name: firstName,
      last_name: lastName,
      email,
      mobile,
      status,
      adult,
      kids,
      billsPerMonth,
    });
  }

  return { data: users };
}

let result = generateUsers();
fs.writeFileSync('data.json', JSON.stringify(result, null, '\t'));
