app.controller('ForgotCtrl', function($http, $scope, $rootScope, $location, WebService, ModalService, $uibModal, ValidateUltility) {
	$rootScope.showAside = "ml-0"
	$rootScope.showNav = false;
	$rootScope.showHead = false;
	$rootScope.titlePage = "LOGIN";
	$scope.selectLanguage = 'vi';
	
	
	/**
		Tạo ramdom chuỗi kí tự làm mật khẩu mới
		param: length là độ dài chuỗi kí tự cần lấy vd: makePass(8)--> trả về chuỗi 8 kí tự
		return: chuỗi 8 kí tự random 
	 */
	function makePass(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	//end - makePass
	
	//Hàm xử lí check userName và email đúng thì thực hiện tạo mật khẩu random
	$scope.Confirm = function () {
		ClearMessage ();
		if(fnValidateForm() == true) {
			 return;
			} else {
				var requestForgot = {
				 "dummySearch": {
     				"userName" :  $scope.ForgotUser,
      				"email" : $scope.ForgotEmail
    				}
				}
				
			WebService.call($http, "useraccount/useraccount002", requestForgot, function(response){				
				var data = response.data.list[0];			
				if( response.data.list.length == 1){// nếu length trả về 1 thì userName và email tồn tại trong DB
					fnUpdDataUser (data);
				}else {
					ModalService.alert({"modalTitle":"Warning","messenge":"Tài khoản hoặc Email không đúng!"}, function(){ console.log("yes")},function(){console.log("no")})
				}
				}, "POST");	
			}
	}
	//end - Confirm
	
	//Xử lí get Api update user
	function fnUpdDataUser (data){
			var newpass = makePass(8);// mật khẩu random 8 kí tự
			var requestupdatepass = {
									    "dto": {
									        "companyId": data.companyId,
									        "emailId": data.emailId,
									        "userName": data.userName,
									        "password": newpass,
									        "isVerified": data.isVerified,
									        "verifiedTime":data.verifiedTime,
									        "verifinedBy": data.verifinedBy,
									        "useFlag": data.useFlag,
									        "token": data.token,
									        "curentState": data.curentState,
									        "lastState": data.lastState,
									        "id": data.id
									    	   }
											}
										
		WebService.call($http, "useraccount/useraccount004", requestupdatepass, function(response){
			if(response.data.isDone == true) {
				console.log(response);
				$scope.ForgotUser = null;
				$scope.ForgotEmail = null;
				var mess = " Mật khẩu mới của bạn là :  " + response.data.dto.password;
				var mess2 =	" Nhấn 'Có' để trở về trang đăng nhập, 'không' để đóng.";
				ModalService.alert({"modalTitle":"SuccessQA","messenge": mess,"messenge2": mess2}, function(){
					$location.path("/");
				},function(){console.log("no")})
			}
		}, "POST");
	}
	//end - fnUpdDataUser
	$scope.Cancel = function() {
			$scope.ForgotUser = "";
			$scope.ForgotEmail = "";
		}
	
	function ClearMessage () {
		    $scope.messageUser = "";
		 	$scope.messageEmail = "";

	}
	
	
	  function fnValidateForm() {
        var hasError = false;
        if (ValidateUltility.checkEmpty($scope.ForgotUser)) {
            $scope.messageUser = "Vui lòng nhập vào tài khoản!";
            hasError = true;
        }  
		if  (ValidateUltility.checkEmpty($scope.ForgotEmail)) {
		 	$scope.messageEmail = "Vui lòng nhập vào Email!";
	 		hasError = true;
			}
		return hasError;
	}
	
	
	
	
	
	
});