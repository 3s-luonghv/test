package com.work.main.status.dto;

import java.util.Date;

import com.work.main.Entity.Status;
import com.work.main.common.base.BaseRequest;

public class StatusResponse{

private Long statusID;

private String name;

public StatusResponse() {
	super();
	// TODO Auto-generated constructor stub
}

public StatusResponse(Long workID, Long statusID, String name) {
	super();

	this.statusID = statusID;
	this.name = name;
}

public StatusResponse(Status entity) {
	super();
	
	this.statusID = entity.getStatusID();
	this.name = entity.getName();
}



public Long getStatusID() {
	return statusID;
}

public void setStatusID(Long statusID) {
	this.statusID = statusID;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

	
}
