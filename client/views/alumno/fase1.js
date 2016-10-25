

/////// Me entrega el total del gasto en la fase 1

function dineroInvertidoTotal(segment){
  //var costoAd =Partidas.findOne({'grupos.name':'satjeet'}).grupos.segmentos[segmento].dineroInvertido;
    //var nombrePartida= Session.get("nombredelapartida");
    //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
    //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
    //var usuario=arrayDelUsuario(nombrePartida);
    
    if(Meteor.user()){

      var segmento= Segmentos.findOne();
      var costoAd =segmento.segmentos[segment].dineroInvertido;
      var sizeSegmento=segmento.segmentos[segment].size;
      var totalSegmento=costoAd*sizeSegmento;
          return totalSegmento;
      }else return false;

}

function resumenDineroInvertidoTotal(){
    var inverSegmento=0;
    var digitos=5;
    
    for( i=0;i < digitos;i++){
      inverSegmento=inverSegmento+dineroInvertidoTotal(i);
    }
    //console.log(" el Resumen de la inversion : "+inverSegmento);
    return inverSegmento;

}

/*
function arrayDelUsuario(nomPartida){
  if(Meteor.user())
  {
  
    partida=Partidas.findOne({'npartida':nomPartida});
    
    var users=partida.usuarios;  
    var poli={};
    users.forEach(function(usuario){
      if(usuario.name==Meteor.user().username){
        poli=usuario;  
      }
    });
    return poli;

  }else{console.log(" falta un usuario");}



}

*/


function filtrosCanales(nseg){

    //lista de los canales que tienen el vector6[segmentos.highIncome]
      //  var nombrePartida= Session.get("nombredelapartida");
       // partida=Partidas.findOne({'npartida':nombrePartida});
       // var usuario=arrayDelUsuario(nombrePartida);
        //console.log("el usuario es " + usuario.name);
        //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
    
      if(Meteor.user()){
          //canales=Partidas.findOne({'grupos.name':'satjeet'}).canales;
          var canales=Canales.findOne().canal;
          
          var filtroCanal=[]
          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(nseg)]==1)  filtroCanal.push(canal);
          });
          //console.log(filtroCanal);
          return filtroCanal;
      }else return false; 

}





//Me entrega la fidelidad(awrens...loyal) para el segmentto(hincome.. adventures)
function fidelidadNumero(nsegmento){
//var nombrePartida= Session.get("nombredelapartida");
//partida=Partidas.findOne({'npartida':nombrePartida});

  //var usuario=arrayDelUsuario(nombrePartida);
  var segmento= Segmentos.findOne();
  return segmento.segmentos[nsegmento].fidelidad;

}





//this._someVariable = "some value"
//segmento2= Segmentos.findOne();


// sigo sin ocupar la instance 


Template['pantallaFase1'].onCreated(function() {
  // $('option').tooltip('show');
 
  this.firstTmplState = new ReactiveDict();
  this.firstTmplState.set( 'valorOpcionHighIncome',0);
  this.firstTmplState.set( 'valorOpcionInnovators',0);
  this.firstTmplState.set( 'valorOpcionFamilyFirst',0);
  this.firstTmplState.set( 'valorOpcionStatusSeekers',0);
  this.firstTmplState.set( 'valorOpcionAdventurers',0);


  // instance.autorun(function(){
  //   comprobarTimer(instance.data.idFaseA);
  // })
});
// tiene la id de la partida


Template.pantallaFase1.events({
    'click .enviarInversion': function(event, instance){
      
      idpartida=this.id;
      console.log("boton de dados");
      var userId =Meteor.userId();
      console.log("user id: " + userId);
      var grupo = Grupos.findOne({
                                 idPartida: idpartida,
                                 miembros: {
                                            $in: [userId]
                                           }
      });
   
      var dineroInicial =grupo.dineroInicial ;
      //console.log("mi dinero incial es :" + dineroInicial);
       var dineroRestante= dineroInicial - resumenDineroInvertidoTotal();

     var segment = Segmentos.findOne({ "idGrupo": grupo._id });
     console.log("e segmento que tengo es : ", segment);
      console.log("el dinero restante es : " +dineroRestante);
      if(dineroRestante<0){
         //event.target.disabled='true';
         //alert("tienen que ser postivo");

       }else{
         //event.target.disabled='false';
  //         alert("enviando info");
         Meteor.call('TerminoFase1',idpartida, function(error,resultado){
          if(error){
              alert('Error');
           }else{
              return Router.go('loading',{id: idpartida}); 
           }
         });


       }

       // Meteor.call('RollDices',idpartida,segment,grupo);
        //var resultadoJugador=Session.get("resultadoJugador");
        //Meteor.call('ActualizarResultado',idpartida,resultadoJugador,grupo);

    },
});


