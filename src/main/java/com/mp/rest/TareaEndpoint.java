package com.mp.rest;

import com.mp.dao.TareaDao;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.OptimisticLockException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import com.mp.model.Tarea;
import javax.inject.Inject;

/**
 *
 * @author JasonDiazG
 */
@Stateless
@Path("/tarea")
@Produces("application/json")
@Consumes("application/json")
public class TareaEndpoint {

    @Inject
    TareaDao tareaService;

    @POST
    public Response create(Tarea entity) {
        tareaService.create(entity);

        return Response.created(
                UriBuilder.fromResource(TareaEndpoint.class)
                        .path(String.valueOf(entity.getId())).build()).build();
    }

    @DELETE
    @Path("/{id:[0-9][0-9]*}")
    public Response deleteById(@PathParam("id") Long id) {
        Tarea entity = tareaService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        tareaService.deleteById(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id:[0-9][0-9]*}")
    public Response findById(@PathParam("id") Long id) {

        Tarea entity = tareaService.findById(id);
        if (entity == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        return Response.ok(entity).build();
    }

    @GET
    public List<Tarea> listAll(@QueryParam("start") Integer startPosition,
        @QueryParam("max") Integer maxResult,
        @QueryParam("idCategoria") Integer idCategoria) {
        
        final List<Tarea> results = tareaService.listAll(startPosition, maxResult, idCategoria);
        return results;
    }

    @PUT
    @Path("/{id:[0-9][0-9]*}")
    public Response update(@PathParam("id") Long id, Tarea entity) {
        if (entity == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (id == null) {
            return Response.status(Status.BAD_REQUEST).build();
        }
        if (!id.equals(entity.getId())) {
            return Response.status(Status.CONFLICT).entity(entity).build();
        }
        if (tareaService.findById(id) == null) {
            return Response.status(Status.NOT_FOUND).build();
        }
        try {
            entity = tareaService.update(entity);
        } catch (OptimisticLockException e) {
            return Response.status(Response.Status.CONFLICT)
                    .entity(e.getEntity()).build();
        }

        return Response.ok(entity).build();
    }
}
