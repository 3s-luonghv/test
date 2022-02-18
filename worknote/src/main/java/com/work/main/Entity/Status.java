package com.work.main.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity              
@Table(name = "status")
public class Status {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "status_id", nullable = false)
	private Long statusID;
	@Column(name = "name", nullable = false)
	private String name;
	@OneToMany(mappedBy = "status", cascade = CascadeType.ALL)
	List<Worknote> worknotes;
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
	public List<Worknote> getWorknotes() {
		return worknotes;
	}
	public void setWorknotes(List<Worknote> worknotes) {
		this.worknotes = worknotes;
	}
	public Status(Long statusID, String name, List<Worknote> worknotes) {
		super();
		this.statusID = statusID;
		this.name = name;
		this.worknotes = worknotes;
	}
	public Status() {
		super();
		// TODO Auto-generated constructor stub
	}
}
