/*
---

name: Scroller

description: Provides a wrapper for the iScroll scroller.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Core/Class
	- Core/Class.Extras
	- Class.Mutator.Property

provides:
	- Scroller

...
*/

(function() {

iScroll.prototype._currentSize = {x: 0, y: 0};

var _checkDOMChanges = iScroll.prototype._checkDOMChanges;

iScroll.prototype._checkDOMChanges = function() {

	_checkDOMChanges.call(this);

	var size = this.wrapper.getSize();
	if (this._currentSize.x != size.x || this._currentSize.y != size.y) {
		this._currentSize = size;
		this.refresh();
	}

};

})();

/**
 * Provides a wrapper for the iScroll scroller. This class needs major refactor
 * as iScroll is becomming less usefull becase the performance are not very
 * good on android and iOS 5 provides native scrolling.
 *
 * @name Scroller
 * @class Scroller
 *
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @version 0.1
 */
Moobile.Scroller = new Class( /** @lends Scroller.prototype */ {

	Implements: [
		Events,
		Options,
		Class.Binds
	],

	content: null,

	wrapper: null,

	scroller: null,

	options: {
		useTransform: true,
		useTransition: true,
		hideScrollbar: true,
		fadeScrollbar: true,
		checkDOMChanges: true,
		snap: false
	},

	initialize: function(wrapper, content, options) {

		this.setOptions(options);

		wrapper = document.id(wrapper);
		content = document.id(content);

		if (content == null) {
			content = new Element('div')
			content.ingest(wrapper);
			content.inject(wrapper);
		}

		this.content = content;
		this.wrapper = wrapper;

		this.scroller = new iScroll(this.wrapper, this.options);

		this.attachEvents();

		return this;
	},

	/**
	 * @private
	 */
	attachEvents: function() {
		this.scroller.options.onScrollStart = this.bound('onScrollStart');
		this.scroller.options.onScrollMove = this.bound('onScrollMove');
		this.scroller.options.onScrollEnd = this.bound('onScrollEnd');
		this.scroller.options.onRefresh = this.bound('onRefresh');
	},

	/**
	 * @private
	 */
	detachEvents: function() {
		this.scroller.options.onScrollStart = null;
		this.scroller.options.onScrollMove = null;
		this.scroller.options.onScrollEnd = null;
		this.scroller.options.onRefresh = null;
	},

	getCurrentPage: function() {
		return {
			x: this.scroller.currPageX,
			y: this.scroller.currPageY
		};
	},

	getAbsoluteDistance: function() {
		return {
			x: this.scroller.absDistX,
			y: this.scroller.absDistY
		};
	},

	getDistance: function() {
		return {
			x: this.scroller.distX,
			y: this.scroller.distY
		};
	},

	getDirection: function() {
		return {
			x: this.scroller.dirX,
			y: this.scroller.dirY
		};
	},

	getAbsoluteStart: function() {
		return {
			x: this.scroller.absStartX,
			y: this.scroller.absStartY
		};
	},

	getStart: function() {
		return {
			x: this.scroller.startX,
			y: this.scroller.startY
		};
	},

	getPages: function() {
		return {
			x: this.scroller.pagesX,
			y: this.scroller.pagesY
		};
	},

	getOffset: function() {

		// TODO: I just realized this information might be found in iscroll
		// directly, I'll have to fix this instead of using "fancy"
		// regular expressions

		var x = 0;
		var y = 0;

		var position = this.content.getStyle('-webkit-transform');
		if (position) position = position.match(/translate3d\(-*(\d+)px, -*(\d+)px, -*(\d+)px\)/);
		if (position) {
			if (position[1]) x = -position[1];
			if (position[2]) y = -position[2];
		}

		return {x: x, y: y};
	},

	isZoomed: function() {
		return this.scroller.zoomed;
	},

	isMoved: function() {
		return this.scroller.moved;
	},

	isReady: function() {
		return this.scroller.isReady();
	},

	scrollTo: function(x, y, time, relative) {
		(function() { this.scroller.scrollTo(x, y, time, relative); }).delay(5, this);
		return this;
	},

	scrollToElement: function(element, time) {
		(function() { this.scroller.scrollToElement(element, time); }).delay(5, this);
		return this;
	},

	scrollToPage: function (pageX, pageY, time) {
		(function() { this.scroller.scrollToPage(pageX, pageY, time); }).delay(5, this);
		return this;
	},

	refresh: function() {
		this.scroller.refresh();
		return this;
	},

	disable: function () {
		this.scroller.disable();
		return this;
	},

	enable: function () {
		this.scroller.enable();
		this.scroller.refresh();
		return this;
	},

	stop: function() {
		this.scroller.stop();
		return this;
	},

	destroy: function() {
		this.scroller.destroy();
		return this;
	},

	onRefresh: function() {
		this.fireEvent('refresh');
	},

	onScrollStart: function() {
		this.fireEvent('scrollstart');
	},

	onScrollMove: function() {
		this.fireEvent('scrollmove');
	},

	onScrollEnd: function() {
		this.fireEvent('scrollend');
	}

});
