import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Utils } from './common/common.js';
import { required } from './validation';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('<App />', () => {
	it('calls componentWillMount', () => {
		jest.spyOn(App.prototype, 'componentWillMount')
		const wrapper = shallow(<App />)
		expect(App.prototype.componentWillMount.mock.calls.length).toBe(1)
	})

	it('creates dictionary function returns an object', () => {
		const arr = [{"id": 1,"name": "Admin"},{"id": 2,"name": "Editor"},{"id": 3,"name": "Viewer"}]
		const result = {"1": {"id": 1, "name": "Admin"}, "2": {"id": 2, "name": "Editor"}, "3": {"id": 3, "name": "Viewer"}}
		const trueReturn = Utils.createDictonary(arr)
		const fasleReturn = Utils.createDictonary([])
		expect(trueReturn).toEqual(result)
		expect(fasleReturn).toEqual({})
	})

	it('creates array function returns an array', () => {
		const obj = {"1": {"id": 1, "name": "Admin"}, "2": {"id": 2, "name": "Editor"}, "3": {"id": 3, "name": "Viewer"}}
		const result = [{"id": 1,"name": "Admin"},{"id": 2,"name": "Editor"},{"id": 3,"name": "Viewer"}]
		const trueReturn = Utils.createArray(obj)
		const fasleReturn = Utils.createArray({})
		expect(trueReturn).toEqual(result)
		expect(fasleReturn).toEqual([])
	})

	it('validation required has value', () => {
		const str = 'Hello';
		const trueReturn = required('')
		expect(trueReturn).toBe('Value is required')
	})

})
