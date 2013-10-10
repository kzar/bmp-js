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
                width = parseInt(attrs.w),
                height = parseInt(attrs.h),
                channels = parseInt(attrs.channels) / 8;
            if (lines) {
              console.log("DRAWING", width, height, channels, lines.length);
              // Reset the canvas
              elm[0].width = width;
              elm[0].height = height;
              image_data = context.createImageData(width, height);
              // Draw our BMP
              for (y = 0; y < height; y +=1) {
                for (x = 0; x < width; x +=1) {
                  for (i = 0; i < channels; i += 1) {
                    image_data[(x + y * width) * 4 + i] = lines[y][x] >> (8 * i) & 0xff;
                  }
                }
              }
              console.log(image_data);
              context.putImageData(image_data, 0, 0);
            }
          });
        }
      };
    }]);

}());
