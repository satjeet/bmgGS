Meteor.GL = Meteor.GL || {};
Meteor.GL.QueryObjects = Meteor.GL.QueryObjects || {};
Meteor.GL.QueryObjects.Aux = {
  executeGet:function(param, collection){
    if(param){
      if(Array.isArray(param)){
        return collection.find({
          _id:{
            $in:param
          }
        });
      }else{
        return collection.find({
          _id:param
        });
      }
    }else{
      return collection.find();
    }
  },
  executeUserRoleGet:function(param, userRole){
    if (param) {
      if (Array.isArray(param)) {
        return Roles.getUsersInRole(userRole, null, {
          _id: {
            $in: param
          }
        });
      } else {
        return Roles.getUsersInRole(userRole, null, {
          _id: param
        });
      }
    } else {
      return Roles.getUsersInRole(userRole);
    }
  }
}
