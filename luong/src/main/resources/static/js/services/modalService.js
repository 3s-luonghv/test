
app.service('ModalService', function ($uibModal) {
    this.ShowModal = function (URLtemplate, control,TitleParameter, Parameter,callback) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: URLtemplate,
            controller: control,
            size: 'lg',
            appendTo: 'body',
			backdrop: false,
            resolve: {
	
                parentParameter: function () {
                    return Parameter;
	
                },
				 TitleparentParameter: function () {
                    return TitleParameter;
	
                }
            }
        });
        modalInstance.result.then(function (response) {
            // callback(paramater);

		callback(response);
		
        }, function () {
            console.log('Modal dismissed at: ' + new Date()); // click ra ngoai mo dal
        });

    }
	this.alert =function ( Parameter,yesCallBack,noCallBack ) {
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'screens/modal/alertModal.html',
            controller: 'alertModalController',
            size: '',
            appendTo: 'body',
			backdrop: false,
            resolve: {
                parentParameter: function () {
                    return Parameter;	
                }	
            }
        });
        modalInstance.result.then(function (response) {
           yesCallBack();		
		        }
		, function () {
			noCallBack()
		            console.log('Modal dismissed at: ' + new Date()); // click ra ngoai mo dal
		        });
		    }

});