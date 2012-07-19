/*
---

name: Animation.Set

description: Provides a container for multiple animations.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Animation

provides:
	- Animation.Set

...
*/

/**
 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @since  0.1.0
 */
Moobile.Animation.Set = new Class({

	Extends: Moobile.Animation,



	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#element
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	element: null,

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#animations
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	animations: [],

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#currentAnimation
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	currentAnimation: null,

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#initialize
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	initialize: function(element, options) {

		this.parent(element, options);

		delete this.animationClass;
		delete this.animationProperties;

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimation
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimation: function(name, animation) {

		animation.setName(name);
		animation.setOptions(this.options);

		this.removeAnimation(name);

		animation.addEvent('start', this.bound('onAnimationStart'));
		animation.addEvent('stop', this.bound('onAnimationStop'));
		animation.addEvent('end', this.bound('onAnimationEnd'));

		if (this.element) {
			animation.setElement(this.element);
		}

		this.animations.include(animation);

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimation
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimation: function(name) {
		return this.animations.find(function(animation) {
			return animation.getName() === name;
		});
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#removeAnimation
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeAnimation: function(name) {

		var animation = this.getAnimation(name);
		if (animation) {
			animation.cancel();
			animation.removeEvent('start', this.bound('onAnimationStart'));
			animation.removeEvent('stop', this.bound('onAnimationStop'));
			animation.removeEvent('end', this.bound('onAnimationEnd'));

			if (this.currentAnimation === animation) {
				this.currentAnimation = null;
			}

			this.animations.erase(animation);

			animation = null;
		}

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setElement
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setElement: function(element) {
		this.element = document.id(element);
		this.animations.invoke('setElement', this.element);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getElement
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getElement: function() {
		return this.animations.invoke('getElement');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationClass
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationClass: function(value) {
		this.animations.invoke('setAnimationClass', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationClass
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationClass: function() {
		return this.animations.invoke('getAnimationClass');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationName: function(value) {
		this.animations.invoke('setAnimationName', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationName
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationName: function() {
		return this.animations.invoke('getAnimationName');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationDuration
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDuration: function(value) {
		this.animations.invoke('setAnimationDuration', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationDuration
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDuration: function() {
		return this.animations.invoke('getAnimationDuration');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationIterationCount
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationIterationCount: function(value) {
		this.animations.invoke('setAnimationIterationCount', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationIterationCount
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationIterationCount: function() {
		return this.animations.invoke('getAnimationIterationCount');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationDirection
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDirection: function(value) {
		this.animations.invoke('setAnimationDirection', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationDirection
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDirection: function() {
		return this.animations.invoke('getAnimationDirection');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationTimingFunction
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationTimingFunction: function(value) {
		this.animations.invoke('setAnimationTimingFunction', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationTimingFunction
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationTimingFunction: function() {
		return this.animations.invoke('getAnimationTimingFunction');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationFillMode
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationFillMode: function(value) {
		this.animations.invoke('setAnimationFillMode', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationFillMode
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationFillMode: function() {
		return this.animations.invoke('getAnimationFillMode');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#setAnimationDelay
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setAnimationDelay: function(value) {
		this.animations.invoke('setAnimationDelay', value);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#getAnimationDelay
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getAnimationDelay: function() {
		return this.animations.invoke('getAnimationDelay');
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#attach
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	attach: function() {
		this.animations.invoke('attach');
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#detach
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	detach: function() {
		this.animations.invoke('detach');
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#start
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	start: function(name) {

		this.stop();

		var animation = this.getAnimation(name);
		if (animation) {
			this.currentAnimation = animation;
			this.currentAnimation.start();
		}

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#stop
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	stop: function() {

		if (this.currentAnimation) {
			this.currentAnimation.stop()
			this.currentAnimation = null;
		}

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Animation/Animation.Set#isRunning
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	isRunning: function() {
		return this.animations.some(function(animation) {
			return animation.isRunning();
		});
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationStart: function() {
		this.fireEvent('start', this.currentAnimation);
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationStop: function() {
		this.fireEvent('stop', this.currentAnimation);
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onAnimationEnd: function() {
		this.fireEvent('end', this.currentAnimation);
		this.currentAnimation = null;
	},

});
