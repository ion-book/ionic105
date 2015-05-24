angular.module('starter.services', [])
/**
 * A simple example service that returns some data.
 */
.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://mappionc.firebaseio.com/"),
      refExpenses = new Firebase("https://mappionc.firebaseio.com/expenses"),
      refRoomMates = new Firebase("https://mappionc.firebaseio.com/room-mates");
  return {
    ref: function () {
      return ref;
    },
    refExpenses: function () {
      return refExpenses;
    },
    refRoomMates: function () {
      return refRoomMates;
    }
  }
});
