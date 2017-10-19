package com.mp.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import com.mp.model.Tarea;

/**
 *
 * @author JasonDiazG
 */
@Stateless
public class TareaDao {
    @PersistenceContext(unitName = "demo-persistence-unit")
    private EntityManager em;

    public void create(Tarea entity) {
        em.persist(entity);
    }

    public void deleteById(Long id) {
        Tarea entity = em.find(Tarea.class, id);
        if (entity != null)
            em.remove(entity);
    }

    public Tarea findById(Long id) {
        return em.find(Tarea.class, id);
    }

    public Tarea update(Tarea entity) {
        return em.merge(entity);
    }

    public List<Tarea> listAll(Integer startPosition, Integer maxResult) {
        TypedQuery<Tarea> findAllQuery = em.createQuery(
            "SELECT DISTINCT p FROM Tarea p ORDER BY p.id", Tarea.class);
        if (startPosition != null) {
            findAllQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findAllQuery.setMaxResults(maxResult);
        }
        return findAllQuery.getResultList();
    }
}
