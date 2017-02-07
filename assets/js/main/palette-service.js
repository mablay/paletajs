
angular.module('paletaApp').service('Image', ['$resource', function($resource) {

  return $resource('/api/v1/image/', null, {
    postUrl: {
      method: 'POST',
      url: '/api/v1/imageUrl',
      isArray: true
    },
    createRandom: {
      method: 'POST',
      url: '/api/v1/imageRandom',
      isArray: true
    }
  });

}]);
