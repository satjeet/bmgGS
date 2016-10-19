FasesC = new Mongo.Collection('FasesC');

FasesC.attachSchema(
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
    lastStepTime: {
      type: Date,
      optional: true
    },
    cantPeriodos:{
      type:Number
    },
    duracion:{
      type:Number
    },
    idConfigFaseC:{
      type:String
    },
    "periodos.$.numero":{
      type:Number
    },
    "periodos.$.fechaInicio":{
      type:Date
    },
    "periodos.$.fechaFin":{
      type:Date
    }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  FasesC.allow({
    insert : function () {
      return false;
    },
    update : function () {
      return false;
    },
    remove : function () {
      return false;
    }
  });
}
