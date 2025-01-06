/**
 * Auth Service Factory
 */
export const authServiceFactory = [
  'settings',
  '$q',
  function (settings, $q) {
    console.log('Initializing authService');

    return {
      getAuthData: function () {
        return $q(function (resolve) {
          resolve({
            isAuthenticated: false,
            user: null
          });
        });
      }
    };
  }
];

// Ensure AdminApp is available
if (typeof angular !== 'undefined') {
  try {
    const app = angular.module('AdminApp');
    // Register the service
    app.factory('authService', authServiceFactory);
    console.log('authService registered with AdminApp');
  } catch (e) {
    console.error('Error registering authService:', e);
  }
}

export default authServiceFactory;
