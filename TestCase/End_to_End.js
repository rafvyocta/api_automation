const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const api = supertest('https://thinking-tester-contact-list.herokuapp.com');

describe('User API Tests', () => {
    let authToken; 
    let addedUserId; 
    let addedContactId; 

    // ADD User Test
    describe('ADD User', () => {
        it('should add a new user', async () => {
            const newUser = {
                firstName: 'Muhammad Rafvy',
                lastName: 'Octa Nugraha',
                email: 'muhammadrafvyoctanugraha_05@gmail.com',
                password: 'Arrapii0501'
            };

            const responseAddUser = await api.post('/users')
                                      .send(newUser)
                                      .set('Content-Type', 'application/json');

            console.log(responseAddUser.body);
            expect(responseAddUser.status).to.equal(201);

          
            authToken = responseAddUser.body.token;
            addedUserId = responseAddUser.body.user._id;
        });
    });

    // GET User Test
    describe('GET User', () => {
        it('should get a user by ID using authentication token', async () => {
            
            expect(authToken).to.exist;
            expect(addedUserId).to.exist;

            const responseGetUser = await api.get(`/users/${addedUserId}`)
                                      .set('Authorization', `Bearer ${authToken}`);

            console.log(responseGetUser.body);
            expect(responseGetUser.status).to.equal(200);
        });
    });

    // ADD Contact Test
    describe('ADD Contact', () => {
        it('should add a new contact', async () => {
            const newContact = {
                firstName: 'Muhammad Rafvy',
                lastName: 'Octa Nugraha',
                birthdate: '2001-10-25',
                email: 'muhammadrafvyoctanugraha_05@gmail.com',
                phone: '08116691025',
                street1: 'Jl.Piai Atas',
                street2: 'Jl. Siteba',
                city: 'Padang',
                stateProvince: 'Sumatera Barat',
                postalCode: '25162',
                country: 'Indonesia'
            };

            const responseAddContact = await api.post('/contacts')
                                                .send(newContact)
                                                .set('Authorization', `Bearer ${authToken}`)
                                                .set('Content-Type', 'application/json');
            
            console.log(responseAddContact.body);
            expect(responseAddContact.status).to.equal(201);
            addedContactId = responseAddContact.body._id;
        });
    });

    // GET Contact Test
    describe('GET Contact', () => {
        it('should get the added contact by ID', async () => {
            expect(addedContactId).to.exist;

            const responseGetContact = await api.get(`/contacts/${addedContactId}`)
                                                .set('Authorization', `Bearer ${authToken}`);

            console.log(responseGetContact.body);
            expect(responseGetContact.status).to.equal(200);

        });
    });

    // UPDATE Contact Test
    describe('UPDATE Contact', () => {
        it('should update the added contact', async () => {
            expect(addedContactId).to.exist;

            const updatedContactInfo = {
                firstName: 'M. Rafvy',
                lastName: 'Octa N',

            };

            const responseUpdateContact = await api.patch(`/contacts/${addedContactId}`)
                                              .send(updatedContactInfo)
                                              .set('Authorization', `Bearer ${authToken}`)
                                              .set('Content-Type', 'application/json');

            console.log(responseUpdateContact.body);
            expect(responseUpdateContact.status).to.equal(200);

        });
    });

    // GET Contact after Update Test
    describe('GET Contact after Update', () => {
        it('should get the updated contact by ID', async () => {
            expect(addedContactId).to.exist;

            const responseGetUpdatedContact = await api.get(`/contacts/${addedContactId}`)
                                                        .set('Authorization', `Bearer ${authToken}`);

            expect(responseGetUpdatedContact.status).to.equal(200);
            expect(responseGetUpdatedContact.body).to.have.property('_id', addedContactId);
        });
    });
});
