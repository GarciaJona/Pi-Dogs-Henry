/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height: "1-1",
    weight: "1-1",
    life_span: "1-1",
    image: "https://assets.puzzlefactory.pl/puzzle/376/321/original.jpg",
    temperament: "Happy"

};

describe('/d°ogs', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {

    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
    it('Responds with the dogs from api and DB', () => 
      agent.get('/dogs').then(res => 
        expect(res.body.length).greaterThan(0)
        )
    )
  });
});