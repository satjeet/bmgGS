Meteor.GL = Meteor.GL || {};
Meteor.GL.Buscador = Meteor.GL.Buscador || {};
Meteor.GL.Buscador.Methods = {
	getUserId: function(_userId){
		if (Meteor.isServer) {
		  	return _userId;
		}else{
		  	return Meteor.userId();
		}
	},
	existe: function(_objeto){
		return _objeto != null && _objeto.fetch().length > 0;
	}
}