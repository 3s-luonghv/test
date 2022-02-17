package org.o7planning.sbcrudrestful.delete.webservice;

import org.o7planning.sbcrudrestful.delete.dto.DeleteRequest;
import org.o7planning.sbcrudrestful.delete.dto.DeleteResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;



@RequestMapping("/demo")
@RestController("Delete")
public class DeleteWebService  {

	@Qualifier("procDelete")
	@Autowired
	//IProcessor proc = null;

	@RequestMapping(value = "procDelete", consumes = "application/json;charset=UTF-8", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public DeleteResponse process(@RequestBody DeleteRequest request) {
		return (DeleteResponse) process(request);
	}

}