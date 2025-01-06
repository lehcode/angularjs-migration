/**
 * Created by Antony Repin on 8/4/2017.
 */

export const authServiceFactory = [
  'settings',
  '$q',

  function (settings, $q) {
    return {
      getAuthData: function () {
        return $q(function (resove, reject) {
          //
        });
      },
    };
  },
];

// Register with AngularJS module
const AdminApp = angular
  .module('AdminApp')
  .factory('authService', authServiceFactory);

export default AdminApp;
