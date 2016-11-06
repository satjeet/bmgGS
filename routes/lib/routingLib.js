Meteor.GL = Meteor.GL||{};
Meteor.GL.Routing = {
  redireccionarPartida: function(partida){
    var rutaCorrecta = "";
    console.log("partida estado actual"+partida.estadoActual);
    if(partida.estadoActual == "Lobby"){
      rutaCorrecta = '/lobby/' + partida._id;
    }else if(partida.estadoActual == "FaseA"){
      rutaCorrecta = '/faseA/' + partida._id;
    }else if(partida.estadoActual == "FaseB"){
      rutaCorrecta = '/faseB/' + partida._id;
    }else if(partida.estadoActual == "FaseC"){
      rutaCorrecta = '/faseC/' + partida._id;
          }else if(partida.estadoActual == "FaseD"){
      rutaCorrecta = '/faseD/' + partida._id;
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
  },
    isFaseD: function(estadoActual){
    return estadoActual == "FaseD";
  },


  
}
