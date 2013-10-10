/*global angular*/
/*jslint indent: 2 */
(function () {
  "use strict";

  angular.module('BmpDemo.controllers', []).
    controller('BmpDemoCtrl', ['$scope',
      function ($scope) {
        $scope.bmp = {};

        $scope.onFileSelect = function ($files) {
          FileAPI.readAsArrayBuffer($files[0], function (e) {
            if (e.type === 'load') {
              $scope.$apply(function () {
                $scope.bmp.data = e.result;
                $scope.bmp.parsed = bmp.parse(e.result).data;
              });
            }
          });
        };

      }
    ]);

}());
