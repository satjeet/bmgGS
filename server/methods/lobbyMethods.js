//Deberiamos hacer otra forma para identificar el grupo sin grupo!
//Anteriormente existio una variable tipoDeGrupo o similar
var nombreGrupoSinGrupos = "Sin Grupo";
Meteor.methods({
  guardarPuntaje: function(_params) {
    check(_params, {
      idRespuesta: String,
      puntaje: Number
    })
  },
  //Ingresa un usuario (por id) a una partida en un grupo. Si el usuario
  //ya estaba en la partida pero en otro grupo, se cambia.
  //_joinParams =
  //{idUser: String,
  //idPartida: String,
  //nombre: String}
  userJoinGroup: function(_joinParams) {
    check(_joinParams, {
      idUser: String,
      idPartida: String,
      nombre: String
    });
    if (Meteor.user != null) {
      salirDeGrupoActual({
        idPartida: _joinParams.idPartida,
        idUser: _joinParams.idUser
      });

      Grupos.update({
        idPartida: _joinParams.idPartida,
        nombre: _joinParams.nombre
      }, {
        $addToSet: {
          miembros: _joinParams.idUser
        }
      })
    } else {
      throw new Meteor.Error(500, "Su session ha caducado");
    }
  },
  borrarGrupo: function(_params) {
    check(_params, {
      idPartida: String,
      nombreGrupo: String
    })
    var grupo = Grupos.findOne({
      idPartida: _params.idPartida,
      nombre: _params.nombreGrupo
    });
    //Traspasar a los miembros a los sin grupo
    if (grupo.miembros.length > 0) {
      Grupos.update({
        idPartida: _params.idPartida,
        nombre: nombreGrupoSinGrupos
      }, {
        $addToSet: {
          miembros: {
            $each: grupo.miembros
          }
        }
      });
    }
    //Borrar el grupo
    Grupos.remove({
      _id: grupo._id
    });
  },
  newPartida: function(_partidaParams) {
    check(_partidaParams, {
      idProfesor: String,
      nombrePartida: String,
      duracion: Number
    });

    if (_partidaParams.duracion == -1 ) {
      throw new Meteor.Error(500, "Al menos una fase es requerida para comenzar!");
    }

    if (Meteor.user != null) {
      //Se crea la partida
      var partida = {
        nombre: _partidaParams.nombrePartida,
        idProfesor: _partidaParams.idProfesor,
        withProfesor: true,
        createdAt: new Date(),
        estadoActual: "Lobby",
        isGroupsLocked: false,
        idJuego: Juegos.findOne({
          nombre: "TSJ"
        })._id,
        //idEscenario: _partidaParams.idEscenario,
        /*Podria guardarse la id de la encuesta
        idEncuesta: _partidaParams.idEncuesta*/
      };
      var idPartida = Partidas.insert(partida);
      //Se crea el grupo sin grupos
      var grupoSinGrupos = {
        idPartida: idPartida,
        nombre: nombreGrupoSinGrupos,
        miembros: []
      };
      Grupos.insert(grupoSinGrupos);

      //Se crean las fases pertinentes
      // var escenario = Escenarios.findOne({
      //   _id: _partidaParams.idEscenario
      // });
      // if (_partidaParams.duracionFaseA != -1) {
      //   //Crea la Fase A
      //   faseA = {};
      //   faseA.duracion = _partidaParams.duracionFaseA;
      //   faseA.idConfigFaseA = escenario.idConfigFaseA;
      //   faseA.idPartida = idPartida;
      //   FasesA.insert(faseA);
      // }
      // if (_partidaParams.duracionFaseB != -1) {
      //   //Crea la Fase B
      //   faseB = {};
      //   faseB.duracion = _partidaParams.duracionFaseB;
      //   faseB.idConfigFaseB = escenario.idConfigFaseB;
      //   faseB.idPartida = idPartida;
      //   FasesB.insert(faseB);
      // }
      // if (_partidaParams.duracionFaseC != -1) {
      //   console.log("creando la faseC")
      //   //Crea la Fase C
      //   faseC = {};
      //   faseC.duracion = _partidaParams.duracionFaseC;
      //   faseC.periodo = 0;
      //   faseC.cantPeriodos = _partidaParams.cantidadPeriodos;
      //   console.log(escenario)
      //   faseC.idConfigFaseC = escenario.idConfigFaseC;
      //   faseC.idPartida = idPartida;
      //   faseC.lastStepTime = new Date();
        
      //   var fechaInicio = new Date();
      //   var fechaFin = new Date();
      //   fechaFin.setMinutes(fechaInicio.getMinutes() + faseC.duracion);
      //   faseC.periodos = [{
      //     numero: 0,
      //     fechaInicio: fechaInicio,
      //     fechaFin: fechaFin
      //   }];
      //   FasesC.insert(faseC);
      // }
      return idPartida;
    } else {
      throw new Meteor.Error(500, "Su session ha caducado");
    }
  },
  joinPartida: function(_params) {
    check(_params, {
      idUser: String,
      idPartida: String
    });
    var partida = Partidas.findOne({_id:{$regex:'^'+_params.idPartida}})
    if (partida == null) {
      throw new Meteor.Error(500, "El codigo ingresado no existe");
    }


    //first find if is in group
    
    var exist = Grupos.findOne({
      idPartida: partida._id,
      miembros: { $in: [_params.idUser]}
    })||false;

    if(exist==false){
      return Grupos.update({
        idPartida: partida._id,
        nombre: nombreGrupoSinGrupos
      }, {
        $addToSet: {
          miembros: _params.idUser
        }
      });
    }else{
      return exist;
    }
  },
  iniciarPartida: function(_params) {
    check(_params, {
      idPartida: String,
      idGrupos: [String]
    });
    //Borra los grupos vacios, desactivado para pruebas rapidas,
    //Grupos.remove({idPartida: _params.idPartida, miembros: []})

    //Crea la respuesta A
    var faseA = FasesA.findOne({
      idPartida: _params.idPartida
    });
    if (faseA) {
      if (faseA != null) {
        var respuestaFaseA = inicializaRespuestaFaseA(faseA._id)
        respuestaFaseA.puntaje = -1;
      }
    }

    //Crea la respuesta B
    var faseB = FasesB.findOne({
      idPartida: _params.idPartida
    });
    if (faseB) {
      var respuestaFaseB = {};
      respuestaFaseB.idFaseB = faseB._id;
      respuestaFaseB.puntaje = -1;
      respuestaFaseB.objetivos = [];
      var objetivos = ConfigsFaseB.findOne({
        _id: faseB.idConfigFaseB
      }).objetivos;
      for (var o in objetivos) {
        respuestaFaseB.objetivos.push(/*objetivos[o] = */{
          idObjetivo: objetivos[o].idObjetivo,
          indicadores: [],
          id: objetivos[o].idObjetivo
        });
      }
    }

    //Crea la respuesta C
    var faseC = FasesC.findOne({
      idPartida: _params.idPartida
    });
    if (faseC != null) {
      var respuestaFaseC = {};
      respuestaFaseC.idFaseC = faseC._id;
      respuestaFaseC.periodos = [];
      for(var i = 0;i<faseC.cantPeriodos;i++){
        respuestaFaseC.periodos.push({idIniciativas: []});
      }

    }

    //Inserta todas las respuestas de cada fase
    //y la respuesta BSC para cada grupo
    for (var g in _params.idGrupos) {
      var respuestaBSC = {};
      respuestaBSC.idGrupo = _params.idGrupos[g];
      //Asigna las respuestas
      if (faseA != null) {
        respuestaBSC.idRespuestaFaseA = RespuestasFaseA.insert(respuestaFaseA);
      }
      if (faseB != null) {
        console.log("insert respuestaFaseB g"+g)
        console.log(respuestaFaseB)
        respuestaBSC.idRespuestaFaseB = RespuestasFaseB.insert(respuestaFaseB);
        console.log(respuestaBSC.idRespuestaFaseB)
      }
      if (faseC != null) {
        respuestaBSC.idRespuestaFaseC = RespuestasFaseC.insert(respuestaFaseC);
      }
      RespuestasBSC.insert(respuestaBSC);
    }
    nextFase(_params.idPartida);
    return '/lobby/' + _params.idPartida;
  },
  terminarJuego: function(_idPartida) {
    check(_idPartida, String);
    Partidas.update({
      _id: _idPartida
    }, {
      $set: {
        estadoActual: "Finalizada"
      }
    });
  },
  siguienteFase: function(_idPartida) {
    check(_idPartida, String);
    nextFase(_idPartida);
  },
  newGroup: function(_newGroupParams) {
    check(_newGroupParams, {
      idPartida: String,
      nombre: String,
      idUser: String
    });
    if (Grupos.findOne({
        idPartida: _newGroupParams.idPartida,
        nombre: _newGroupParams.nombre
      }) != null) {
      throw new Meteor.Error(500, "El nombre del grupo no puede repetirse");
    }
    salirDeGrupoActual({
      idPartida: _newGroupParams.idPartida,
      idUser: _newGroupParams.idUser
    });

    //Optimizar!
    var miembros = [];
    miembros.push(_newGroupParams.idUser);

    var nuevoGrupo = {
      idPartida: _newGroupParams.idPartida,
      nombre: _newGroupParams.nombre,
      miembros: miembros
    }
    Grupos.insert(nuevoGrupo);
  },
  setGroupLock: function(_params) {
    check(_params, {
      idPartida: String,
      isGroupsLocked: Boolean
    });
    Partidas.update(_params.idPartida, {
      $set: {
        isGroupsLocked: _params.isGroupsLocked
      }
    });
  },
  forzarGrupos: function(_params) {
    check(_params, {
      idPartida: String
    });

    var grupoSinGrupos = Grupos.findOne({
      idPartida: _params.idPartida,
      nombre: nombreGrupoSinGrupos
    });
    //Traspasar a los miembros a los sin grupo
    if (grupoSinGrupos.miembros.length > 0) {
      var gruposPosibles = Grupos.find({
        idPartida: _params.idPartida,
        nombre: {
          $ne: nombreGrupoSinGrupos
        }
      });
      if (gruposPosibles.count() == 0) {
        throw new Meteor.Error(500, "Debe haber al menos un grupo para forzar grupos");
      }
      var rezagados = grupoSinGrupos.miembros;

      var minIntegrantes = -1;
      var idGrupoMinIntengrantes;
      while (rezagados.length > 0) {
        gruposPosibles.forEach(function(grupo) {
          if (grupo.miembros.length < minIntegrantes || minIntegrantes == -1) {
            idGrupoMinIntengrantes = grupo._id;
          }
        })
        Grupos.update({
          _id: idGrupoMinIntengrantes
        }, {
          $addToSet: {
            miembros: rezagados[0]
          }
        });
        rezagados.shift();
      }
      Grupos.update({
        idPartida: _params.idPartida,
        nombre: nombreGrupoSinGrupos
      }, {
        $addToSet: {
          miembros: {
            $each: grupoSinGrupos.miembros
          }
        }
      });
    }

    Grupos.update({
      _id: grupoSinGrupos._id
    }, {
      $set: {
        miembros: []
      }
    });
  },
  quitarAlumnoGrupo: function(_params) {
    check(_params, {
      idUser: String,
      idPartida: String
    });
    if (Meteor.user != null) {
      salirDeGrupoActual(_params);

      Grupos.update({
        idPartida: _params.idPartida,
        nombre: nombreGrupoSinGrupos
      }, {
        $addToSet: {
          miembros: _params.idUser
        }
      })
    } else {
      throw new Meteor.Error(500, "Su session ha caducado");
    }
  }
});

