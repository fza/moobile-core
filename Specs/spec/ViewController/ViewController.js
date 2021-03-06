describe('ViewController/ViewController', function() {

	// initialize

	it('should create a view on initialization', function() {
		var viewController = new Moobile.ViewController();
		expect(viewController.getView() instanceof Moobile.View).toEqual(true);
	});

	// addChildViewController

	it('should add a child view controller', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		spyOn(p, 'willAddChildViewController');
		spyOn(p, 'didAddChildViewController');
		p.addChildViewController(c);
		expect(p.getView().getChildComponentAt(0)).toEqual(c.getView());
		expect(p.getChildViewControllerAt(0)).toEqual(c);
		expect(p.willAddChildViewController).toHaveBeenCalledWith(c);
		expect(p.didAddChildViewController).toHaveBeenCalledWith(c);
	});

	// addChildViewControllerAfter

	it('should add a child view controller after another', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController();
		var c2 = new Moobile.ViewController();
		p.addChildViewController(c1);
		p.addChildViewControllerAfter(c2, c1);
		expect(p.getChildViewControllerAt(1)).toEqual(c2);
		expect(p.getView().getChildComponentAt(1)).toEqual(c2.getView());
	});

	// addChildViewControllerBefore

	it('should add a child view controller before another', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController();
		var c2 = new Moobile.ViewController();
		p.addChildViewController(c1);
		p.addChildViewControllerBefore(c2, c1);
		expect(p.getChildViewControllerAt(0)).toEqual(c2);
		expect(p.getView().getChildComponentAt(0)).toEqual(c2.getView());
	});

	// getChildViewController

	it('should return a child view controller using its name', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController(null, 'c1');
		var c2 = new Moobile.ViewController(null, 'c2');
		p.addChildViewController(c1);
		p.addChildViewController(c2);
		expect(p.getChildViewController('c1')).toEqual(c1);
	});

	// getChildViewControllerAt

	it('should return a child view controller using its index', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController();
		var c2 = new Moobile.ViewController();
		p.addChildViewController(c1);
		p.addChildViewController(c2);
		expect(p.getChildViewControllerAt(0)).toEqual(c1);
	});

	// getChildViewControllers

	it('should return all child view controllers', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController();
		var c2 = new Moobile.ViewController();
		p.addChildViewController(c1);
		p.addChildViewController(c2);
		var viewControllers = p.getChildViewControllers();
		expect(viewControllers[0]).toEqual(c1);
		expect(viewControllers[1]).toEqual(c2);
	});

	// hasChildViewController

	it('should indicate if a view controller exists', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		p.addChildViewController(c);
		expect(p.hasChildViewController(c)).toEqual(true);
	});

	// removeChildViewController

	it('should remove a child view controller', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		spyOn(p, 'willRemoveChildViewController');
		spyOn(p, 'didRemoveChildViewController');
		p.addChildViewController(c);
		p.removeChildViewController(c);
		expect(c.hasChildViewController(c)).toEqual(false);
		expect(p.willRemoveChildViewController).toHaveBeenCalledWith(c);
		expect(p.didRemoveChildViewController).toHaveBeenCalledWith(c);
	});

	// removeFromParentViewController

	it('should remove itself from its parent view controller', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		p.addChildViewController(c);
		c.removeFromParentViewController();
		expect(c.hasChildViewController(c)).toEqual(false);
	});

	// removeAllChildViewControllers

	it('should remove all child view controllers', function() {
		var p  = new Moobile.ViewController();
		var c1 = new Moobile.ViewController();
		var c2 = new Moobile.ViewController();
		p.addChildViewController(c1);
		p.addChildViewController(c2);
		p.removeAllChildViewControllers();
		expect(p.hasChildViewController(c1)).toEqual(false);
		expect(p.hasChildViewController(c2)).toEqual(false);
	});

	// getName

	it('should retrieve its name', function() {
		var c = new Moobile.ViewController(null, 'foo');
		expect(c.getName()).toEqual('foo');
	});

	// getId

	it('should retrieve its id', function() {
		var c1 = new Moobile.ViewController(null, 'foo');
		var c2 = new Moobile.ViewController(null, 'foo');
		expect(c1.getId()).toEqual('foo');
		expect(c2.getId()).not.toBeNull();
	});

	// setTitle

	it('should assign and retrieve its title from a string or a Moobile.Text instance', function() {
		var c = new Moobile.ViewController();
		c.setTitle('foo');
		expect(c.getTitle().getText()).toEqual('foo');
		c.setTitle(new Moobile.Text().setText('foo'));
		expect(c.getTitle().getText()).toEqual('foo');
	});

	// setImage

	it('should assign and retrieve its image from a string or a Moobile.Image instance', function() {
		var c = new Moobile.ViewController();
		c.setImage('foo');
		expect(c.getImage().getSource()).toEqual('foo');
		c.setImage(new Moobile.Image().setSource('foo'));
		expect(c.getImage().getSource()).toEqual('foo');
	});

	// getParentViewController

	it ('should assign and retrieve the parent view controller', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		c.setParentViewController(p);
		expect(c.getParentViewController()).toEqual(p);
	});

	it ('should call parentViewControllerWillChange and parentViewControllerDidChange upon setting the parent view controller', function() {
		var p = new Moobile.ViewController();
		var c = new Moobile.ViewController();
		spyOn(c, 'parentViewControllerWillChange');
		spyOn(c, 'parentViewControllerDidChange');
		c.setParentViewController(p);
		expect(c.parentViewControllerWillChange).toHaveBeenCalledWith(p);
		expect(c.parentViewControllerDidChange).toHaveBeenCalledWith(p);
	});

});