Template.pantallaFase1.helpers({


   advertenciaSinFondos() {
    if(Session.get("dineroRestante")<0){
      return "el dinero es negativo"
    }else return "";
  },

  "valueDineroInvertidoTotal": function(nsegmentos){
    var inverSegmento=0;
    var digitos=parseInt(nsegmentos)+1;
    
    for( i=0;i < digitos;i++){
      inverSegmento=inverSegmento+dineroInvertidoTotal(i);
    }
    
    resumenDineroInvertidoTotal();
    return inverSegmento;
      },
      "dineroInicial" : function(){
         // console.log("entra");
         
         //var nombrePartida= Session.get("nombredelapartida");
         //partida=Partidas.findOne({'npartida':nombrePartida});
         console.log("dinero de grupo " + Grupos.findOne().dineroInicial);
        if(Meteor.user()){
          //var usuario=arrayDelUsuario(nombrePartida);
          return Grupos.findOne().dineroInicial;
        }else return false
       
    
  },
    "dineroRestante": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      //console.log("mi dinero incial es :" + dineroInicial);
      var dineroResto=dineroInicial - resumenDineroInvertidoTotal();
      Session.set("dineroRestante",dineroResto);
          return dineroInicial - resumenDineroInvertidoTotal();

      }
      else{return false}
      
    },
 
    'fidelidadSegmentoActual': function(segment){// rescato la fidelidad
       //console.log("sera por aqui");
       // var nombrePartida= Session.get("nombredelapartida");
       //console.log("sera por aqui1");
        
        //var usuario=arrayDelUsuario(nombrePartida);
      // console.log("sera por aqui2");
        var segment=parseInt(segment);

        //Mejorable
        let segmento=Segmentos.findOne();
        var fidelidad=segmento.segmentos[segment].fidelidad ; // le sumare 1 para que me muestre la siguiente opcion
       // console.log("valor de la fidelidad: "+fidelidad);

       //console.log("sera por aqui3");

        if(fidelidad==0) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadDesconocido');}
        else if(fidelidad==1) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadConocido');}
        else if(fidelidad==2) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadConsiderando');}
        else if(fidelidad==3) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadProbando');}
        else if(fidelidad==4) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadRepertorio');}
        else if(fidelidad==5) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadRegular');}
        else if(fidelidad==6) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadLeal');}
        else {var seleccionado="la cague";}
        return seleccionado;
      },
      'fidelidadSegmentoFutura': function(segment){// rescato la fidelidad

        var segment=parseInt(segment);
        let segmento=Segmentos.findOne();
        if(segmento.segmentos[segment].eficienciaPicked!=0)
        {
        var fidelidad=segmento.segmentos[segment].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        }else {var fidelidad=segmento.segmentos[segment].fidelidad;}

        //console.log("valor de la fidelidad: "+fidelidad);

       //console.log("sera por aqui3");

        if(fidelidad==0) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadDesconocido');}
        else if(fidelidad==1) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadConocido');}
        else if(fidelidad==2) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadConsiderando');}
        else if(fidelidad==3) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadProbando');}
        else if(fidelidad==4) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadRepertorio');}
        else if(fidelidad==5) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadRegular');}
        else if(fidelidad==6) {var seleccionado=TAPi18n.__('DBcanales.TXTfidelidadLeal');}
        else {var seleccionado="la cague";}
        return seleccionado;
      },

      "valueDineroInvertido" : function(segment){


      console.log("en valor del dinero invertido pantalla0"+segment);

    //console.log(" el costo del valor es pantalla0: "+Template.instance().valor.get());
    switch(segment){
      case 0:
      console.log("el segmento fue 0");
        return  Template.instance().firstTmplState.get('valorOpcionHighIncome');
      case 1:
      console.log("el segmento fue 1");
        return  Template.instance().firstTmplState.get('valorOpcionInnovators');
      case 2:
      console.log("el segmento fue 2");
        return  Template.instance().firstTmplState.get('valorOpcionFamilyFirst');
      case 3:
        return  Template.instance().firstTmplState.get('valorOpcionStatusSeekers');
      case 4:
        return  Template.instance().firstTmplState.get('valorOpcionAdventurers');
      default:
      console.log("el segmento default");
        

    }
    //return  Template.instance().firstTmplState.get('valorOpcion');


   
    
  },


});


