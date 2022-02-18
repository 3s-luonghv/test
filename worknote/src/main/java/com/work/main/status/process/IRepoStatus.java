package com.work.main.status.process;

import org.springframework.data.jpa.repository.JpaRepository;

import com.work.main.Entity.Status;

public interface IRepoStatus extends JpaRepository< Status, Long>{

}
