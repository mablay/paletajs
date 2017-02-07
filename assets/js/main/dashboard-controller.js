
angular.module('paletaApp').controller('DashboardCtrl', ['Image', '$localStorage', function(Image, $localStorage) {

  console.log('[DashboardCtrl] Init');

  var vc = this;

  vc.url = 'http://www.toggo.de/media/slider-papagei-10336-10110.jpg';

  $localStorage.images = $localStorage.images || {};
  vc.images = $localStorage.images;

  vc.paletteForUrl = function paletteForUrl(url) {
    return new Promise((resolve, reject) => {
      if (!url) return reject('Invalid url!');

      console.log('[PaletteForUrl] %s', url);
      Image.postUrl({url: url}).$promise
        .then(colors => {
          console.log('[Palete] colors %s', JSON.stringify(colors, null, 4));
          $localStorage.images[url] = colors;
          resolve({
            url: url,
            colors: colors
          });
        })
        .catch(reject);
    });
  };

  vc.addRandomImages = function addRandomImages(count) {
    console.log('[AddRandomImages] count: %d', count);
    Image.createRandom({count: count}).$promise.then(images => {
      images.reduce((p, image)=>{
        var url = image.urls.thumb;
        console.log('[RandomImages] %s', url);
        return p.then(()=>vc.paletteForUrl(url));
      }, Promise.resolve());
      //this.paletteForUrl(url);
    });
  };

}]);
