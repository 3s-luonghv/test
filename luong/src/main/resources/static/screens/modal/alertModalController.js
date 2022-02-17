app.controller('alertModalController', function($scope, $uibModalInstance, $http, WebService, parentParameter, $uibModal,ModalService) {
	if (parentParameter.modalTitle== "Question") {
		$scope.titlePopup = "Xác nhận";
		$scope.iconModal = "fa-question-circle text-primary"
		$scope.buttonNo = true;
		$scope.buttonYs = 'Có';
	}
	if (parentParameter.modalTitle== "Success") {
		$scope.titlePopup = "Thành công";
		$scope.iconModal = "fa-check-circle text-success"
		$scope.buttonYs = 'Đóng';
	}
	if (parentParameter.modalTitle == "Warning") {
		$scope.titlePopup = "Cảnh báo";
		$scope.iconModal = "fa-exclamation-circle text-warning"
		$scope.buttonYs = 'Đóng';
	}
	if (parentParameter.modalTitle == "Error") {
		$scope.titlePopup = "Lỗi";
		$scope.iconModal = "fa-exclamation-circle text-danger"
		$scope.buttonYs = 'Đóng';
	}
	
	if (parentParameter.modalTitle== "SuccessQA") {
		$scope.titlePopup = "Thành công";
		$scope.iconModal = "fa-check-circle text-success"
		$scope.buttonNo = true;
		$scope.buttonYs = 'Có';
	}

	$scope.mesagePopup = parentParameter.messenge
	$scope.mesagePopup2 = parentParameter.messenge2
	$scope.yesPopup = function (response)
	{
		$uibModalInstance.close(response)
	}
	
	$scope.noPopup = function (response)
	{
		$uibModalInstance.dismiss()
	}
	
})