// dineroinvertido es un pesimo nombre, tengo que cambiarlo

/////////// Fase 1 : cambio High Income

Template.selectHighIncome.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  //this.templateDictionary.set( 'valorOpcion', false );

  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.firstTmplState = collectingTmplInstance.firstTmplState;
});


Template.selectHighIncome.helpers({

  // la info de los canales para mi select
  dropCanales:function() {
    console.log("veamos si llega aqui11111110");
      var res = [];//[{value:1, text:"test"}];


      var canales=Canales.findOne().canal;
          
          var filtroCanal=[]
          filtroCanal.push({value:0,text:"Inactive"});
          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(0)]==1){
              filtroCanal.push({value:canal.opcion,text:canal.nombreCanal});
            }  
        //res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});

          });
          //console.log(filtroCanal);
          console.log("veamos si llega aqui00");
     console.log("info que tengo en drop canales",filtroCanal);
      return {data:filtroCanal,config:{placeholder:TAPi18n.__("partida.SelectCanal")}};

  },
  dropPresets:function() {
      var res = [];//[{value:1, text:"test"}];

      // var partidas = Partidas.find({estadoActual: {$ne: "Finalizada"}}).fetch();

      // partidas.sort(function(a,b){
     //     return b.createdAt - a.createdAt;
     //   });

      // for(var np in partidas){
      //   var partida = partidas[np];
      //   var d = (partida.createdAt+'').split(' ');
      //   res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});
      // }

      return {data:res,config:{placeholder:TAPi18n.__("partida.presets")}};
  },

      'fidelidadSegmento': function(){// rescato la fidelidad
       //console.log("sera por aqui");
        //var nombrePartida= Session.get("nombredelapartida");
       //console.log("sera por aqui1");
        
        //var usuario=arrayDelUsuario(nombrePartida);
      // console.log("sera por aqui2");
        var segmento= Segmentos.findOne();
        var fidelidad=segmento.segmentos[0].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad High income: "+fidelidad);

        if(fidelidad==0) {var seleccionado="Unawereness";}
        else if(fidelidad==1) {var seleccionado="Awereness";}
        else if(fidelidad==2) {var seleccionado="Consideration";}
        else if(fidelidad==3) {var seleccionado="Trial";}
        else if(fidelidad==4) {var seleccionado="Repertoire";}
        else if(fidelidad==5) {var seleccionado="Regular";}
        else if(fidelidad==6) {var seleccionado="Loyal";}
        else {var seleccionado="la cague";}
        return seleccionado;
      },
        fidelidadSegmentoNumero: function(){// rescato la fidelidad //grupos.segmentos[0].fidelidad
        var fidelidad=Partidas.findOne({'grupos.name':'satjeet'}).grupos.segmentos[0].fidelidad;
      
        return fidelidad;
      },
      nombreCanal:function(){
        var nCanal= Partidas.findOne({'grupos.name':'satjeet'}).canales[fidelidadNumero(0)].nombre
        return nCanal;
      },
       eficienciaCanal:function(){
        return Partidas.findOne({'grupos.name':'satjeet'}).canales[fidelidadNumero(0)].eficiencia;
      },
      opcionCanal:function(){
        return Partidas.findOne({'grupos.name':'satjeet'}).canales[fidelidadNumero(0)].opcion;
      },
      opciones:function(){//lista de los canales que tienen el vector6[segmentos.highIncome]
        //var nombrePartida= Session.get("nombredelapartida");
        //var partida=Partidas.findOne({'npartida':nombrePartida});
        //console.log("morire aqui");

       //
        // var usuario=arrayDelUsuario(nombrePartida);

        // console.log("quizas aqui");
        //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
    if(Meteor.user()){
          //canales=Partidas.findOne({'grupos.name':'satjeet'}).canales;
          var canales=Canales.findOne().canal;
          
          var filtroCanal=[]
          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(0)]==1)  filtroCanal.push(canal);
          });
          //console.log(filtroCanal);
          return filtroCanal;
      }else return false;
      }, // entrego el valor de la inversion High Income al label de al lado
      "": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      var dineroRestante=dineroInicial - resumenDineroInvertidoTotal();
      //console.log("mi dinero incial es :" + dineroInicial);
          if(dineroRestante<0)
            {console.log("me esta dando negativo, has algo");
            var idGrupo=Grupos.findOne()._id;

            Meteor.call('inversionHighIncome',0,idGrupo,0);

              return true}
          else {
            console.log("me esta dando postivo, has algo");
            return(false);
          }
      }
      else{return false}
      
    },

  
      

      
   });



