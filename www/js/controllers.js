angular.module('starter.controllers', ["firebase"])

.controller('DashCtrl', function($scope, fireBaseData, $firebaseArray) {
      $scope.expenses = $firebaseArray(fireBaseData.refExpenses());
      $scope.user = fireBaseData.ref().getAuth();
      //ADD MESSAGE METHOD
      $scope.addExpense = function(e) {
          $scope.expenses.$add({
            by: $scope.user.password.email,
            label: $scope.label,
              cost: $scope.cost
          });
          $scope.label = "";
          $scope.cost = 0;
      };
        $scope.getTotal = function () {
            var i, rtnTotal = 0;
            for (i = 0; i < $scope.expenses.length; i = i + 1) {
                rtnTotal = rtnTotal + $scope.expenses[i].cost;
            }
            return rtnTotal;
        };
})
.controller('FriendsCtrl', function($scope, fireBaseData, $firebaseArray) {
        $scope.user = fireBaseData.ref().getAuth();
        $scope.expenses = $firebaseArray(fireBaseData.refExpenses());
        $scope.roomies = $firebaseArray(fireBaseData.refRoomMates());
        $scope.roomies.$loaded().then(function(array) {
           var i;
            //array = [[set1_rm1_email, set1_rm2_email], [set2_rm1_email, set2_rm2_email] ...]
            array=[["juantopo@dispostable.com", "yolo@dispostable.com"]];
            for (i = 0; i < array.length; i = i + 1) {
               if (array[i][0] === $scope.user.password.email) {
                   $scope.roomiesEmail = array[i][1];
               } else if (array[i][1] === $scope.user.password.email) {
                   $scope.roomiesEmail = array[i][0];
               }
            }
            //$scope.$apply();
            //Yes this whole app, front-end to backend is built only for two room-mates situation
        });
        $scope.addExpense = function(e) {
            $scope.expenses.$add({
                by: $scope.roomiesEmail,
                label: $scope.label,
                cost: $scope.cost
            });
            $scope.label = "";
            $scope.cost = 0;
        };
        $scope.getTotal = function () {
            var i, rtnTotal = 0;
            for (i = 0; i < $scope.expenses.length; i = i + 1) {
                rtnTotal = rtnTotal + $scope.expenses[i].cost;
            }
            return rtnTotal;
        };
})
.controller('AccountCtrl', function($scope, fireBaseData, $firebaseArray) {
        $scope.showLoginForm = false;
        //Checking if user is logged in
        $scope.user = fireBaseData.ref().getAuth();
        if (!$scope.user) {
            $scope.showLoginForm = true;
        }
        //Login method
        $scope.login = function (em, pwd) {
            fireBaseData.ref().authWithPassword({
                email    : em,
                password : pwd
            }, function(error, authData) {
                if (error === null) {
                    console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
                    $scope.user = fireBaseData.ref().getAuth();
                    $scope.showLoginForm = false;
                    $scope.$apply();
                    var r = $firebaseArray(fireBaseData.refRoomMates());
                    r.$add(["yolo@dispostable.com"]);
                } else {
                    console.log("Error authenticating user:", error);
                }
            });
        };
        //Logout method
        $scope.logout = function () {
            fireBaseData.ref().unauth();
            $scope.showLoginForm = true;
        };
});
