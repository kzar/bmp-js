/*global angular*/
/*jslint indent: 2 */
(function () {
  "use strict";

  angular.module('BmpDemo.directives', []).
    directive('lines', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function (scope, elm, attrs, controller) {
          var context = elm[0].getContext('2d');
          scope.$watch($parse(attrs.lines), function (lines) {
            var x, y, i, image_data,
                width = parseInt(attrs.width),
                height = parseInt(attrs.height),
                channels = parseInt(attrs.channels) / 8;
            if (lines) {
              image_data = context.createImageData(width, height);
              // Draw our BMP
              for (y = 0; y < height; y +=1) {
                for (x = 0; x < width; x +=1) {
                  for (i = 0; i < channels; i += 1) {
                    image_data.data[(x + y * width) * 4 + i] = lines[height - 1 - y][x] >> (8 * i) & 0xff;
                  }
                  // FIXME bodge alpha for now!
                  image_data.data[(x + y * width) * 4 + 3] = 255;
                }
              }
              context.putImageData(image_data, 0, 0);
            }
          });
        }
      };
    }]);

}());
