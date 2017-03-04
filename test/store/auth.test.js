import {describe, beforeEach, afterEach, it} from 'mocha';
import should from 'should';
import {stub} from 'sinon';
import auth from '../../src/store/auth';

require('should-sinon');

global.apiUrl = 'http://localhost:3000';

describe('auth', function(){

    beforeEach(function(){
    });

    afterEach(function(){
        localStorage.clear();
    });

    describe('setting token', function(){
        it('should be able to set the token in localStorage and on the class', function(){
            const testToken = 'testtokenpleasedontupvote';
            auth.setToken(testToken);

            should(localStorage.getItem('token')).be.exactly(testToken);
            should(auth.token).be.exactly(testToken);
        })
    });

    describe('login and logout', function(){
        it('should remove the token from localStorage and the class variable', function(){
            const testToken = 'somethingsomethingwhateverarrowsucks';
            auth.setToken(testToken);

            should(localStorage.getItem('token')).be.exactly(testToken);
            should(auth.token).be.exactly(testToken);

            auth.logout();

            should(auth.token).be.exactly(undefined);
            should(localStorage.getItem('token')).be.null;
        });
    });

});
