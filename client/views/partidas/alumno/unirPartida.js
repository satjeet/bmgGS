Template['unirPartida'].onCreated(function(){
  this.alerta = new ReactiveVar("");
})

Template['unirPartida'].helpers({
  alertasHidden:function(){
    if(Template.instance().alerta.get() == ""){
      return "hidden";
    }
    return "";
  },
  alerta:function(){
    return Template.instance().alerta.get();
  },
  dropPartidas:function() {
    var res = [];//[{value:1, text:"test"}];

    var partidas = Partidas.find({estadoActual: {$ne: "Finalizada"} }).fetch();

    for(var np in partidas){
      var partida = partidas[np];
      var d = (partida.createdAt+'').split(' ');
      res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});
    }

    return {data:res,config:{placeholder:TAPi18n.__("partida.partidasAnteriores")}};
  }
});

Template['unirPartida'].events({
  'click #btnJoin': function(event) {
    var template =  Template.instance();
    var idPartida = $('#txtCodigo').val();
    var parametros = {
      idPartida: idPartida,
      idUser: Meteor.userId()
    }
    Meteor.call('joinPartida', parametros , function(err, result){
      if(err){
        template.alerta.set(err);
      }else if(result){
        Router.go('/lobby/' + idPartida);
      }
    });
  },
  'click #listPartidas li': function(event) {
    //console.log(event)
    var id = event.target.dataset.val;
    Router.go('/lobby/' + id);
  }
});
