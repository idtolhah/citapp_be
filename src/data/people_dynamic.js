import faker from '@faker-js/faker';

var people = []
for (let i = 0; i < 100; i++) {
    const person = {
        id: i + 12,
        name: faker.lorem.words(2),
        job: faker.lorem.words(3),
        place: faker.lorem.words(3),
        category_id: Math.random() * (7 - 1) + 1,   // min 1, max 7
        status: Math.random() * (1 - 0) + 0,   // min 0, max 1
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    }
    people.push(person) 
}

var steps = []
for (let i = 0; i < 500; i++) {
    steps.push({
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        people_id: Math.random() * (111 - 12) + 12,   // min 12, max 111
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    })
}

export { people, steps }