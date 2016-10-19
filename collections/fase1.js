FasesB = new Mongo.Collection('FasesB');

FasesB.attachSchema(
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
  FasesB.allow({
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

