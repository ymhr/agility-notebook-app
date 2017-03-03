import sinon from 'sinon';
import should from 'should';
import {afterEach, beforeEach, describe, it} from "mocha";
import auth from "../../src/store/auth";
import Settings from '../../src/store/settings';
require('should-sinon');

beforeEach(function(){
	stub(auth, 'get').callsFake(function(){
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
	Settings.showEmptyMonths = undefined;
	auth.get.restore()
});

describe('applying a setting', function(){

	it('should be able to set showEmptyMonths and have 1 converted to true', function(){

	});

	it('should be able to set showEmptyMonths and have 0 converted to false', function(){

	});

});

describe('updating a setting', function(){});

describe('loading the settings', function(){});

describe('settings defaults', function(){});
