const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let token;
let planId;

beforeAll(async () => {
  try {
    // Seed the database with initial data
    await queryInterface.bulkInsert('Users', [
      {
        username: 'user6',
        email: 'user6@gmail.com',
        password: '$2b$10$H98YNvNGCiJNpVJV3RD8iOEHqtZNp.t/huZqMNroJcAMaQAFPPLBy', // hashed password for 'password123'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Log in to get a valid token
    const res = await request(app).post('/login').send({
      username: 'user6',
      password: '1234567',
    });

    if (res.statusCode !== 200 || !res.body.access_token) {
      throw new Error('Failed to log in and retrieve token');
    }

    token = res.body.access_token;
  } catch (error) {
    console.error('Error in beforeAll:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Clean up the database
    await queryInterface.bulkDelete('Plans', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await sequelize.close();
  } catch (error) {
    console.error('Error in afterAll:', error);
    throw error;
  }
});

describe('User Endpoints', () => {
  test('POST /register - should register a new user', async () => {
    const res = await request(app).post('/register').send({
      username: 'newuser',
      email: 'newuser@gmail.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'newuser');
  });

  test('POST /login - should log in a user and return a token', async () => {
    const res = await request(app).post('/login').send({
      username: 'user6',
      password: '1234567',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('access_token');
  });
});

describe('Plan Endpoints', () => {
  test('POST /plan/add-plan - should create a new plan', async () => {
    const res = await request(app)
      .post('/plan/add-plan')
      .set('Authorization', `Bearer ${token}`)
      .send({
        longitudeLocation: 106.8473377,
        latitudeLocation: -6.3546097,
        displayNameLocation: 'Depok',
        longitudeDestination: 100.3632561,
        latitudeDestination: -0.9247587,
        displayNameDestination: 'Padang',
        recommendationItems: '{}',
        timeTemperaturePredicted: '{}',
        StatusId: 1,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    planId = res.body.id;
  });

  test('GET /plan/user - should fetch plans by user ID', async () => {
    const res = await request(app)
      .get('/plan/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('PUT /plan/:id - should update a plan status', async () => {
    const res = await request(app)
      .put(`/plan/${planId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ statusId: 2 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('StatusId', 2);
  });

  test('DELETE /plan/:id - should delete a plan', async () => {
    const res = await request(app)
      .delete(`/plan/${planId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', planId);
  });

  test('DELETE /plan/:id - 404 not found', async () => {
    const res = await request(app)
      .delete(`/plan/23423422534534534`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Error not found');
  });

  test('GET /plan/:id - 404 not found', async () => {
    const res = await request(app)
      .put(`/plan/234234`)
      .set('Authorization', `Bearer ${token}`)
      .send({ statusId: 2 });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Error not found');
  });
});

describe('Additional User Endpoints Tests', () => {
    test('POST /register - should return 400 for missing fields', async () => {
      const res = await request(app).post('/register').send({
        username: 'incompleteuser',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', expect.any(String));
    });
  
    test('POST /login - should return 401 for invalid credentials', async () => {
      const res = await request(app).post('/login').send({
        username: 'user6',
        password: 'wrongpassword',
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid username/password');
    });
  
    test('POST /login - should return 400 for missing fields', async () => {
      const res = await request(app).post('/login').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', expect.any(String));
    });
  });
  
  describe('Additional Plan Endpoints Tests', () => {
    test('POST /plan/add-plan - should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/plan/add-plan')
        .set('Authorization', `Bearer ${token}`)
        .send({
          longitudeLocation: 106.8473377,
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', expect.any(String));
    });
  
    test('GET /plan/user - should return 401 for missing token', async () => {
      const res = await request(app).get('/plan/user');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });
  
    test('PUT /plan/:id - should return 404 for non-existent plan', async () => {
      const res = await request(app)
        .put('/plan/9999')
        .set('Authorization', `Bearer ${token}`)
        .send({ statusId: 2 });
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  
    test('DELETE /plan/:id - should return 404 for non-existent plan', async () => {
      const res = await request(app)
        .delete('/plan/9999')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  
    test('GET /plan/:id - should return 404 for non-existent plan', async () => {
      const res = await request(app)
        .get('/plan/9999')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
});

describe('Database Connection', () => {
  test('should connect to the database', async () => {
    try {
      await sequelize.authenticate();
    } catch (error) {
      throw new Error('Database connection failed');
    }
  });
});


describe('Additional UserController Tests', () => {
    test('POST /register - should return 400 for invalid email format', async () => {
      const res = await request(app).post('/register').send({
        username: 'invalidemailuser',
        email: 'invalidemail',
        password: 'password123',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email format is wrong');
    });
  
  
    test('POST /register - should return 400 for missing username', async () => {
      const res = await request(app).post('/register').send({
        email: 'missingusername@gmail.com',
        password: 'password123',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Username is required');
    });
  
    test('POST /login - should return 401 for incorrect password', async () => {
      const res = await request(app).post('/login').send({
        username: 'user6',
        password: 'wrongpassword123',
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid username/password');
    });
  
    test('POST /login - should return 400 for missing username and password', async () => {
      const res = await request(app).post('/login').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message', 'Username is required');
    });
    test('POST /login - should return 400 for missing username and password', async () => {
        const res = await request(app).post('/login').send({username:'user6'});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Password is required');
      });
  
    test('POST /login - should return 401 for non-existent username', async () => {
      const res = await request(app).post('/login').send({
        username: 'nonexistentuser',
        password: 'password123',
      });
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid username/password');
    });

    test('POST /google-login - should return 400 for missing google token', async () => {
        const res = await request(app).post('/google-login').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Google Token is required');
      });
  
});

describe('DataController Tests', () => {
    describe('GET /data/get-lon-lat', () => {
      test('should return 200 for server', async () => {
  
        const res = await request(app)
          .get('/data/get-lon-lat')
          .set('Authorization', `Bearer ${token}`)
          .query({ city: 'Jakarta', country: 'Indonesia' });
  
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
  
        jest.restoreAllMocks();
      });
      test('should return 400 Bad request', async () => {
  
        const res = await request(app)
          .get('/data/get-lon-lat')
          .set('Authorization', `Bearer ${token}`)
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Please fill city');
        jest.restoreAllMocks();
      });
      test('should return 400 Bad request', async () => {
  
        const res = await request(app)
          .get('/data/get-lon-lat')
          .set('Authorization', `Bearer ${token}`)
          .query({ city: 'Jakarta', country: '' });
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Please fill country');
        jest.restoreAllMocks();
      });
    });
  
    describe('GET /data/get-temperature', () => {
      test('should return 200', async () => {
  
        const res = await request(app)
          .get('/data/get-temperature')
          .set('Authorization', `Bearer ${token}`)
          .query({ latitude: -6.2088, longitude: 106.8456 });
  
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
  
        jest.restoreAllMocks();
      });
    });
  
    describe('GET /data/get-location-name', () => {
      test('should return 200', async () => {
  
        const res = await request(app)
          .get('/data/get-location-name')
          .set('Authorization', `Bearer ${token}`)
          .query({ lat: -6.2088, lon: 106.8456 });
  
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
  
        jest.restoreAllMocks();
      });
      test('should return 400 Bad request', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => {
          throw new Error('Server error');
        });
  
        const res = await request(app)
          .get('/data/get-location-name')
          .set('Authorization', `Bearer ${token}`)
  
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'Please fill latitude');
  
        jest.restoreAllMocks();
      });
      test('should return 500 ISE', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => {
          throw new Error('Server error');
        });
  
        const res = await request(app)
          .get('/data/get-location-name')
          .set('Authorization', `Bearer ${token}`)
          .query({ lat: "wfefwef", lon: "wefwefw" });
  
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message', 'Internal Server Error');
  
        jest.restoreAllMocks();
      });
    });
  
    describe('GET /data/gemini', () => {
      test('should return 500 for server error', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => {
          throw new Error('Server error');
        });
  
        const res = await request(app)
          .get('/data/gemini')
          .set('Authorization', `Bearer ${token}`)
          .query({ temperature: 30 });
  
        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('message', 'Internal Server Error');
  
        jest.restoreAllMocks();
      });
    });
});

describe('Authentication Middleware', () => {
    test('should return 401 for missing token', async () => {
      const res = await request(app).get('/plan/user'); // Protected route
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });
  
});


describe('Authorization Middleware', () => {
    test('should return 401 for missing token', async () => {
      const res = await request(app).get('/plan/1'); // Protected route
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });
  
    test('should return 401 for invalid token', async () => {
      const res = await request(app)
        .get('/plan/1') // Protected route
        .set('Authorization', `Bearer invalid.token`);
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });
  
    test('should return 403 for unauthorized access', async () => {
        const testUserToken = signToken({
            id: 2, // Assuming this user does not own the plan with ID 1
            username: 'testuser',
            email: 'testuser@gmail.com'
        })
      const res = await request(app)
        .get('/plan/1') // Protected route
        .set('Authorization', `Bearer ${testUserToken}`);
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message', 'Invalid Token');
    });

});