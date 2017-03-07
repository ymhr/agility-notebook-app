import sinon, {stub} from 'sinon';
import should from 'should';
import {afterEach, beforeEach, describe, it} from "mocha";
import auth from "../../src/store/auth";
import Settings from '../../src/store/settings';

require('should-sinon');

describe('settings', function(){

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
    	Settings.setDefaults();
    	authStub.restore();
    });

    describe('applying a setting', function(){

    	it('should be able to set showEmptyMonths and have 1 converted to true', function(){
            Settings.setSettings([
                {name:'showEmptyMonths', value: '1'}
            ]);

            should(Settings.showEmptyMonths).be.exactly(true);

            Settings.setSettings([
                {name:'showEmptyMonths', value: 1}
            ]);

            should(Settings.showEmptyMonths).be.exactly(true);

    	});

    	it('should be able to set showEmptyMonths and have 0 converted to false', function(){
            Settings.setSettings([
                {name:'showEmptyMonths', value: '0'}
            ]);

            should(Settings.showEmptyMonths).be.exactly(false);

            Settings.setSettings([
                {name:'showEmptyMonths', value: 0}
            ]);

            should(Settings.showEmptyMonths).be.exactly(false);
    	});

    });

    describe('loading the settings', function(){

        it('should load the settings from the web', function(){
            should(Settings.showEmptyMonths).be.exactly(true);

            Settings.loadSettings();

            auth.get.should.be.calledWith('/settings');
        })

    });

    describe('No settings', function(){
        it('should be able to load the application if there are no settings returned from the API', function(){
            Settings.setSettings([]);
            should(Settings.loaded).be.true();
        });
    });

});
