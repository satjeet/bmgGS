PartidaData = new Mongo.Collection('PartidaData');

PartidaData.attachSchema(
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
    turno: {
      type: Number
    },
    duracion: {
      type: Number
    },
   })
);

if (Meteor.isServer) {
  PartidaData.allow({
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
