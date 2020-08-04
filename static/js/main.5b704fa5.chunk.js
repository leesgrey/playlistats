(this.webpackJsonpmusichar=this.webpackJsonpmusichar||[]).push([[0],{175:function(t,e,a){},176:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),r=a(53),o=a.n(r),i=(a(60),a(5)),l=a(6),c=a(2),u=a(8),h=a(7),p=a(18),m=a.n(p);function d(t){var e,a,s=0,n=0,r=0,o=-1,i=101;t.track_features.audio_features.forEach((function(t){t.mode?s++:n++})),t.track_objects.items.forEach((function(t){o<t.track.popularity&&(o=t.track.popularity,e=t.track.name),i>t.track.popularity&&(i=t.track.popularity,a=t.track.name),r+=t.track.popularity}));var l={major:s,minor:n,avgPopularity:Math.floor(r/t.track_features.audio_features.length),mostPopular:e,leastPopular:a};return console.log(l),l}var f=a(54),k=function(t){Object(u.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={labels:["major","minor"],datasets:[{data:[s.props.major,s.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]},s.getState=s.getState.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:["major","minor"],datasets:[{data:[this.props.major,this.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]}}},{key:"componentDidUpdate",value:function(t){this.props!==t&&(console.log("updating graph"),console.log(this.props),this.setState(this.getState()))}},{key:"render",value:function(){return n.a.createElement(f.Doughnut,{data:this.state,key:this.props.minor})}}]),a}(s.Component),y=function(t){Object(u.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={track_objects:[],track_features:[],stats:null},s.storeTrackObjects=s.storeTrackObjects.bind(Object(c.a)(s)),s.storeTrackFeatures=s.storeTrackFeatures.bind(Object(c.a)(s)),s.storeStats=s.storeStats.bind(Object(c.a)(s)),s.getModeString=s.getModeString.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(t){var e,a,s;this.props.bleh!==t.bleh&&(e=this.props.token,a=this.props.bleh,s=this.storeTrackObjects,m.a.get("https://api.spotify.com/v1/playlists/"+a+"/tracks",{headers:{Authorization:"Bearer "+e}}).then((function(t){s(t.data)})).catch((function(t){console.error(t)})))}},{key:"storeTrackObjects",value:function(t){this.setState({track_objects:t}),function(t,e,a){var s=function(t){var e="";return t.items.forEach((function(t){e+=t.track.id+","})),e}(e);m.a.get("https://api.spotify.com/v1/audio-features",{headers:{Authorization:"Bearer "+t},params:{ids:s}}).then((function(t){a(t.data)})).catch((function(t){console.error(t)}))}(this.props.token,this.state.track_objects,this.storeTrackFeatures)}},{key:"storeTrackFeatures",value:function(t){this.setState({track_features:t}),this.storeStats()}},{key:"storeStats",value:function(){this.setState({stats:d(this.state)})}},{key:"getModeString",value:function(){var t="This playlist is ";return this.state.stats.major==this.state.stats.minor?t+="equally major and minor ":this.state.stats.major>this.state.stats.minor?t+="mostly major ":t+="mostly minor ",t}},{key:"render",value:function(){return n.a.createElement("div",{id:"statsOutput"},!this.state.stats&&n.a.createElement("h3",null,"select a playlist to begin"),this.state.stats&&n.a.createElement("div",{id:"infoContainer"},n.a.createElement("h3",null,this.props.bleh),n.a.createElement("p",null,this.getModeString()," with ",this.state.stats.major," major song",1!=this.state.stats.major&&"s"," and ",this.state.track_objects.items.length-this.state.stats.major," minor song",this.state.track_objects.items.length-this.state.stats.major!=1&&"s","."),n.a.createElement(k,{id:this.props.bleh,major:this.state.stats.major,minor:this.state.stats.minor}),n.a.createElement("p",null,"This playlist has an average popularity of ",this.state.stats.avgPopularity,', with the most popular song being "',this.state.stats.mostPopular,'" and the least popular song being "',this.state.stats.leastPopular,'".'),n.a.createElement("p",null,"This playlist has an average valence of x with a variance of x."),n.a.createElement("p",null,"This playlist features x artists.")))}}]),a}(s.Component),b=function(t){Object(u.a)(a,t);var e=Object(h.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={selected:null,token:s.props.token,no_data:!1},s.handleClick=s.handleClick.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"handleClick",value:function(t){this.setState({selected:t}),console.log(t)}},{key:"render",value:function(){var t=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"sidebar"},n.a.createElement("ul",null,Array.from(this.props.playlists).map((function(e){return n.a.createElement("li",{onClick:function(){return t.handleClick(e.id)},className:"playlist_item",key:e.id},e.name)})))),n.a.createElement(y,{token:this.state.token,bleh:this.state.selected}))}}]),a}(s.Component),v=window.location.hash.substring(1).split("&").reduce((function(t,e){if(e){var a=e.split("=");t[a[0]]=decodeURIComponent(a[1])}return t}),{});window.location.hash="";var g=v,j=(a(175),["ugc-image-upload","user-read-recently-played","playlist-read-collaborative","playlist-modify-private","playlist-modify-public","playlist-read-private"]),E=function(t){Object(u.a)(a,t);var e=Object(h.a)(a);function a(){var t;return Object(i.a)(this,a),(t=e.call(this)).state={token:null,playlists:[],no_data:!1},t.setPlaylists=t.setPlaylists.bind(Object(c.a)(t)),t}return Object(l.a)(a,[{key:"setPlaylists",value:function(t){this.setState({playlists:t})}},{key:"componentDidMount",value:function(){var t,e,a=g.access_token;a&&(this.setState({token:a}),t=a,e=this.setPlaylists,m.a.get("https://api.spotify.com/v1/me/playlists?limit=30",{headers:{Authorization:"Bearer "+t}}).then((function(t){e(t.data.items)})).catch((function(t){console.error(t)})))}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},!this.state.token&&n.a.createElement("div",{id:"landing"},n.a.createElement("h1",null,"petalist"),n.a.createElement("p",null,"generate spotify playlist statistics and a bouquet to take with you"),n.a.createElement("a",{className:"btn btn--loginApp-link",href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("308136625304484d92879d69e98ccd89","&redirect_uri=").concat("http://leesgrey.github.io/musichar","&scope=").concat(j.join("%20"),"&response_type=token&show_dialog=true")},"log into spotify")),this.state.token&&n.a.createElement("div",{id:"loginDisplay"},n.a.createElement("div",{id:"header"},n.a.createElement("h1",null,"petalist")),n.a.createElement(b,{token:this.state.token,playlists:this.state.playlists}))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},55:function(t,e,a){t.exports=a(176)},60:function(t,e,a){}},[[55,1,2]]]);
//# sourceMappingURL=main.5b704fa5.chunk.js.map