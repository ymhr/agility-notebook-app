import React from 'react';
import {it, describe, beforeEach, afterEach} from 'mocha';
import {shallow, mount} from 'enzyme';
import should from 'should';
import {List} from 'semantic-ui-react';
import {stub} from 'sinon';
import moment from 'moment';

import Show from 'components/shows/show/show.jsx';

import 'should-sinon';
import 'should-enzyme';
import 'jsdom-global/register';

describe('Show item', function(){
    const testShow = {
        name: 'Test show',
        startDate: moment.unix(1488710377),
        endDate: moment.unix(1488710377),
        runs: [{},{}]
    };
    const component = <Show show={testShow}/>

    it('should contain 1 List Item, 2 List Contents, 1 List Header and 1 List Description', function(){
        const wrapper = shallow(component);

        should(wrapper.find(List.Item)).have.length(1);
        should(wrapper.find(List.Content)).have.length(2);
        should(wrapper.find(List.Header)).have.length(1);
        should(wrapper.find(List.Description)).have.length(1);
    });

    it('should render the show name in the List Header', function(){
        const wrapper = mount(component);
        wrapper.find(List.Header).text().should.be.exactly(testShow.name);
    });

    it('should render the two dates and format them', function(){
        const wrapper = mount(component);
        wrapper.find(List.Description).text().should.be.exactly('Sunday, March 5th 2017 - Sunday, March 5th 2017');
    });

    it('should show the correct total number runs', function(){
        const wrapper = mount(component);
        wrapper.find(List.Content).first().text('Runs: '+testShow.runs.length);
    });

    it('should call itemClick when clicked', function(){
        const wrapper = shallow(component);
        const c = wrapper.instance();
        const itemClickStub = stub(c, 'itemClick').callsFake(() => {});
        c.forceUpdate();
        wrapper.update();

        wrapper.find(List.Item).simulate('click');

        itemClickStub.should.have.been.clicked;

        itemClickStub.restore();
    });
});
