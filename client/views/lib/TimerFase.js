Meteor.GL = Meteor.GL || {};
Meteor.GL.TimerFase = {
  getInstance: function() {
    var self = this;
    var timerFase = {};
    self.initMethods(timerFase);
    return timerFase;
  },
  initMethods: function(timerFase) {
    timerFase.setMaxDate = function(maxDate) {
      this._maxDate = maxDate;
      this._initiated = true;
    }
    timerFase.getMaxDate = function() {
      return this._maxDate;
    }
    timerFase.isTimerOver = function() {
      if(this._initiated){
        return this._diferenciaEnMili() <= 0;
      }else{
        return false
      }
    }
    timerFase.getTiempoRestante = function() {
      var mili = this._diferenciaEnMili();
      if (mili <= 0) {
        return this._miliToMinutesSeconds(0);
      }
      var tiempo = this._miliToMinutesSeconds(mili);
      return tiempo;
    }
    timerFase.getMiliRestante = function() {
      var mili = this._diferenciaEnMili();
      if (mili <= 0) {
        return 0;
      }
      return mili;
    }
    timerFase._horaServer = function() {
      return new Date(TimeSync.serverTime());
    }

    timerFase._diferenciaEnMili = function() {
      var diff = this._maxDate - this._horaServer();
      return diff;
    }
    timerFase._miliToMinutesSeconds = function(mili) {
      var seconds = Math.ceil(mili / 1000);
      var minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      var secondsString = '';
      if (Math.abs(seconds) < 10) {
        secondsString += '0';
      }
      secondsString += seconds;
      return minutes + ':' + secondsString;
    }
    timerFase._initiated = false;
  }
}
