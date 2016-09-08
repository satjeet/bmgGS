Template['lobbyProfesorNav'].onCreated(function() {
  this.alerta = new ReactiveVar("");
});


Template['lobbyProfesorNav'].helpers({
  alertasHidden:function(){
    if(Template.instance().alerta.get() == ""){
      return "hidden";
    }
    return "";
  },
  alerta:function(){
    return Template.instance().alerta.get();
  },
  isGruposBloqueados: function() {
    return this.isGroupsLocked;
  },
  idPartida: function(){
    return this._id;
  },
  shortidPartida: function(){
    return this._id.substr(0,5);
  },
  grupos: function() {
    var grupos = Grupos.find({idPartida: this._id}).fetch();

    var res = [];//[{value:1, text:"test"}];
    
    var first = true;

    _.each(grupos, function(group){
        console.log(group)
        if(group.nombre!="Sin Grupo"){
          var resG = {
            id:group._id,
            data:[],
            config:{placeholder:group.nombre}
          }
          if(first){
            first = false;
            resG.config.open = true;
          }

          //{value:"10", text:"lala"},
          _.each(group.miembros, function(miembro){
            var user = Meteor.users.findOne({_id: miembro});
            //usernames.push(user.username);
            resG.data.push({value:user._id, text:user.username})
          })

          res.push(resG);
        }
    })
    return res;

  },
  bloquearlabel: function() {
    return TAPi18n.__("partida.bloquear")
  },
  singrupo: function() {
    var grupo = Grupos.findOne({idPartida: this._id, nombre:"Sin Grupo"})//.fetch();

    var res = [];//[{value:1, text:"test"}];
    // console.log(grupo)
    // var first = true;

    // _.each(grupos, function(group){
    //     console.log(group)
    //     if(group.nombre=="Sin Grupo"){
    //       var resG = {
    //         //id:group._id,
    //         data:[],
    //         //config:{placeholder:group.nombre}
    //       }
    //       // if(first){
    //       //   first = false;
    //       //   resG.config.open = true;
    //       // }

    //       //{value:"10", text:"lala"},
    _.each(grupo.miembros, function(miembro){
      var user = Meteor.users.findOne({_id: miembro});
      //usernames.push(user.username);
      res.push({value:user._id, text:user.username})
    })
    //       console.log(resG.data)
    //       return resG.data;
    //     }
    // })
    //return res;
    return res;
  },
  grouptest: function(){

    return {
      id:"asd",
      data:[
        {value:"10", text:"lala"},
        {value:"19", text:"lolo"},
        {value:"12", text:"yom"}
      ],
      config:{placeholder:"Grupo23"}
    }
    
  },

});

Template['lobbyProfesorNav'].events({
  'click #switchBloquearGrupos': function(event) {
    var value = event.currentTarget.dataset.on;
    console.log(this)
    console.log("bloquear")
    if(value=="1"){
      Meteor.call('setGroupLock', {
        idPartida: this._id,
        isGroupsLocked: true
      });
    }else{
      Meteor.call('setGroupLock', {
        idPartida: this._id,
        isGroupsLocked: false
      });
    }
  },
  'click #btnBloquearGrupos': function() {
    Meteor.call('setGroupLock', {
      idPartida: this._id,
      isGroupsLocked: true
    });
  },
  'click #btnDesbloquearGrupos': function() {
    Meteor.call('setGroupLock', {
      idPartida: this._id,
      isGroupsLocked: false
    });
  },
  'click #btnForzarGrupos': function(){
    var instancia = Template.instance();
    Meteor.call('forzarGrupos', {idPartida: this._id},function(err){
      if(err){
        instancia.alerta.set(err);
      }else instancia.alerta.set("");
    });
  },
  'click #btnIniciarPartida': function(){
    //Obtiene la id de todos los grupos
    var idGrupos = [];
    Grupos.find({idPartida: this._id}).forEach(function(grupo){
      idGrupos.push(grupo._id);
    });

    Meteor.call('iniciarPartida', {
      idPartida: this._id,
      idGrupos: idGrupos
    }, function(err,result){
      if(result)
        Router.go(result);
    });
  }
});