Template.selectHighIncome.events({
  'change select': function(event,template){
     event.preventDefault();
     var selectValue = event.target.value;
    
      var cHighIncome= $("#select0 option:selected").attr("canal");
      Session.set("canalHighIncome", cHighIncome);
      let eficienciaPicked=parseFloat($("#select0 option:selected").attr("eficiencia"));
      console.log("la eficiencia seleccionada : "+eficienciaPicked);
      console.log("id partida blabla : "+ this.id);
      idpartida=this.id;
      
      console.log("quiero saber que valor tengo :" + selectValue);
      var idGrupo=Grupos.findOne()._id;
       
     //if (selectValue>0){
        Meteor.call('inversionHighIncome',selectValue,idGrupo,eficienciaPicked);
     //}

  },
  'click #listCanalesHighIncome li': function(event,template) {
  //console.log(event)
  var valorOpcionHighIncome = event.target.dataset.val;
  console.log("que muestre el valor de mi opcion"+valorOpcionHighIncome);
  
  Template.instance().firstTmplState.set('valorOpcionHighIncome',valorOpcionHighIncome);
  //template.firstTmplState.set( 'valorOpcion', valorOpcion );
  //template.valor.set( valorOpcion );
 


  },

});


/////////// Fase 1 : cambio Innovators

Template.selectInnovators.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  //this.templateDictionary.set( 'valorOpcion', false );

  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.firstTmplState = collectingTmplInstance.firstTmplState;
});


Template.selectInnovators.events({
      'change select': function(event){
         event.preventDefault();
         var selectValue = event.target.value;
         /*
          console.log("segmento "+$("#select1 option:selected").attr("segmento")); 
          console.log("canal "+$("#select1 option:selected").attr("canal")); 
          console.log("eficiencia "+$("#select1 option:selected").attr("eficiencia")); 
          */
          let eficienciaPicked=parseFloat($("#select1 option:selected").attr("eficiencia"));
          console.log("la eficiencia seleccionada : "+eficienciaPicked);

          idpartida=this.id;
          
          console.log("quiero saber que valor tengo :" + selectValue);
          var idGrupo=Grupos.findOne()._id;

         //usuario.dineroInvertido=selectValue;
         Meteor.call('inversionInnovators',selectValue,idGrupo,eficienciaPicked);

      },

    'click #listCanalesInnovators li': function(event,template) {
    //console.log(event)
    var valorOpcionInnovators = event.target.dataset.val;
    console.log("que muestre el valor de mi opcion"+valorOpcionInnovators);
    
    Template.instance().firstTmplState.set('valorOpcionInnovators',valorOpcionInnovators);
  
  },

   });


