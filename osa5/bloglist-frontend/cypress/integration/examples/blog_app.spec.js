  describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Martti Mourujärvi',
      username: 'testikayttaja40',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
        cy.contains('Log in to application')
        cy.get('form')
    })
  
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#username').type('testikayttaja40')
        cy.get('#password').type('salainen')
        cy.contains('login').click()
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('logout').click()
        cy.get('#username').type('testikayttaja41')
        cy.get('#password').type('salainen')
        cy.contains('login').click()
        cy.get('.error').contains('wrong username or password')
      })
    })
    describe('When logged in', function() {
        beforeEach(function() {
          cy.get('#username').type('testikayttaja40')
          cy.get('#password').type('salainen')
          cy.contains('login').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title').type('testi blogi')
          cy.get('#author').type('Martti Mourujärvi')
          cy.get('#url').type('www.testiosoite.org')
          cy.contains('create').click()
          cy.contains('testi blogi Martti Mourujärvi')
        })
      })
    describe('When logged in can like blog', function() {
        beforeEach(function() {
            const user = {
                name: 'Martti Mourujärvi',
                username: 'testikayttaja40',
            }
            cy.get('#username').type('testikayttaja40')
            cy.get('#password').type('salainen')
            cy.contains('login').click().then(() => {
                window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
                console.log(JSON.parse(window.localStorage.getItem('loggedNoteappUser')).username)
            })
            cy.contains('new blog').click()
            cy.get('#title').type('testi blogi')
            cy.get('#author').type('Martti Mourujärvi')
            cy.get('#url').type('www.testiosoite.org')
            cy.contains('create').click()
          })

        it('Likes increment when clicking like button', function() {
            cy.get('.button').click()
            cy.contains("likes 0")
            cy.contains('like').click()
            cy.contains('likes 1')
        })
        it('can be removed', function() {
            cy.get('.button').click()
            cy.contains('remove').click()
            cy.contains('testi blogi testikayttaja40').should('not.exist')
        })

        describe('most liked blog is on the top', function() {
            beforeEach(function() {
            cy.contains('new blog').click()
            cy.get('#title').type('testi blogi 2')
            cy.get('#author').type('Martti Mourujärvi')
            cy.get('#url').type('www.testiosoite.org')
            cy.contains('create').click()
            })
            it('liking blog 2 will make it go higher on the list', function() {
                cy.contains('testi blogi 2 Martti Mourujärvi').click()
                cy.contains('like').click()
                cy.get('b').click()
                cy.get('.button').first().contains('testi blogi 2')
            })  
        })
    })
  })