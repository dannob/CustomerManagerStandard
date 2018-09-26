(function () {

    var injectParams = ['optimizelyService'];

    var optimizelyClickDirective = function (optimizelyService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function (event) {
                    var data = attrs.optimizelyClick;
                    if (data) {
                        optimizelyService.fireEvent(data);
                    }
                });
                // clean up on destruction
                element.on('$destroy', function () {
                    element.off('click');
                });
            }
        };
    }

    optimizelyClickDirective.$inject = injectParams;
    angular.module('customersApp').directive('optimizelyClick', optimizelyClickDirective);

}());
