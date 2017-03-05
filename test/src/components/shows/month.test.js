import {it, describe, beforeEach, afterEach} from 'mocha';
import React from 'react';
import {shallow} from 'enzyme';

import Month from 'components/shows/month';
import Show from 'components/shows/show';

import 'should-sinon';
import 'jsdom-global';
import 'should-enzyme';

describe('show month', function(){

    const shows = [{id:1, runs:[]}, {id:2, runs:[]}];
    const month = "0201703";
    const component = <Month month={month} shows={shows} />

    it('should display a Show for each show passed in', function(){
        const wrapper = shallow(component);
        wrapper.find(Show).should.have.length(2);
    });

    it('should display the month in the correct format', function(){
        const wrapper = shallow(component);
        wrapper.find('h3').text().should.be.exactly('March 2017');
    });

});
