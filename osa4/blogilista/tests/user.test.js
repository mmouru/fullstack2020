const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./tst_helper')
const supertest = require('supertest')
const app = require('../App')
const api = supertest(app)

jest.setTimeout(30000)

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creating a user without password is not possible', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mj55555',
        name: 'Marjaana Kouvola',
        password: '',
      }
      await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creating a user without username is not possible', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Marjaana Kouvola',
        password: 'fdsfdfsdfsdfd',
      }
      await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      
      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password has length of > 3', async () => {
      const newUser = {
        name : 'Halkomies',
        username: 'puuuuuukaatuu',
        password: 'mo'
      }

      await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    })

  })