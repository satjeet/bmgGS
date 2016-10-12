FasesA = new Mongo.Collection('FasesA');

FasesA.attachSchema(
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
    idConfigFaseA: {
      type: String
    }
  })
);

if (Meteor.isServer) {
  FasesA.allow({
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
