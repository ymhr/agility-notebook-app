import {it, describe, beforeEach, afterEach, before, after} from 'mocha';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {stub, spy} from 'sinon';
import {Provider} from 'mobx-react';

import Shows from 'components/shows/index';
import Month from 'components/shows/month';
import Show from 'components/shows/show';

import 'should-sinon';
import 'should-enzyme';
import 'jsdom-global';

describe('shows index', function(){

    const shows = {
        items: [{id:1, runs:[]}, {id:2, runs:[]}],
        load: spy(),
    };
    const settings = {showEmptyMonths: true};
    const store = {shows, settings};

    it('should load shows when in componentWillMount', function(){
        const wrapper = mount(<Provider {...store}><Shows /></Provider>);
        shows.load.should.have.been.called();
    });

    it('should render a list of shows', function(){
        const wrapper = mount(<Provider {...store}><Shows /></Provider>);
        wrapper.find(Show).should.have.length(2);
    });

    it('should generate a list of months', function(){
        const wrapper = mount(<Provider {...store}><Shows /></Provider>);
        wrapper.find(Month).should.have.length(1);
    });

    it('should display an \'add show\' button', function(){
        const wrapper = mount(<Provider {...store}><Shows /></Provider>);
        const button = wrapper.find('Button');
        button.should.have.length(1);
        button.text().should.be.exactly(' Add show');
    });

    it('should display children if the exist', function(){
        const children = <div className="children">children</div>;
        const wrapper = mount(<Provider {...store}><Shows>{children}</Shows></Provider>);
        wrapper.find('.children').should.have.length(1);
        wrapper.find('Button').should.have.length(0);
    });
});
