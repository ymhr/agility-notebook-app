import sinon from 'sinon';
import should from 'should';
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
	settings.showEmptyMonths = undefined;
	auth.get.restore()
});