//Remueve al usuario del grupo actual
//_groupParams debe contener idUser y idPartida
function salirDeGrupoActual(_groupParams) {
  var grupo = Grupos.findOne({
    idPartida: _groupParams.idPartida,
    miembros: {
      $elemMatch: {
        $eq: _groupParams.idUser
      }
    }
  });
  if (grupo != null) {
    var indice = grupo.miembros.indexOf(_groupParams.idUser);
    grupo.miembros.splice(indice, 1);
    Grupos.update({
      idPartida: _groupParams.idPartida,
      nombre: grupo.nombre
    }, {
      $set: {
        miembros: grupo.miembros
      }
    });
  }
}

function inicializaRespuestaFaseA(idFaseA) {
  var faseA = FasesA.findOne({
    _id: idFaseA
  });
  var config = ConfigsFaseA.findOne({
    _id: faseA.idConfigFaseA
  });
  var objetivosFaseA = ObjetivosFaseA.find({
    idConfigFaseA: config._id
  }).fetch();
  var respuestaFaseA = {};
  respuestaFaseA.objetivos = [];
  respuestaFaseA.idFaseA = faseA._id;
  for (var o in objetivosFaseA) {
    var objetivo = {};
    objetivo.idObjetivo = objetivosFaseA[o]._id;
    objetivo.consecuencias = [];
    objetivo.lineamiento = '';
    respuestaFaseA.objetivos.push(objetivo);
  }
  return respuestaFaseA;
}

function nextFase(_idPartida) {
  check(_idPartida, String);
  var partida = Partidas.findOne({
    _id: _idPartida
  });
  var nuevoEstado = "";
  var fases = {};
  fases.Lobby = {};
  fases.FaseA = FasesA.findOne({
    idPartida: _idPartida
  });
  fases.FaseB = FasesB.findOne({
    idPartida: _idPartida
  });
  fases.FaseC = FasesC.findOne({
    idPartida: _idPartida
  });
  // fases.final = {};
  var estado = partida.estadoActual;
  var faseNameAnterior = '';
  lbl_fases: {
    for (var faseName in fases) {
      if(fases[faseName]){
        if(faseNameAnterior == partida.estadoActual){
          nuevoEstado = faseName;
          break lbl_fases;
        }
        faseNameAnterior = faseName;
      }
    }
  }
  // console.log('lobbymethods.nextFase: nuevoEstado' + nuevoEstado);
  Partidas.update({
    _id: _idPartida
  }, {
    $set: {
      estadoActual: nuevoEstado
    }
  });
}
