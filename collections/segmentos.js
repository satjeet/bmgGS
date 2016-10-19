Segmentos = new Mongo.Collection('segmentos');
var Schemas = {};

/////////////////   SEGMENTOS  /////////////////////

Schemas.Segmento = new SimpleSchema({
   idPartida: {
        type: String,
        label: "id de la Partida",
        max: 200
    },
   idGrupo: {
        type: String,
        label: "id del Grupo",
        max: 200
    },
    dineroInicial: {
        type: Number,
        label: "Dinero Inicial",
        optional: true
    },
    dineroInvertido: {
        type: Number,
        label: "Dinero Invertido",
        optional: true
    },
    ganancias: {
        type: Number,
        label: "Ganancias",
        optional: true
    },
    resultado: {
        type: Number,
        label: "Resultado",
        optional: true
    },
     segmentos: {
        type: SimpleSchema.Array,
        label: "Los segmentos",
        optional: true
    },
    "segmentos.$": {
        type: Object,
        label: "objeto del arreglo",
        max: 200
    },
    "segmentos.$.nombreSegmento": {
        type: String,
        label: "Nombre del Segmento",
        max: 200
    },
    "segmentos.$.opcion": {
        type: Number,
        label: "Opcion que representa al segmento",
        optional: true
    },
    "segmentos.$.marketShare": {
        type: Number,
        label: "Market Share que posee el Segmento",
        optional: true
    },
    "segmentos.$.canalPicked": {
        type: String,
        label: "Canal escogido",
        optional: true
    },
    "segmentos.$.eficienciaPicked": {
        type: Number,
        label: "Eficiencia escogida",
        decimal:true,
        optional: true
    },
    "segmentos.$.fidelidad": {
        type: Number,
        label: "Fidelidad del Segmento",
        optional: true
    },
    "segmentos.$.dineroInvertido": {
        type: Number,
        label: "Dinero invertido por el grupo",
        optional: true
     },
    "segmentos.$.size": {
        type: Number,
        label: "Size del Segmento",
        optional: true
    },
    "segmentos.$.margin": {
        type: Number,
        label: "Margin del Segmento",
        optional: true
    },
    "segmentos.$.value": {
        type: Number,
        label: "Value del Segmento",
        optional: true
    }

});

Segmentos.attachSchema(Schemas.Segmento);


if (Meteor.isServer) {
  Segmentos.allow({
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