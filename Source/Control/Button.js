/*
---

name: Button

description: Provides a Button control.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Control

provides:
	- Button

...
*/

 /**
 * @name  Button
 * @class Provides a button control.
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
 * @extends Control
 *
 * @author  Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @version 0.1
 */
Moobile.Button = new Class(/** @lends Button.prototype */ {

	Extends: Moobile.Control,

	/**
	 * @var    {Label} This button's label.
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	label: null,

	/**
	 * Sets the label.
	 *
	 * This method will set the label using either a string or an instance of a
	 * `Label`. When provided with a string, this methods creates a `Label`
	 * instance and assign the given string as its text.
	 *
	 * @param {Mixed} label The label as a string or a `Label` instance.
	 *
	 * @return {Button} This button.
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setLabel: function(label) {

		if (this.label === label)
			return this;

		if (typeof label == 'string') {
			var text = label;
			label = new Moobile.Label();
			label.setText(text);
		}

		if (this.label == null) {
			this.label = label;
			this.addChild(label);
		} else {
			this.replaceChild(this.label, label);
			this.label.destroy();
			this.label = label;
		}

		return this;
	},

	/**
	 * Returns the label.
	 *
	 * @return {Label} The label.
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getLabel: function() {
		return this.label;
	},

	willBuild: function() {

		this.parent();

		this.element.addClass('button');

		var label = this.getRoleElement('label');
		if (label == null) {
			label = new Element('div');
			label.ingest(this.element);
			label.inject(this.element);
		}

		this.attachRole(label, 'label');
	},

	destroy: function() {
		this.label = null;
		this.parent();
	},

	onMouseDown: function(e) {
		this.parent(e);
		this.setHighlighted(true);
	},

	onMouseUp: function(e) {
		this.parent(e);
		this.setHighlighted(false);
	}

});

//------------------------------------------------------------------------------
// Roles
//------------------------------------------------------------------------------

Moobile.Entity.defineRole('button', null, function(element) {
	var instance = Moobile.Entity.fromElement(element, 'data-button',  Moobile.Button);
	this.addChild(instance);
});

Moobile.Entity.defineRole('label', Moobile.Button, function(element) {
	var instance = Moobile.Entity.fromElement(element, 'data-label', Moobile.Label);
	this.setLabel(instance);
});
