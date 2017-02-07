/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var Buffer = require('buffer');
var rp = require('request-promise');
var getColors = require('get-image-colors');

var Unsplash = require('unsplash-js');
global.fetch = require('node-fetch');   // Unsplash needs this
const unsplash = new Unsplash.default(sails.config.unsplash);


function randomUnsplashPhotos(count) {
  return unsplash.photos
    .getRandomPhoto({
      featured: true,
      orientation:'landscape',
      count: count
    })
    .then(Unsplash.toJson);
}


module.exports = {

  createFromUrl: function createFromUrl(req, res) {
    var url = req.param('url');
    if (!url) return res.json(400, 'Missing url parameter!');
    console.log('[createFromUrl] url: %s', url);
    rp({
      uri: url,
      encoding: null,
      resolveWithFullResponse: true
    })
      .then(response => {
        var type = response.headers['content-type'];
        var img = response.body;
        console.log('[createFromUrl] Image type %s', type);
        var buf = Buffer.from(img);
        return getColors(buf, type);
      })
      .then(colors => {
        var colorArr = colors.map(color => color.hex());
        // {
        //   return {
        //     r: color._rgb[0],
        //     g: color._rgb[1],
        //     b: color._rgb[2],
        //   };
        // });
        console.log('[createFromUrl] colors %s', colorArr);
        res.json(200, colorArr);
      })
      .catch(err => {
        console.log('[createFromUrl] Error: ', err);
        res.json(500, err);
      });
  },

  createRandomImage: function createRandomImage(req, res) {
    var count = req.param('count') || 1;
    console.log('[CreateRandomImage] count %d', count);

    randomUnsplashPhotos(count)
      .then(images => {
        return res.json(200, images);
      })
      .catch(err=>{
        return res.json(500, err);
      })
  },

  consumePhotoList: (photos => {
    console.log('[consumePhotoList] Processing %d photos', photos.length);

    // Build the queue (download one image at a time)
    photos.forEach(photo => {
      queue.push(next => {
        var url = photo.urls.raw;
        var filename = photo.id + '.jpg';
        var request = https.get(url, function(response) {
          console.log('[consumePhotoList] Downloading %s => %s', url, filename);
          var fileWriteStream = fs.createWriteStream(Path.join(PATH_WALLPAPER, filename));
          response.pipe(fileWriteStream);
          fileWriteStream.on('finish', next);
        });
      });
    });

    // Start downloading
    queue.start(err => {
      if (err) return console.warn('[consumePhotoList] Error ', err);
      console.log('[consumePhotoList] DONE!');
    });

  }),

  downloadPhotos: () => {
    unsplash.photos
      .listPhotos(1, 15, "latest")
      .then(Unsplash.toJson)
      .then(consumePhotoList);
  },


  downloadCuratedPhotos: () => {
  unsplash.photos
    .listCuratedPhotos(1, 15, "latest")
    .then(Unsplash.toJson)
    .then(consumePhotoList);
  }

};

