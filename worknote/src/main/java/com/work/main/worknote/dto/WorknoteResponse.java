package com.work.main.worknote.dto;

import java.util.Date;

import com.work.main.Entity.Status;
import com.work.main.Entity.Worknote;
import com.work.main.common.base.BaseRequest;

public class WorknoteResponse{
private Long workID;	

	private String name;
	
	private Date startDate;
	

	private Date endDate;
	
	private Long statusID;
	
	private String statusName;

	public WorknoteResponse() {
		super();
		// TODO Auto-generated constructor stub
	}



	public WorknoteResponse(Long workID, String name, Date startDate, Date endDate, Long status) {
		super();
		this.workID = workID;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.statusID = status;
		
	}
	
	public WorknoteResponse( Worknote entity) {
		super();
		this.workID = entity.getWorkID();
		this.name =  entity.getName();
		this.startDate = entity.getStartDate();
		this.endDate = entity.getEndDate();	
		this.statusID = entity.getStatus().getStatusID();
		this.statusName = entity.getStatus().getName();
		
	}

	public Long getWorkID() {
		return workID;
	}

	public void setWorkID(Long workID) {
		this.workID = workID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}



	public Long getStatusID() {
		return statusID;
	}



	public void setStatusID(Long statusID) {
		this.statusID = statusID;
	}



	public String getStatusName() {
		return statusName;
	}



	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	
	
}
