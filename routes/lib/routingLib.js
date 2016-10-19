Meteor.GL = Meteor.GL||{};
Meteor.GL.Routing = {
  redireccionarPartida: function(partida){
    var rutaCorrecta = "";
    console.log("partida estado actual"+partida.estadoActual);
    if(partida.estadoActual == "Lobby"){
      rutaCorrecta = '/lobby/' + partida._id;
    }else if(partida.estadoActual == "FaseA"){
      rutaCorrecta = '/fase0/' + partida._id;
    }else if(partida.estadoActual == "Finalizada"){
      rutaCorrecta = '/';
    }
    Router.go(rutaCorrecta);
  },
  isLobby: function(estadoActual){
    return estadoActual == "Lobby";
  },
  isFaseA: function(estadoActual){
    return estadoActual == "FaseA";
  },

  
}
