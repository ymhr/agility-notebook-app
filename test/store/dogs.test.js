import auth from '../../src/store/auth';
import dogs from '../../src/store/dogs';
import Dog from '../../src/store/models/dog';

import should from 'should';

import {stub} from 'sinon';
import {beforeEach, afterEach, describe, it} from "mocha";

require('should-sinon');

describe('dogs', function(){

	let authStub;

	beforeEach(function(){
		authStub = stub(auth, 'get').callsFake(function(){
			return new Promise(function(resolve){
				resolve({
					data: [
						{id: 1, name: 'Pepe'},
						{id: 2, name: 'Toby'}
					]
				});
			});
		});
	});

	afterEach(function(){
		dogs.items = [];
		// auth.get.restore();
		authStub.restore();
	});

	describe('loading doggos', function(){
		it('should retrieve a list of dogs', function(done) {
			dogs.load().then((res) => {
				res.should.be.instanceOf(Array).and.have.lengthOf(2);
				should(res[0].name).be.exactly('Pepe');
				should(res[1].name).be.exactly('Toby');

				done()

			})
			.catch(err => {
				// console.error(err);
				// throw new Error('test failed');
			});

		});

		it('should call the correct endpoint', function(done){
			dogs.load().then(() => {
				should(auth.get).be.calledWith('/dogs');
				done();
			});
		});

		it('should store each doggo in an instance of Dog', function(done){
			dogs.load().then((res) => {

				res.forEach((d) => {
					d.should.be.instanceOf(Dog);
				});

				done()

			});
		})
	});

	describe('retrieving doggos', function(){

		describe('locally', function(){

			before(function(){
				stub(dogs, 'getFromLocal').callsFake(function(){
					return new Promise(function(resolve){
						resolve(true);
					})
				});
				stub(dogs, 'getFromRemote').callsFake(function(){
					return new Promise(function(resolve){
						resolve(true);
					})
				});
			});

			after(function(){
				dogs.getFromLocal.restore();
				dogs.getFromRemote.restore();
			});

			it('should load from localstorage first', function(done){

				dogs.get(1).then((res) => {
					dogs.getFromLocal.should.be.called();
					dogs.getFromRemote.should.not.be.called();
					done();
				});
			});

		});

		describe('returning doggos', function(){

			beforeEach(function(){
				stub(dogs, 'getFromRemote');
			});
			afterEach(function(){
				dogs.getFromRemote.restore();
			});

			it('return dog from local storage if available', function(done){
				const testDog = new Dog({
					id:1,
					name: 'Pepe'
				});

				dogs.items.push(testDog);

				dogs.get(1).then(function(res){
					should(res.name).be.exactly('Pepe');
					dogs.getFromRemote.should.not.be.called();
					done();
				});
			});
		});

		describe('remotely', function(){

			before(function(){
				stub(dogs, 'getFromRemote').callsFake(function(){
					return new Promise(function(resolve){
						resolve(new Dog({id:1, name: 'Pepe'}));
					})
				});
			});
			after(function(){
				// dogs.getFromLocal.restore();
				dogs.getFromRemote.restore();
			});

			it('should load from remote if local record does not exist', function(done){

				dogs.get(1).then((res) => {
					dogs.getFromRemote.should.be.called();
					should(res.name).be.exactly('Pepe');
					done();
				}).catch(err => {
					console.log('ERROR', err);
				});
			});
		});

	});
});
