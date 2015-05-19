'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view'));

  describe('view1 controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var viewCtrl = $controller('ViewCtrl');
      expect(viewCtrl).toBeDefined();
    }));

  });
});