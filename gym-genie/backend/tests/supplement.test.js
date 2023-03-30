const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Supplement = require('../models/supplement');
const supplementResolvers = require('../resolvers/supplementResolvers');

describe('Supplement Resolvers', () => {

  let mongoServer;
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
  
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Supplement.deleteMany({});
  });
  
  describe('Mutation', () => {
    describe('createSupplement', () => {
      it('should create a supplement', async () => {
        const args = { name: 'Test Supplement', description: 'Test supplement description' };
        const supplement = await supplementResolvers.Mutation.createSupplement(null, args);
        const dbSupplement = await Supplement.findOne({ _id: supplement._id });
        expect(dbSupplement.toObject()).toMatchObject(args);
      });
    });

    describe('updateSupplement', () => {
      it('should update a supplement', async () => {
        const args = { name: 'Original Supplement', description: 'Original supplement description' };
        let supplement = await Supplement.create(args);

        const updatedArgs = { name: 'Updated Supplement', description: 'Updated supplement description' };
        supplement = await supplementResolvers.Mutation.updateSupplement(null, {
          id: supplement._id,
          ...updatedArgs,
        });

        const dbSupplement = await Supplement.findOne({ _id: supplement._id });
        expect(dbSupplement.toObject()).toMatchObject(updatedArgs);
      });
    });

    describe('deleteSupplement', () => {
      it('should delete a supplement', async () => {
        const args = { name: 'Test Supplement', description: 'Test supplement description' };
        const supplement = await Supplement.create(args);

        const deletedSupplement = await supplementResolvers.Mutation.deleteSupplement(null, {
          id: supplement._id,
        });
        const dbSupplement = await Supplement.findOne({ _id: supplement._id });

        expect(deletedSupplement.toObject()).toMatchObject(args);
        expect(dbSupplement).toBeNull();
      });
    });
  });

  describe('Query', () => {
    describe('getSupplement', () => {
      it('should get a supplement', async () => {
        const args = { name: 'Test Supplement', description: 'Test supplement description' };
        const supplement = await Supplement.create(args);

        const foundSupplement = await supplementResolvers.Query.getSupplement(null, {
          id: supplement._id,
        });

        expect(foundSupplement.toObject()).toMatchObject(args);
      });

      it('should throw an error if the supplement does not exist', async () => {
        await expect(supplementResolvers.Query.getSupplement(null, { id: 'non-existent-id' })).rejects.toThrow();
      });
    });

    describe('getAllSupplements', () => {
      it('should get all supplements', async () => {
        const supplements = [{ name: 'Test Supplement 1', description: 'Test supplement description 1' },          { name: 'Test Supplement 2', description: 'Test supplement description 2' },        ];
        await Supplement.create(supplements);

        const allSupplements = await supplementResolvers.Query.getAllSupplements(null);
        expect(allSupplements.length).toEqual(supplements.length);
      });
    });
  })
});

/*const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const ApolloServer = require('apollo-server-express').ApolloServer;
const Supplement = require('../models/supplement');
const typeDefs = require('../resolvers/typeDefs');
const supplementResolvers = require('../resolvers/supplementResolvers');

let mongoServer;
const resolvers = { ...supplementResolvers };

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.ensureInstance(); // Wait for the instance to start
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    /*useUnifiedTopology: true,
    // useFindAndModify: false,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  global.testClient = createTestClient(server);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Supplement Tests', () => {
  afterEach(async () => {
    await Supplement.deleteMany({});
  });

  it('should create a supplement', async () => {
    const CREATE_SUPPLEMENT = gql`
      mutation CreateSupplement($name: String!, $description: String!) {
        createSupplement(name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const name = 'Test Supplement';
    const description = 'Test supplement description';

    const { mutate } = global.testClient;
    const { data } = await mutate({
      mutation: CREATE_SUPPLEMENT,
      variables: { name, description },
    });

    const supplement = data.createSupplement;

    expect(supplement.name).toEqual(name);
    expect(supplement.description).toEqual(description);
  });

  // Add more tests for other supplement-related functionalities here
  it('should update a supplement', async () => {
    const supplement = new Supplement({
      name: 'Original Supplement',
      description: 'Original supplement description',
    });
    await supplement.save();
  
    const UPDATE_SUPPLEMENT = gql`
      mutation UpdateSupplement($id: ID!, $name: String, $description: String) {
        updateSupplement(id: $id, name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;
  
  const updatedData = {
    name: 'Updated Supplement',
  };
  
    const { mutate } = global.testClient;
    const { data } = await mutate({
      mutation: UPDATE_SUPPLEMENT,
      variables: { id: supplement._id, ...updatedData },
    });
  
    const updatedSupplement = data.updateSupplement;
  
    expect(updatedSupplement.id).toEqual(supplement._id.toString());
    expect(updatedSupplement.name).toEqual(updatedData.name);
    expect(updatedSupplement.description).toEqual(updatedData.description);
  });
});*/
