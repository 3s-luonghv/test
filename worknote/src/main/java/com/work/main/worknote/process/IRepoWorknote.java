package com.work.main.worknote.process;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.work.main.Entity.Status;
import com.work.main.Entity.Worknote;

@Repository
public interface IRepoWorknote  extends JpaRepository<Worknote, Long>{

	
}