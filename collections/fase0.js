Fases0 = new Mongo.Collection('Fases0');

Fases0.attachSchema(
  new SimpleSchema({
    idPartida: {
      type: String
    },
    fechaInicio: {
      type: Date,
      optional: true
    },
    fechaFin: {
      type: Date,
      optional: true
    },
    duracion: {
      type: Number
    },
    idConfigFase0: {
      type: String
    }
  })
);

if (Meteor.isServer) {
  Fases0.allow({
    insert: function() {
      return false;
    },
    update: function() {
      return false;
    },
    remove: function() {
      return false;
    }
  });
}
