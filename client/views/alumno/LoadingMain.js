
Template['LoadingMain'].onRendered(function() {
  var instance = this;
  console.log("informacion de THIS fase0");
  console.log("informacion de THIS fase0", this.data);
  console.log("el Id de este usuario es fase0, loadingMain: "+ Meteor.userId());
  
 Meteor.call('CrearSegmentos',this.data._id,Meteor.userId());
});


Template.LoadingMain.helpers({



});