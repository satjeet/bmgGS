/*Temporalmente seran datos fijoss*/
var duraciones = [2, 5, 10, 15, 20, 25, 30];
var duraciones2 = [1, 2, 5, 10];
var tipos = ['trimestre', 'semestre','anual'];
var cantidadesPeriodos = [3,6,9,12];

Template['partidaNueva'].onCreated(function(){
  // this.faseA = new ReactiveVar(false);
  // this.faseB = new ReactiveVar(false);
  // this.faseC = new ReactiveVar(false);
  this.alerta = new ReactiveVar("");
})

Template['partidaNueva'].helpers({
  alertasHidden:function(){
    if(Template.instance().alerta.get() == ""){
      return "hidden";
    }
    return "";
  },
  alerta:function(){
    return Template.instance().alerta.get();
  },
  escenarios: function() {
    return Escenarios.find();
  },
  encuestas: function() {
    return Encuestas.find();
  },
  dropEscenarios: function() {
    var escs = Escenarios.find().fetch();

    var res = [];//[{value:1, text:"test"}];
    _.each(escs, function(esc){
      console.log(esc)
      if(esc){
        res.push({value:esc._id, text:esc.nombre});
      }
    })

    return {
      data:res,
      config:{
        placeholder:'empty',
        default:0
      }
    };
  },
  dropEncuestas: function() {
    var encs = Encuestas.find().fetch();
    var res = [];//[{value:1, text:"test"}];
    _.each(encs, function(enc){
      console.log(enc)
      if(enc){
        res.push({value:enc._id, text:enc.nombreEncuesta});
      }
    })

    return {
      data:res,
      config:{
        placeholder:'empty',
        default:0
      }
    };  },
  // faseA:function(){
  //   return Template.instance().faseA.get();
  // },
  // faseB:function(){
  //   return Template.instance().faseB.get();
  // },
  // faseC:function(){
  //   return Template.instance().faseC.get();
  // },
  duracionesFaseA:function(){
    return duraciones;
  },

  dropTimes:function() {
    var res = [{value:-1, text:TAPi18n.__("partida.duracion")}];//[{value:1, text:"test"}];
    _.each(duraciones, function(time){
      console.log(time)
      if(time){
        res.push({value:time, text:time+" "+TAPi18n.__("partida.minutos")});
      }
    })

    return {
      data:res,
      config:{
        placeholder:'empty',
        default:0
      }
    };
  },

  dropTimes2:function() {
    var res = [{value:-1, text:TAPi18n.__("partida.duracion")}];//[{value:1, text:"test"}];
    _.each(duraciones2, function(time){
      console.log(time)
      if(time){
        res.push({value:time, text:time+" "+TAPi18n.__("partida.minutos")});
      }
    })

    return {
      data:res,
      config:{
        placeholder:'empty',
        default:0
      }
    };
  },

  duracionesFaseB:function(){
    return duraciones;
  },
  duracionesFaseC:function(){
    return duraciones;
  },
  tipos:function(){
    return tipos;
  },
  cantidadesPeriodos:function(){
    return cantidadesPeriodos;
  }
});

Template['partidaNueva'].events({
  'click #btnClear': function(event, template) {
    $('#formNewPartida')[0].reset();
    Router.go('partidas');
  },
  'submit #formNewPartida': function(event) {
    event.preventDefault();
    var partida = {
      idProfesor: Meteor.userId(),
      nombrePartida: $('#txtNombrePartida').val(),
      idEscenario: $('#selectEscenario').data().value,
      idEncuesta: $('#selectEncuesta').data().value,
      duracionFaseA: parseInt($('#selectDuracionFaseA').data().value),
      duracionFaseB: parseInt($('#selectDuracionFaseB').data().value),
      duracionFaseC: parseInt($('#selectDuracionFaseC').data().value),
      tipoPeriodo: $('#selectTipo').val(),
      cantidadPeriodos: parseInt($('#selectCantidad').val())
    }

    if(partida.duracionFaseC == -1){
      partida.tipoPeriodo = "";
      partida.cantidadPeriodos = -1;
    }
    var instancia = Template.instance();
    Meteor.call('newPartida', partida, function(err,result){
      if(err){
        instancia.alerta.set(err);
      }else if(result){
        Router.go('/lobby/' + result);
      }
    });
  },
  // 'click #togFaseA':function(event){
  //   Template.instance().faseA.set($('#togFaseA').is(':checked'));
  // },
  // 'click #togFaseB':function(event){
  //   Template.instance().faseB.set($('#togFaseB').is(':checked'));
  // },
  // 'click #togFaseC':function(event){
  //   Template.instance().faseC.set($('#togFaseC').is(':checked'));
  // }
});
