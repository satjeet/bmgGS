Meteor.GL = Meteor.GL||{};
Meteor.GL.Routing = {
  redireccionarPartida: function(partida){
    var rutaCorrecta = "";
    if(partida.estadoActual == "Lobby"){
      rutaCorrecta = '/lobby/' + partida._id;
    }else if(partida.estadoActual == "FaseA"){
      rutaCorrecta = '/objetivos/' + partida._id;
    }else if(partida.estadoActual == "FaseB"){
      rutaCorrecta = '/indicadores/' + partida._id;
    }else if(partida.estadoActual == "FaseB"){
      rutaCorrecta = '/resultadosFaseB/' + partida._id;
    }else if(partida.estadoActual == "FaseC"){
      rutaCorrecta = '/iniciativas/' + partida._id;
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
  isFaseB: function(estadoActual){
    return estadoActual == "FaseB";
  },
  isFaseC: function(estadoActual){
    return estadoActual == "FaseC";
  }
}
