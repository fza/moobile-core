/*
---

name: NavigationBarItem

description: Provides the navigation bar item that contains the title and
             buttons at the left and right of it.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- BarItem

provides:
	- NavigationBarItem

...
*/

/**
 * @name  NavigationBarItem
 * @class Provides a navigation bar item control.
 *
 * @classdesc
 *
 * [TODO: Description]
 * [TODO: Events]
 * [TODO: Roles]
 * [TODO: Styles]
 * [TODO: Options]
 * [TODO: Element Structure]
 *
 * @extends BarItem
 *
 * @author  Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @version 0.1
 */
Moobile.NavigationBarItem = new Class( /** @lends NavigationBarItem.prototype */ {

	Extends: Moobile.BarItem,

	/**
	 * @var    {NavigationBarItemTitle} This navigation bar item's title.
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	title: null,

	/**
	 * Sets this navigation bar's title.
	 *
	 * This method will set the title using either a string or an instance of a
	 * Label. When provided with a string, this methods instantiate a new Label
	 * and assign the given string as its text.
	 *
	 * @param {Mixed} title The title as either a string or Label.
	 *
	 * @return {NavigationBarItem} This navigation bar item.
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setTitle: function(title) {

		if (this.title === title)
			return this;

		if (typeof title == 'string') {
			var text = title;
			title = new Moobile.NavigationBarItemTitle();
			title.setText(text);
		}

		if (this.title == null) {
			this.title = title;
			this.addChild(title);
		} else {
			this.replaceChild(this.title, title);
			this.title.destroy();
			this.title = title;
		}

		return this;
	},

	/**
	 * Return this navigation bar item's title.
	 *
	 * This method will always return a Label object even though the title may
	 * have been set using a string.
	 *
	 * @return {NavigationBarItemTitle} The title.
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getTitle: function() {
		return this.title;
	},

	/**
	 * Adds a button at the left of the title.
	 *
	 * @see Entity#addChild
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	addLeftBarButton: function(button) {
		return this.addChild(button, 'top');
	},

	/**
	 * Adds a button at the right of the title.
	 *
	 * @see Entity#addChild
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	addRightBarButton: function(button) {
		return this.addChild(button, 'bottom');
	},

	/**
	 * Returns a bar button.
	 *
	 * @see Entity#getChild
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getBarButton: function(name) {
		return this.getChild(name);
	},

	/**
	 * Removes a bar button.
	 *
	 * @see Entity#removeChild
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeBarButton: function(item) {
		return this.removeChild(item);
	},

	/**
	 * Removes all bar buttons.
	 *
	 * @see Entity#removeChildren
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeAllBarButtons: function() {
		return this.removeChildren();
	},

	destroy: function() {
		this.title = null;
		this.parent();
	},

	willLoad: function() {

		this.parent();

		var title = this.getRoleElement('title');

		if (title == null) {
			title = new Element('div');
			title.ingest(this.element);
			title.inject(this.element);
		}

		this.defineElementRole(title, 'title');
	},

	didLoad: function() {
		this.parent();
		this.element.addClass('navigation-bar-item');
	}
});

//------------------------------------------------------------------------------
// Roles
//------------------------------------------------------------------------------

Moobile.Entity.defineRole('item', Moobile.NavigationBar, function(element, name) {
	var instance = Moobile.Entity.fromElement(element, 'data-item', Moobile.NavigationBarItem);
	this.addChild(instance);
	this.item = instance;
});