Template.selectInnovators.helpers({
  dropCanales:function() {
    console.log("veamos si llega aqui11111110");
      var res = [];//[{value:1, text:"test"}];


      var canales=Canales.findOne().canal;
          
          var filtroCanal=[];
          filtroCanal.push({value:0,text:"Inactive"});

          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(1)]==1){
              filtroCanal.push({value:canal.opcion,text:canal.nombreCanal});
            }  
        //res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});

          });
          //console.log(filtroCanal);
          console.log("veamos si llega aqui00");
     console.log("info que tengo en drop canales",filtroCanal);
      return {data:filtroCanal,config:{placeholder:TAPi18n.__("partida.SelectCanal")}};


  },
      fidelidadSegmento:function(){// rescato la fidelidad
        //var nombrePartida= Session.get("nombredelapartida");
        //var usuario=arrayDelUsuario(nombrePartida);
        //var fidelidad=usuario.segmentos[0].fidelidad +1 ;

        //var fidelidad=Segmentos.segmentos[1].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad"+fidelidad);


        var segmento= Segmentos.findOne();
        var fidelidad=segmento.segmentos[1].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad High income: "+fidelidad);

        if(fidelidad==0) {var seleccionado="Unawereness";}
        else if(fidelidad==1) {var seleccionado="Awereness";}
        else if(fidelidad==2) {var seleccionado="Consideration";}
        else if(fidelidad==3) {var seleccionado="Trial";}
        else if(fidelidad==4) {var seleccionado="Repertoire";}
        else if(fidelidad==5) {var seleccionado="Regular";}
        else if(fidelidad==6) {var seleccionado="Loyal";}
        else {var seleccionado="Loyal";}
        return seleccionado;
      },
        fidelidadSegmentoNumero: function(){// rescato la fidelidad //grupos.segmentos[0].fidelidad
        var nombrePartida= Session.get("nombredelapartida");
        var usuario=arrayDelUsuario(nombrePartida);
        var fidelidad=usuario.segmentos[1].fidelidad;
      
        return fidelidad;
      },
      opciones:function(){
      
         return filtrosCanales(1);

      }, // entrego el valor de la inversion High Income al label de al lado
        "verdadDineroRestante": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      var dineroRestante=dineroInicial - resumenDineroInvertidoTotal();
      //console.log("mi dinero incial es :" + dineroInicial);
          if(dineroRestante<0)
            {console.log("me esta dando negativo, has algo");
            var idGrupo=Grupos.findOne()._id;

            Meteor.call('inversionInnovators',0,idGrupo,0);

              return true}
          else {
            console.log("me esta dando postivo, has algo");
            return(false);
          }
      }
      else{return false}
      
    },
    
     
      
   });


/////////// Fase 1 : cambio FamilyFirst


Template.selectFamilyFirst.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  //this.templateDictionary.set( 'valorOpcion', false );

  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.firstTmplState = collectingTmplInstance.firstTmplState;
});


Template.selectFamilyFirst.events({
  'change select': function(event){
     event.preventDefault();
     var selectValue = event.target.value;
     /*
      console.log("segmento "+$("#select2 option:selected").attr("segmento")); 
      console.log("canal "+$("#select2 option:selected").attr("canal")); 
      console.log("eficiencia "+$("#select2 option:selected").attr("eficiencia")); 
      */
      let eficienciaPicked=parseFloat($("#select2 option:selected").attr("eficiencia"));

      idpartida=this.id;
      
      console.log("quiero saber que valor tengo :" + selectValue);
      var idGrupo=Grupos.findOne()._id;

    // usuario.dineroInvertido=selectValue;
     Meteor.call('inversionFamilyFirst',selectValue,idGrupo,eficienciaPicked);
  },

  'click #listCanalesFamilyFirst li': function(event,template) {
    //console.log(event)
    var valorOpcionFamilyFirst = event.target.dataset.val;
    console.log("que muestre el valor de mi opcion"+valorOpcionFamilyFirst);
    
    Template.instance().firstTmplState.set('valorOpcionFamilyFirst',valorOpcionFamilyFirst);
    //template.firstTmplState.set( 'valorOpcion', valorOpcion );
    //template.valor.set( valorOpcion );
   


},

   });
