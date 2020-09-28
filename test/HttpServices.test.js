const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Get input files', () => {
  it('Should get all input file into data/input directory', (done) => {
    chai
      .request(url)
      .get('/input/list')
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(200);
        done();
      });
  });
});

describe('Create input file', () => {
  const input = {
    dimension: {
      x: 5,
      y: 3,
    },
    robots: [
      {
        position: {
          x: 1,
          y: 1,
          f: 4,
        },
        orientation: 'E',
        instructions: ['F', 'L', 'R', 'H', 'F', 'F', 'H'],
      },
      {
        position: {
          x: 3,
          y: 3,
        },
        orientation: 'N',
        instructions: ['F', 'L', 'R', 'F', 'F'],
      },
      {
        position: {
          x: 2,
          y: 3,
        },
        orientation: 'S',
        instructions: ['F', 'L', 'R', 'F', 'F'],
      },
    ],
  };

  it('Should create a new input file into data/input directory', (done) => {
    chai
      .request(url)
      .post('/input/create')
      .query({
        filename: 'input_test.txt',
      })
      .send(input)
      .end((error, res) => {
        if (error) error;

        expect(res).to.have.status(200);
        done();
      });
  });

  it('Should throw error when file name its not specified', (done) => {
    chai
      .request(url)
      .get('/input/create')
      .query({})
      .send(input)
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(404);
        done();
      });
  });
});

describe('Get output files', () => {
  it('Should get all output file into data/output directory', (done) => {
    chai
      .request(url)
      .get('/output/list')
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(200);
        done();
      });
  });
});

describe('Execute input file', () => {
  it('Should execute input file and generate output file into data/output directory', (done) => {
    chai
      .request(url)
      .get('/output/exec')
      .query({
        filename: 'input_test.txt',
      })
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(200);
        done();
      });
  });

  it('Should throw error when file name its not exists', (done) => {
    chai
      .request(url)
      .get('/output/exec')
      .query({
        filename: '',
      })
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(400);
        done();
      });
  });

  it('Should throw error when file name its not specified', (done) => {
    chai
      .request(url)
      .get('/output/exec')
      .query({})
      .end((error, response) => {
        if (error) error;

        expect(response).to.have.status(400);
        done();
      });
  });
});
