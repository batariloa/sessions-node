const { MongoMemoryServer } = require('mongodb-memory-server')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../model/User')
const createServer = require('../util/createServer')

const app = createServer()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
const agent = supertest.agent(app)



describe('user', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())

        await User.create(validUser)
    })
    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    const validUser = {
        email: 'test@gmail.com',
        password: 'pass123',
        name: 'Test',
        role: 'user'
    }

    describe('login', () => {

        describe('given that the credentials are correct', () => {

            it('should return a 200 OK', async () => {

                const response = await supertest(app).post('/login').send({ email: validUser.email, password: validUser.password }).expect(200)
            })
        })

        describe('given that the password is incorrect', () => {

            it('should return a 400 Unauthorized', async () => {

                const response = await supertest(app).post('/login').send({ email: validUser.email, password: 'somerandompassword' }).expect(401)
            })
        })

        describe('given that email does not exist', () => {

            it('should return a 401 Unauthorized', async () => {

                const response = await supertest(app).post('/login').send({ email: 'non-existent-email', password: 'somerandompassword' }).expect(401)
            })
        })

        describe('given that email is not provided', () => {

            it('should return a 400 Bad Request ', async () => {

                const response = await supertest(app).post('/login').send({ password: 'somerandompassword' }).expect(400)
            })
        })

        describe('given that password is not provided', () => {

            it('should return a 400 Bad Request ', async () => {

                const response = await supertest(app).post('/login').send({ email: validUser.email }).expect(400)
            })
        })


    })



})