Template.selectFamilyFirst.helpers({
  dropCanales:function() {
    console.log("veamos si llega aqui11111110");
      var res = [];//[{value:1, text:"test"}];


      var canales=Canales.findOne().canal;
          
          var filtroCanal=[];
          filtroCanal.push({value:0,text:"Inactive"});

          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(2)]==1){
              filtroCanal.push({value:canal.opcion,text:canal.nombreCanal});
            }  
        //res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});

          });
          //console.log(filtroCanal);
          console.log("veamos si llega aqui00");
     console.log("info que tengo en drop canales",filtroCanal);
      return {data:filtroCanal,config:{placeholder:TAPi18n.__("partida.SelectCanal")}};


  },
    
      fidelidadSegmento:function(){// rescato la fidelidad
        var nombrePartida= Session.get("nombredelapartida");
        //var usuario=arrayDelUsuario(nombrePartida);
        //var fidelidad=usuario.segmentos[0].fidelidad +1 ;

        //var fidelidad=Segmentos.segmentos[2].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("valor de la fidelidad"+fidelidad);

        var segmento= Segmentos.findOne();
        var fidelidad=segmento.segmentos[2].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad High income: "+fidelidad);


        if(fidelidad==0) {var seleccionado="Unawereness";}
        else if(fidelidad==1) {var seleccionado="Awereness";}
        else if(fidelidad==2) {var seleccionado="Consideration";}
        else if(fidelidad==3) {var seleccionado="Trial";}
        else if(fidelidad==4) {var seleccionado="Repertoire";}
        else if(fidelidad==5) {var seleccionado="Regular";}
        else if(fidelidad==6) {var seleccionado="Loyal";}
        else {var seleccionado="Loyal";}
        return seleccionado;
      },
      
        fidelidadSegmentoNumero: function(){// rescato la fidelidad //grupos.segmentos[0].fidelidad
        var fidelidad=Partidas.findOne({'grupos.name':'satjeet'}).grupos.segmentos[2].fidelidad;
        return fidelidad;
      },
      opciones:function(){
         return filtrosCanales(2);
      }, // entrego el valor de la inversion High Income al label de al lado
      "verdadDineroRestante": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      var dineroRestante=dineroInicial - resumenDineroInvertidoTotal();
      //console.log("mi dinero incial es :" + dineroInicial);
          if(dineroRestante<0)
            {console.log("me esta dando negativo, has algo");
            var idGrupo=Grupos.findOne()._id;

            Meteor.call('inversionFamilyFirst',0,idGrupo,0);

              return true}
          else {
            console.log("me esta dando postivo, has algo");
            return(false);
          }
      }
      else{return false}
      
    },

   });


////////// Fase 1 : cambio selectStatusSeekers

Template.selectStatusSeekers.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  //this.templateDictionary.set( 'valorOpcion', false );

  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.firstTmplState = collectingTmplInstance.firstTmplState;
});

Template.selectStatusSeekers.events({
      'change select': function(event){
         event.preventDefault();
         var selectValue = event.target.value;

         /*
          console.log("segmento "+$("#select3 option:selected").attr("segmento")); 
          console.log("canal "+$("#select3 option:selected").attr("canal")); 
          console.log("eficiencia "+$("#select3 option:selected").attr("eficiencia")); 
          */
          let eficienciaPicked3=parseFloat($("#select3 option:selected").attr("eficiencia"));
          
          idpartida=this.id;
          var idGrupo=Grupos.findOne()._id;
          Meteor.call('inversionStatusSeekers',selectValue,idGrupo,eficienciaPicked3);

        // usuario.dineroInvertido=selectValue;
      },
    'click #listCanalesStatusSeekers li': function(event,template) {
    //console.log(event)
    var valorOpcionStatusSeekers = event.target.dataset.val;
    console.log("que muestre el valor de mi opcion"+valorOpcionStatusSeekers);
    
    Template.instance().firstTmplState.set('valorOpcionStatusSeekers',valorOpcionStatusSeekers);
  
  },

   });
