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
        

      };
      var idPartida = Partidas.insert(partida);
      //Se crea el grupo sin grupos
      var grupoSinGrupos = {
        idPartida: idPartida,
        nombre: nombreGrupoSinGrupos,
        miembros: []
      };
      Grupos.insert(grupoSinGrupos);

// ingresar el id de partidas a PartidaData
      var asd = PartidaData.insert({
        idPartida:idPartida,
        duracion:10,
        turno:1,
      });

      var fechaInicio = new Date();
      var fechaFin = new Date();


      PartidaData.update({
        idPartida: idPartida
      }, {
         $set: {
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
          
        }
      })

 
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
    console.log("paso el checkd e inicio partida, osea tengo los params");
    //Crea la respuesta A
    var fase0 = Fases0.findOne({
      idPartida: _params.idPartida
    });
    console.log(" un cambio")
  
    nextFase(_params.idPartida);
    console.log(" nexfase cambio")

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
   'CrearCanales': function(idPartida){
        //var currentUserId = Meteor.user._id;     Meteor.userId()
        if(this.userId){
          //Vector6:{1,1,1,0,0,0}
          var canal = [];
          canal=[
                  {nombreCanal:"TV ad",opcion:1,costo:3,eficiencia:0.8,vector6:[1,1,1,0,0,0]},
                  {nombreCanal:"Magazine ad",opcion:2,costo:2,eficiencia:0.7,vector6:[1,1,1,0,0,0]},
                  {nombreCanal:"POS ad",opcion:3,costo:2,eficiencia:0.6,vector6:[0,1,1,1,1,0]},
                  {nombreCanal:"Event",opcion:4,costo:4,eficiencia:0.8,vector6:[0,1,1,1,1,0]},
                  {nombreCanal:"Discount",opcion:5,costo:1,eficiencia:0.5,vector6:[0,0,1,1,1,0]},
                  {nombreCanal:"Sampling",opcion:6,costo:3,eficiencia:0.6,vector6:[0,0,1,1,1,0]},
                  {nombreCanal:"Collectables",opcion:7,costo:3,eficiencia:0.7,vector6:[0,0,0,1,1,0]},
                  {nombreCanal:"Special series",opcion:8,costo:2,eficiencia:0.6,vector6:[0,0,0,0,1,1]},
                  {nombreCanal:"CRM",opcion:9,costo:3,eficiencia:0.7,vector6:[0,0,0,0,1,1]},
                            
            ];
            var idPartida= idPartida;
            console.log("blabla");
            //var respuesta=Canales.insert({idPartida:idPartida,canal:canal});
           // console.log("respuesta : "+respuesta);

            if(Canales.findOne({
                                 'idPartida': idPartida, })!= undefined) 
            {
              }else{
                //el canal aun no exite, asi que lo creo
            var respuesta=Canales.insert({idPartida:idPartida,canal:canal});
            console.log("respuesta : "+respuesta);
                
            }





        }else console.log("no hay un user activo");

  },
   'CrearSegmentos': function(idPartida,userId){
        //idGrupo

        //let idGrupo=Grupos.findOne(idPartida:idPartida,);
          let idGrupo="";
         idGrupo = Grupos.findOne({
                                 idPartida: idPartida,
                                 miembros: {
                                            $in: [userId]
                                           }
          })._id;
        // idGrupo ="algo"
         console.log("la ide del grupo es"+idGrupo);
        //var currentUserId = Meteor.user._id;     Meteor.userId()
        console.log("aqui va bien en crear segments");
        if(this.userId){
          //Vector6:{1,1,1,0,0,0}
          var segmentos=[];
          segmentos=[
            {nombreSegmento:"highIncome",opcion:1,marketShare:1,canalPicked:"",eficienciaPicked:0,fidelidad:0,dineroInvertido:0,size:40,margin:20,value:800},
            {nombreSegmento:"innovators",opcion:2,marketShare:1,canalPicked:"",eficienciaPicked:0,fidelidad:0,dineroInvertido:0,size:20,margin:16,value:320},
            {nombreSegmento:"familyFirst",opcion:3,marketShare:1,canalPicked:"",eficienciaPicked:0,fidelidad:0,dineroInvertido:0,size:100,margin:8,value:800},
            {nombreSegmento:"statusSeekers",opcion:4,marketShare:1,canalPicked:"",eficienciaPicked:0,fidelidad:0,dineroInvertido:0,size:20,margin:32,value:640},
            {nombreSegmento:"adventurers",opcion:5,marketShare:1,canalPicked:"",eficienciaPicked:0,fidelidad:0,dineroInvertido:0,size:40,margin:16,value:640},
            ];

            //var idGrupo= idGrupo;
            console.log("blabla Segmentos");
            if(Segmentos.findOne({
                                 'idPartida': idPartida,
                                 'idGrupo': idGrupo          })!= undefined) 
            {
              console.log("encontre el segmento al que pertenesco")}else{
                //el segmento aun no exite, asi que lo creo
            var respuesta=Segmentos.insert({'idPartida':idPartida,'idGrupo':idGrupo,
              'dineroInicial':250,'dineroInvertido':0,'ganancias':0,'resultado':0,
              'segmentos':segmentos});
            console.log("respuesta id del segmento : "+respuesta);

              }

           // var respuesta=Segmentos.insert({idGrupo:idGrupo,segmentos:segmentos});





        }else console.log("no hay un user activo");
/*
  },
  'CrearResultados': function(idPartida,userId){
        //idGrupo

        //let idGrupo=Grupos.findOne(idPartida:idPartida,);
          let idGrupo="";
         idGrupo = Grupos.findOne({
                                 idPartida: idPartida,
                                 miembros: {
                                            $in: [userId]
                                           }
          })._id;
        // idGrupo ="algo"
         console.log("la ide del grupo es"+idGrupo);
        //var currentUserId = Meteor.user._id;     Meteor.userId()
        console.log("aqui va bien en crear segments");
        if(this.userId){
          //Vector6:{1,1,1,0,0,0}
          
            //var idGrupo= idGrupo;
            console.log("blabla Segmentos");
            if(Resultados.findOne({
                                 'idPartida': idPartida,
                                 'idGrupo': idGrupo          })!= undefined) 
            {
              console.log("encontre el resultado al que pertenesco")}else{
                //el segmento aun no exite, asi que lo creo
            var respuesta=Segmentos.insert({'idPartida':idPartida,'idGrupo':idGrupo,'segmentos':segmentos});
            console.log("respuesta id del segmento : "+respuesta);

              }

           // var respuesta=Segmentos.insert({idGrupo:idGrupo,segmentos:segmentos});





        }else console.log("no hay un user activo");
*/
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
  console.log("NEXT FASE", _idPartida)
  var nuevoEstado = "";
  var fases = {};
  fases.Lobby = {};
  fases.FaseA = {};
  fases.FaseB = {};
  fases.FaseC = {};
/*fases.Fase0 = Fases0.findOne({
    idPartida: _idPartida
  });
  */
 
  console.log("llega aqui");
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
  console.log("que tiene partida",partida);

  console.log("llega aca",fases);

  Partidas.update({
    _id: _idPartida
  }, {
    $set: {
      estadoActual: nuevoEstado
    }
  });
}
