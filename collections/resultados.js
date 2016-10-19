Resultados = new Mongo.Collection('resultados');

Resultados.attachSchema(
  new SimpleSchema({
    idPartida: {
      type: String
    },
    idGrupo: {
      type: String
    },
    dineroInicial: {
      type: Number
    },
    dineroInvertido: {
      type: Number
    },
    ganancias: {
      type: Number
    },
    resultados: {
      type: Number
    },
  })
);

if (Meteor.isServer) {
  Resultados.allow({
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
