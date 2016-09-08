Template.lobbyAlumnoNav.onCreated(function() {
  this.isCreatingNewGroup = new ReactiveVar(false);
  this.alerta = new ReactiveVar("");
});

Template['lobbyAlumnoNav'].helpers({
  alertasHidden:function(){
    if(Template.instance().alerta.get() == ""){
      return "hidden";
    }
    return "";
  },
  alerta:function(){
    return Template.instance().alerta.get();
  },
  isCreatingNewGroup: function() {
    var isCreatingNewGroup = Template.instance()['isCreatingNewGroup'];
    return isCreatingNewGroup.get() && !this.isGroupsLocked;
  },
  bloquearlabel: function() {
    return TAPi18n.__("partida.bloquear")
  },
  isGroupsLocked: function() {
    if (this.isGroupsLocked)
      Template.instance()['isCreatingNewGroup'].set(false);
    return this.isGroupsLocked;
  },
  myid: function() {
    return Meteor.userId();
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
  }
});

Template['lobbyAlumnoNav'].events({
  'click #btnNewGroup': function(event, template) {
    template.isCreatingNewGroup.set(true);
    if ($('#formNewGroup')[0] != undefined) {
      $('#formNewGroup')[0].reset();
    }
  },
  'click #btnClear': function(event, template) {
    template.isCreatingNewGroup.set(false);
    if ($('#formNewGroup')[0] != undefined) {
      $('#formNewGroup')[0].reset();
    }
  },
  'submit #formNewGroup': function(event, template) {
    event.preventDefault();
    if (!Template.instance().data.isGroupsLocked){
      var newGroupParams = {
        nombre: $('#txtNombreGrupo').val(),
        idPartida: Template.parentData(2).data._id,
        idUser: Meteor.userId()
      };
      var instancia = Template.instance();
      Meteor.call('newGroup', newGroupParams, function(err){
        if(err){
          instancia.alerta.set(err);
        }else {
          instancia.alerta.set("");
          template.isCreatingNewGroup.set(false);
        }
      });
    }
  },
  'click .joingroup': function(event) {
    if (!Template.instance().data.isGroupsLocked){
      var group = event.currentTarget.dataset.name;     
      Meteor.call('userJoinGroup', {
        idUser: Meteor.userId(),
        idPartida: Template.parentData(2).data._id,
        nombre: group
      });
    }
  },
  'click #btnLeave': function(event) {
    if (!Template.instance().data.isGroupsLocked){
      Meteor.call('quitarAlumnoGrupo', {
        idUser: Meteor.userId(),
        idPartida: Template.parentData(2).data._id
      });
    }
  }
});