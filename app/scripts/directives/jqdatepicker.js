'use strict';

angular.module('bnePaymentsOldFashionedApp')
	.directive('jqdatepicker', function($timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          console.log(scope);
          $timeout(function () {
            element.datepicker({
                dateFormat: 'dd/mm/yy'
            });
          });
        }
    };
  });
