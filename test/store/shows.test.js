import sinon, {stub} from 'sinon';
import should from 'should';
import {afterEach, beforeEach, describe, it} from "mocha";
import {toJS, observable} from 'mobx';

import auth from "store/auth";
import Shows from 'store/shows';

import 'should-sinon';

describe('Shows store', function(){

    describe('loading multiple items', function(){

        let authStub;
        let apiData = [{id:1}, {id:2}];

        beforeEach(function(){
            authStub = stub(auth, 'get').callsFake(() => {
                return new Promise(resolve => {
                    resolve({data:apiData});
                });
            });
        });

        afterEach(function(){
            Shows.loaded = false;
            Shows.items = observable([]);
            authStub.restore();
        });

        it('should load from remote if not retrieved before', function(done){
            Shows.load().then((items) => {
                auth.get.should.have.been.calledWith('/shows');
                should(Shows.loaded).be.true();
                done();
            });

        });

        it('should return it\'s local array if it has retrieved it before', function(done){
            Shows.load().then(items => {
                Shows.loaded.should.be.true;
                const testName = 'Changed locally';
                Shows.items[0].name = testName;
                Shows.load().then(items => {
                    //If the name was set locally, then the only way it can be returned from 'load' is if load is returning it's own local array
                    Shows.items[0].name.should.be.exactly(testName);
                    done();
                });
            });
        });

        it('should insert items from API into items array', function(done){
            Shows.load().then(items => {
                should(Shows.items.length).be.exactly(2);
                const jsArray = toJS(Shows.items);
                should(jsArray[0].id).be.exactly(1);
                should(jsArray[1].id).be.exactly(2);
                done();
            });
        });

        //Function not actually used
        // it('should be able to determine if a show with a specific ID exists', function(done){
        //     Shows.load().then(items => {
        //         const itemContained = Shows.itemsContains(2);
        //         itemContained.should.be.true();
        //
        //         const itemNotContained = Shows.itemsContains(3);
        //         itemNotContained.should.be.false();
        //
        //         done();
        //     });
        // });

    });

    describe('single item', function(){

        it('should be able to retrieve a specific show from the API and insert it into the items array', function(){});
    });

    it('should call the correct endpoint for create and update', function(){});


});
