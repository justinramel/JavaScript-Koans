/*jslint nomen: true*/
/*global describe, expect, it, __*/
describe('prototype', function () {
	it('1 - should understand prototype', function () {
		var Person = function () {
		}, instance;
		Person.prototype = {
			name: 'default name'
		};
		instance = new Person();
		expect(instance.name).toBe('default name');
		expect(Person.prototype.isPrototypeOf(instance)).toBe(true);
	});
	it('2 - should understand prototype', function () {
		var Person = function () {
		}, instance;
		instance = new Person();
		Person.prototype = {
			name: 'default name'
		};
		expect(instance.name).toBe(undefined);
		expect(Person.prototype.isPrototypeOf(instance)).toBe(false);
	});
	it('3 - should understand prototype', function () {
		var Person = function () {
		}, firstInstance = new Person(), secondInstance, thirdInstance;
		expect(firstInstance.name).toBe(undefined);
		Person.prototype.name = 'before';
		secondInstance = new Person();
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		Person.prototype = {
			name: 'after'
		};
		thirdInstance = new Person();
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		expect(thirdInstance.name).toBe('after');
		Person.prototype.name = 'even more after';
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		expect(thirdInstance.name).toBe('even more after');

		expect(Person.prototype.isPrototypeOf(firstInstance)).toBe(false);
		expect(Person.prototype.isPrototypeOf(secondInstance)).toBe(false);
		expect(Person.prototype.isPrototypeOf(thirdInstance)).toBe(true);
	});
	it('4 - should understand prototype & delete', function () {
		var Person = function () {
		}, instance;
		Person.prototype.name = 'default name';
		instance = new Person();
		expect(instance.name).toBe(__);
		delete Person.prototype.name;
		expect(instance.name).toBe(__);
	});
	it('5 - should understand prototype', function () {
		var Person = function () {
		}, firstInstance, secondInstance;
		Person.prototype.name = 'default name';
		Person.prototype.address = {
			street: 'Kosovska 51',
			postcode: '11000'
		};
		firstInstance = new Person();
		secondInstance = new Person();
		firstInstance.name = 'new name';
		firstInstance.address.street = 'Kosovska 49';
		expect(secondInstance.name).toBe(__);
		expect(secondInstance.address.street).toBe(__);
	});
	it('6 - should understand prototypes - angularjs scopes (Scope.prototype.$new)', function () {
		var parentScope = {
				name: 'default name',
				address: {
					street: 'Kosovska 51',
					postcode: '11000'
				}
			},
			createChildScope = function (parentScope) {
				var ChildScopeConstructor = function () {
				};
				ChildScopeConstructor.prototype = parentScope;
				return new ChildScopeConstructor();
			},
			childScope = createChildScope(parentScope);
		expect(parentScope.name).toBe(__);
		expect(childScope.name).toBe(__);
		childScope.name = 'new name';
		expect(parentScope.name).toBe(__);
		expect(childScope.name).toBe(__);
		expect(parentScope.address.street).toBe(__);
		expect(childScope.address.street).toBe(__);
		childScope.address.street = 'Kosovska 49';
		expect(parentScope.address.street).toBe(__);
		expect(childScope.address.street).toBe(__);
	});
});
