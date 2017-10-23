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

    public List<Tarea> findByIdCategoria(int id) {
        TypedQuery<Tarea> findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p WHERE p.categoria.id = :id ORDER BY p.id", Tarea.class).setParameter("id", id);
        return findQuery.getResultList();
    }

    public Tarea update(Tarea entity) {
        return em.merge(entity);
    }

    public List<Tarea> listAll(Integer startPosition, Integer maxResult, Integer id, String busqueda) {
        TypedQuery<Tarea> findQuery;
        if (id != null)
            findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p WHERE p.categoria.id = :id ORDER BY p.id", Tarea.class).setParameter("id", id);
        else if (busqueda != null)
            findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p WHERE (p.titulo LIKE :busqueda OR p.descripcion LIKE :busqueda) ORDER BY p.id", Tarea.class).setParameter("busqueda", "%" + busqueda + "%");            
        else
            findQuery = em.createQuery("SELECT DISTINCT p FROM Tarea p ORDER BY p.id", Tarea.class);
        
        if (startPosition != null) {
            findQuery.setFirstResult(startPosition);
        }
        if (maxResult != null) {
            findQuery.setMaxResults(maxResult);
        }
        return findQuery.getResultList();
    }
}