Template.selectStatusSeekers.helpers({
  dropCanales:function() {
    console.log("veamos si llega aqui11111110");
      var res = [];//[{value:1, text:"test"}];


      var canales=Canales.findOne().canal;
          
          var filtroCanal=[];
          filtroCanal.push({value:0,text:"Inactive"});

          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(3)]==1){
              filtroCanal.push({value:canal.opcion,text:canal.nombreCanal});
            }  
        //res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});

          });
          //console.log(filtroCanal);
          console.log("veamos si llega aqui00");
     console.log("info que tengo en drop canales",filtroCanal);
      return {data:filtroCanal,config:{placeholder:TAPi18n.__("partida.SelectCanal")}};
  },
      fidelidadSegmento:function(){// rescato la fidelidad
        var nombrePartida= Session.get("nombredelapartida");
        //var usuario=arrayDelUsuario(nombrePartida);
        //var fidelidad=usuario.segmentos[0].fidelidad +1 ;

        //var fidelidad=Segmentos.segmentos[3].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("valor de la fidelidad"+fidelidad);

        var segmento= Segmentos.findOne();
        var fidelidad=segmento.segmentos[3].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad High income: "+fidelidad);

        if(fidelidad==0) {var seleccionado="Unawereness";}
        else if(fidelidad==1) {var seleccionado="Awereness";}
        else if(fidelidad==2) {var seleccionado="Consideration";}
        else if(fidelidad==3) {var seleccionado="Trial";}
        else if(fidelidad==4) {var seleccionado="Repertoire";}
        else if(fidelidad==5) {var seleccionado="Regular";}
        else if(fidelidad==6) {var seleccionado="Loyal";}
        else {var seleccionado="Loyal";}
        return seleccionado;
      },
        fidelidadSegmentoNumero: function(){// rescato la fidelidad //grupos.segmentos[0].fidelidad
        var fidelidad=Partidas.findOne({'grupos.name':'satjeet'}).grupos.segmentos[3].fidelidad;
        return fidelidad;
      },
      opciones:function(){
         return filtrosCanales(3);
      }, 
      "verdadDineroRestante": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      var dineroRestante=dineroInicial - resumenDineroInvertidoTotal();
      //console.log("mi dinero incial es :" + dineroInicial);
          if(dineroRestante<0)
            {console.log("me esta dando negativo, has algo");
            var idGrupo=Grupos.findOne()._id;

            Meteor.call('inversionStatusSeekers',0,idGrupo,0);

              return true}
          else {
            console.log("me esta dando postivo, has algo");
            return(false);
          }
      }
      else{return false}
      
    },
   });

////////// Fase 1 : cambio selectAdventurers


Template.selectAdventurers.onCreated(function(){
  // Here, this equals the current template instance. We can assign
  // our ReactiveVar to it, making it accessible throughout the
  //this.templateDictionary.set( 'valorOpcion', false );

  var collectingTmplInstance = this.view.parentView.templateInstance();
  this.firstTmplState = collectingTmplInstance.firstTmplState;
});


Template.selectAdventurers.events({
      'change select': function(event){
         event.preventDefault();
         var selectValue = event.target.value;
         /*
          console.log("segmento "+$("#select4 option:selected").attr("segmento")); 
          console.log("canal "+$("#select4 option:selected").attr("canal")); 
          console.log("eficiencia "+$("#select4 option:selected").attr("eficiencia")); 
          */
          let eficienciaPicked4=parseFloat($("#select4 option:selected").attr("eficiencia"));

          idpartida=this.id;
          var idGrupo=Grupos.findOne()._id;
          Meteor.call('inversionAdventures',selectValue,idGrupo,eficienciaPicked4);

         //usuario.dineroInvertido=selectValue;
         //Meteor.call('inversionAdventures',selectValue,partida._id,usuario.name,eficienciaPicked);
      },
    'click #listCanalesAdventurers li': function(event,template) {
    //console.log(event)
    var valorOpcionAdventurers = event.target.dataset.val;
    console.log("que muestre el valor de mi opcion"+valorOpcionAdventurers);
    
    Template.instance().firstTmplState.set('valorOpcionAdventurers',valorOpcionAdventurers);
  
  },


   });
