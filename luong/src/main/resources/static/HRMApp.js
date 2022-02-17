var clientInfo = "";
var idPer = 0;
var app = angular.module("myApp", ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngCookies', 'ui.bootstrap']);
app.config(function($routeProvider) {
	//console.log($routeProvider);
	$routeProvider
		.when("/", {
			templateUrl: "screens/login/Login.html",
			controller: "LoginCtrl"
		})
		.when("/Login", {
			templateUrl: "screens/login/Login.html",
			controller: "LoginCtrl"
		})
		.when("/General", {
			templateUrl: "screens/general/General.html",
			controller: "GeneralCtrl"
		})
		.when("/Forgot", {
			templateUrl: "screens/forgot/Forgot.html",
			controller: "ForgotCtrl"
		})
		.when("/Changepass", {
			templateUrl: "screens/changepassword/Changepass.html",
			controller: "ChangepassCtrl"
		})
		.when("/Translate", {
			templateUrl: "screens/translate/Translate.html",
			controller: "TranslateCtrl"
		})
		.when("/SystemFunctions", {
			templateUrl: "screens/system/System.html",
			controller: "SystemCtrl"
		})
		.when("/Profiles", {
			templateUrl: "screens/candidate/Candidate.html",
			controller: "CandidateController",
		})
		.when("/CanProfile", {
			templateUrl: "screens/canprofile/CanProfile.html",
			controller: "CanProfileCtrl"
		})
		.when("/CanProfileInfo", {
			templateUrl: "screens/canprofileinfo/CanProFileInfo.html",
			controller: "CanProFileInfoCtrl"
		})
		.when("/DecentralizationOfRoles", {
			templateUrl: "screens/decentralization/Decentralization.html",
			controller: "DecentralizationCtrl"
		})
		.when("/Role", {
			templateUrl: "screens/role/Role.html",
			controller: "RoleCtrl"
		})
		.when("/UserList", {
			templateUrl: "screens/userlist/Userlist.html",
			controller: "UserlistCtrl"
		})
		.when("/Label", {
			templateUrl: "screens/screenslabel/ScreensLabel.html",
			controller: "ScreensLabelCtrl"
		});
	});

	app.directive('fileModel', ['$parse', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};

	}]);
	app.run(function($rootScope, $location, $sce, $compile, $http, WebService, $cookies) {
		$rootScope.$on("$locationChangeStart", function(event, next, current) {
			if ($rootScope.logintrue != true) {
				if ($location.path() == '/Forgot') {
					$location.path('/Forgot');
				} else {
					$location.path('/');
				}

			}

		});

		$rootScope.$on('buildMenu', function(events, data) {
			fnGetMenu(data);
			clientInfo = data;
		});

		function fnGetMenu(data) {
			var request = { "dummySearch": data }
			WebService.call($http, "menu/menu002", request, function(response) {
				var menuHtml = $("#menuList").html(loadMenu(response.data.list));
				$compile(menuHtml)($rootScope);
			}, "POST")
		}


		$rootScope.menuclickItem = function(url) {
			if (url != "" && url != "null" && url != "None") {
				idPer = 0;
				$rootScope.$emit('clickInfo1', true);
				$location.path('/' + url);
				$rootScope.isActive = function(route) {
					return route === url;
				}
			}

		}

		function loadMenu(listmenu) {
			var txt = "";
			for (x in listmenu) {
				if (listmenu[x].parentId == -1) {
					txt += "<li class ='nav-item has-treeview'>" + "<a href='' data-ng-click= menuclickItem('" + listmenu[x].url + "') data-ng-class = {active:isActive('" + listmenu[x].url + "')} class='nav-link' ><i class='nav-icon " + listmenu[x].cssIcon + "'></i><p>" + listmenu[x].displayText + "<i class='right fas fa-angle-left'></i></p>" + "</a>"
					txt += "<ul class='menuleft nav nav-treeview'>"
					for (y in listmenu) {
						if (listmenu[y].parentId == listmenu[x].id) {
							txt += "<li class='nav-item'>" + "<a href='' data-ng-click= menuclickItem('" + listmenu[y].url + "') data-ng-class = {active:isActive('" + listmenu[y].url + "')} class = 'nav-link'>" + '<i class="far fa-circle nav-icon"></i>' + "<p>" + listmenu[y].displayText + "<i class='right " + listmenu[y].cssIconDrop + "'></i></p>" + "</a>"
							txt += "<ul class='menuleft nav nav-treeview'>"
							for (z in listmenu) {
								if (listmenu[z].parentId == listmenu[y].id && listmenu[z].funcTypeId == 1) {
									txt += "<li class='nav-item ml-4'>" + "<a href data-ng-click= menuclickItem('" + listmenu[z].url + "') data-ng-class = {active:isActive('" + listmenu[z].url + "')} class = 'nav-link'>" + '<i class="far fa-dot-circle nav-icon"></i>' + "<p>" + listmenu[z].displayText + "</p>" + "</a>" + "</li>"
								}
							}
							txt += "</ul>"
							txt += "</li>"

						}
					}
					txt += "</ul>"
					txt += "</li>"
				}

			}
			return txt;


		}
	});


	function fnGetClientInfo() {
		return clientInfo;
	}
