import { normalize as normalizr, schema } from 'normalizr';
const actor = new schema.Entity('actors');
const actors = new schema.Array(actor);
actors.define({ actors });
const movie = new schema.Entity('movies', {
  actors: [actor]
});

export const normalize = originalMovies => normalizr(originalMovies, new schema.Array(movie));
