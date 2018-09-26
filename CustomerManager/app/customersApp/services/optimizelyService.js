/**
 * optimizelyService
 *
 */
(function () {

    var injectParams = ['$window'];

    var service = function ($window) {
        var optimizely = $window.optimizely || {};

        console.log('optimizely object is ' + optimizely)
        /**
         * Returns list of currently running experiments
         *
         * @returns {array}
         */
        this.getActiveExperimentList = function () {
            return optimizely.activeExperiments;
        };

        /**
         * Checks if an experiment is running, when passed in an experiment id
         *
         * @param {string} name
         *
         * @returns {boolean}
         */
        this.isExperimentActive = function (experiment) {
            return optimizely.activeExperiments.indexOf(experiment) !== -1;
        };

        /**
         * Returns the ID of a given experiment name
         *
         * @param {string} name
         *
         * @returns {string | boolean}
         */
        this.getExperimentIdByName = function (name) {
            var all = optimizely.allExperiments;
            for (var key in all) {
                console.log('key is '+key + ' name is ' + all[key].name);
                if (all[key].name === name) {
                    return key;
                }
            }
            return false;
        };

        /**
         * Check to see if a variation in a given experiment is active
         *
         * @param {string} experiment
         * @param {string} variation
         *
         * @returns {boolean}
         */
        this.isVariationActive = function (experiment, variation) {
            var experimentID = this.getExperimentIdByName(experiment);
            if (!experimentID) {
                return false;
            }
            var variationName = optimizely.variationNamesMap[experimentID];
            if (this.isExperimentActive(experimentID) && variationName === variation) {
                return true;
            }
            return false;
        };

        /**
         * Given an experiment name, activates the experiment
         * @param {*} experimentID
         *
         * @returns {boolean}
         */
        this.activateExperiment = function (experiment) {
            var experimentID = this.getExperimentIdByName(experiment);
            if (!experimentID) {
                return false;
            }
            optimizely.push(['activate', experimentID]);
        };

        /**
         * Fires event based on custom event name
         *
         * @param {string} eventName
         *
         * @returns {boolean}
         */
        this.fireEvent = function (eventName) {
            if (!eventName) {
                console.log('Event name must be specified!');
                return;
            } else {
                optimizely.push(['trackEvent', eventName]);
                console.log('Optimizely track event '+eventName);
            }
        };
    };

    service.$inject = injectParams;
    angular.module('customersApp').service('optimizelyService', service);
}());
