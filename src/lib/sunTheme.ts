// Mørkt tema mellom solnedgang og soloppgang, beregnet for Oslo.
// Kjøres som inline-skript i <head> før siden tegnes, så det ikke blinker.
// Ingen posisjon hentes fra besøkende (ingen tillatelse, ingen personopplysninger).
// Soltidene beregnes med samme formler som biblioteket SunCalc (V. Agafonkin).
export const sunThemeScript = `(function(){
var LAT=59.91,LNG=10.75,rad=Math.PI/180,day=864e5,J1970=2440588,J2000=2451545,e=rad*23.4397,J0=0.0009;
function times(date){
  var lw=rad*-LNG,phi=rad*LAT,d=date.valueOf()/day-0.5+J1970-J2000;
  var n=Math.round(d-J0-lw/(2*Math.PI));
  var ds=J0+lw/(2*Math.PI)+n;
  var M=rad*(357.5291+0.98560028*ds);
  var L=M+rad*(1.9148*Math.sin(M)+0.02*Math.sin(2*M)+0.0003*Math.sin(3*M))+rad*102.9372+Math.PI;
  var dec=Math.asin(Math.sin(e)*Math.sin(L));
  var Jnoon=J2000+ds+0.0053*Math.sin(M)-0.0069*Math.sin(2*L);
  var x=(Math.sin(-0.833*rad)-Math.sin(phi)*Math.sin(dec))/(Math.cos(phi)*Math.cos(dec));
  if(x>1)return{polar:"night"};
  if(x<-1)return{polar:"day"};
  var w=Math.acos(x),a=J0+(w+lw)/(2*Math.PI)+n;
  var Jset=J2000+a+0.0053*Math.sin(M)-0.0069*Math.sin(2*L),Jrise=Jnoon-(Jset-Jnoon);
  function toDate(j){return new Date((j+0.5-J1970)*day)}
  return{rise:toDate(Jrise),set:toDate(Jset)};
}
function apply(){
  var now=new Date(),t=times(now),dark;
  if(t.polar)dark=t.polar==="night";
  else dark=now<t.rise||now>=t.set;
  document.documentElement.setAttribute("data-theme",dark?"dark":"light");
}
apply();
setInterval(apply,60000);
})();`;