Template.selectAdventurers.helpers({
  dropCanales:function() {
    console.log("veamos si llega aqui11111110");
      var res = [];//[{value:1, text:"test"}];


      var canales=Canales.findOne().canal;
          
          var filtroCanal=[];
          filtroCanal.push({value:0,text:"Inactive"});

          canales.forEach(function(canal){
            //console.log(canal.nombre);
            if(canal.vector6[fidelidadNumero(4)]==1){
              filtroCanal.push({value:canal.opcion,text:canal.nombreCanal});
            }  
        //res.push({value:partida._id, text:partida.nombre+" ("+[d[0], d[2], d[1], d[3]].join(' ')+")"});

          });
          //console.log(filtroCanal);
          console.log("veamos si llega aqui00");
     console.log("info que tengo en drop canales",filtroCanal);
      return {data:filtroCanal,config:{placeholder:TAPi18n.__("partida.SelectCanal")}};
      //return {data:res,config:{placeholder:TAPi18n.__("partida.partidasAnteriores")}};

  },
      fidelidadSegmento:function(){// rescato la fidelidad
        var nombrePartida= Session.get("nombredelapartida");
        //var usuario=arrayDelUsuario(nombrePartida);
        //var fidelidad=usuario.segmentos[0].fidelidad +1 ;



        //var fidelidad=Segmentos.segmentos[4].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("valor de la fidelidad"+fidelidad);

         var segmento= Segmentos.findOne();
        var fidelidad=segmento.segmentos[4].fidelidad +1 ; // le sumare 1 para que me muestre la siguiente opcion
        //console.log("vvalor de la fidelidad High income: "+fidelidad);


        if(fidelidad==0) {var seleccionado="Unawereness";}
        else if(fidelidad==1) {var seleccionado="Awereness";}
        else if(fidelidad==2) {var seleccionado="Consideration";}
        else if(fidelidad==3) {var seleccionado="Trial";}
        else if(fidelidad==4) {var seleccionado="Repertoire";}
        else if(fidelidad==5) {var seleccionado="Regular";}
        else if(fidelidad==6) {var seleccionado="Loyal";}
        else {var seleccionado="Loyal";}
        return seleccionado;
      },
        fidelidadSegmentoNumero: function(){// rescato la fidelidad //grupos.segmentos[0].fidelidad
        var fidelidad=Partidas.findOne({'grupos.name':'satjeet'}).grupos.segmentos[4].fidelidad;
        return fidelidad;
      },
      opciones:function(){
         return filtrosCanales(4);
      }, 
      "verdadDineroRestante": function(){
      //var nombrePartida= Session.get("nombredelapartida");
      //var partida=Partidas.findOne({'npartida':nombrePartida}) || false;
      //var usuario=arrayDelUsuario(nombrePartida);

      //var ofi= Partidas.findOne({'grupos.name':'satjeet'}) || false;
      if(Meteor.user()){
      var grupo= Grupos.findOne();

      var dineroInicial =grupo.dineroInicial ;
      var dineroRestante=dineroInicial - resumenDineroInvertidoTotal();
      //console.log("mi dinero incial es :" + dineroInicial);
          if(dineroRestante<0)
            {
              //console.log("me esta dando negativo, has algo");
            var idGrupo=Grupos.findOne()._id;

            Meteor.call('inversionAdventures',0,idGrupo,0);

              return true}
          else {
            //console.log("me esta dando postivo, has algo");
            return(false);
          }
      }
      else{return false}
      
    },
   });


Template.cashfase.helpers({
  "valueDineroInvertidoTotal": function(nsegmentos){
    var inverSegmento=0;
    var digitos=parseInt(nsegmentos)+1;
    
    for( i=0;i < digitos;i++){
      inverSegmento=inverSegmento+dineroInvertidoTotal(i);
    }
    
    resumenDineroInvertidoTotal();
    return inverSegmento;
      },
      "dineroInicial" : function(){
         // console.log("entra");
         
         //var nombrePartida= Session.get("nombredelapartida");
         //partida=Partidas.findOne({'npartida':nombrePartida});
         console.log("dinero de grupo " + Segmentos.findOne().dineroInicial);
        if(Meteor.user()){
          //var usuario=arrayDelUsuario(nombrePartida);
          return Segmentos.findOne().dineroInicial;
        }else return false
        

      
    },
});
