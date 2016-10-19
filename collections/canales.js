/////////////////   Canales  /////////////////////

var Schemas = {};

Canales =new Mongo.Collection("canales");

Schemas.Canal = new SimpleSchema({
	 idPartida: {
        type: String,
        label: "id partida",
        max: 200
    },
    canal: {
        type: SimpleSchema.Array,
        label: "canales",
        optional: true
    },
    'canal.$': {
        type: Object
    },
    "canal.$.nombreCanal": {
        type: String,
        label: "Nombre del Canal",
        max: 200
    },
    "canal.$.opcion": {
        type: Number,
        label: "Opcion que representa al canal",
        optional: true
    },
    "canal.$.costo": {
        type: Number,
        label: "Costo del Canal",
        optional: true
    },
    "canal.$.eficiencia": {
        type: Number,
        decimal:true,
        label: "Eficiencia del Canal",
        optional: true
    },
    "canal.$.vector6": {
        type: [Number],
        label: "Vector 6",
        optional: true,
        
    },
    
 
   

    //falta el vector 6, quiero ver si lo puedo dejar sin registrar.
});

Canales.attachSchema(Schemas.Canal);

if (Meteor.isServer) {

  Canales.allow({
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
};