import activities from "./activities";

const users = [
  {
    id: 1,
    firstname: "Ryoma",
    lastname: "Quenot",
    email: "ryoma@gmail.com",
    password: "123456",
    activities: [activities[0], activities[1]],
    role: "admin",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    email: "jane@gmail.com",
    password: "abcdef",
    activities: [activities[3], activities[1]],
    role: "user",
  },
  {
    id: 3,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@gmail.com",
    password: "qwerty",
    activities: [activities[8], activities[7]],
    role: "user",
  },
  {
    id: 4,
    firstname: "Bob",
    lastname: "Brown",
    email: "bob@gmail.com",
    password: "zxcvbn",
    activities: [activities[0], activities[1]],
    role: "user",
  },
  {
    id: 5,
    firstname: "Charlie",
    lastname: "Davis",
    email: "charlie@gmail.com",
    password: "pass123",
    activities: [activities[0], activities[1]],
    role: "user",
  },
];
