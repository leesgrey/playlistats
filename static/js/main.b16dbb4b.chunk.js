(this.webpackJsonpplaylistats=this.webpackJsonpplaylistats||[]).push([[0],{180:function(e,t,a){},181:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),o=a(56),r=a.n(o),i=(a(63),a(2)),l=a(3),c=a(1),u=a(5),p=a(4),h=a(11),m=a(12),d=a.n(m);function g(e,t,a){d.a.get(a||"https://api.spotify.com/v1/me/playlists?limit=".concat(T),{headers:{Authorization:"Bearer "+e}}).then((function(e){t(e.data.items,e.data.previous,e.data.next)})).catch((function(e){console.error(e)}))}function b(e){if(!e.track_objects.items.length)return null;var t,a,s,n,o=0,r=0,i=0,l=-1,c=101,u=0,p=0,m=[],d=[];return e.track_features.audio_features.forEach((function(e){m.push(e.time_signature),p+=e.duration_ms,u+=e.valence,e.mode?(d.push(e.key.toString()+"+"),o++):(d.push(e.key.toString()+"-"),r++)})),e.track_objects.items.forEach((function(e){l<e.track.popularity&&(l=e.track.popularity,t=e.track.name,a=e.track.artists[0].name),c>e.track.popularity&&(c=e.track.popularity,s=e.track.name,n=e.track.artists[0].name),i+=e.track.popularity})),{major:o,minor:r,avgPopularity:Math.floor(i/e.track_features.audio_features.length),mostPopular:t,mostPopularArtist:a,leastPopular:s,leastPopularArtist:n,avgDurationMin:Math.round(p/e.track_features.audio_features.length/6e4),avgDurationSec:Math.round(p/e.track_features.audio_features.length/6e4%1*60),avgValence:(u/e.track_features.audio_features.length).toFixed(3),timeSigs:Object(h.a)(new Set(m)),sigCount:f(m),uniqueKeys:Object(h.a)(new Set(d.sort((function(e,t){return parseInt(e.slice(0,-1))-parseInt(t.slice(0,-1))})))),keyCount:f(d),genres:f(e.genres)}}function f(e){var t=Object(h.a)(new Set(e)),a={};return t.forEach((function(t){a[t]=e.filter((function(e){return e===t})).length})),a}var v=a(7),y=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={labels:["major","minor"],datasets:[{data:[s.props.major,s.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]},s.getState=s.getState.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:["major","minor"],datasets:[{data:[this.props.major,this.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]}}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(this.getState())}},{key:"render",value:function(){return n.a.createElement(v.Doughnut,{data:this.state,key:this.props.minor,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),k=["#405BD5","#6F40D5","#BA40D5","#D540A5","#D5405B","#D56F40"],j={4:k[0],3:k[1],1:k[2],2:k[3],5:k[4],6:k[5]},E=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={labels:Object.keys(s.props.sigCount),datasets:[{data:Object.values(s.props.sigCount),backgroundColor:s.getColors(Object.keys(s.props.sigCount))}]},s.getState=s.getState.bind(Object(c.a)(s)),s.getColors=s.getColors.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:Object.keys(this.props.sigCount),datasets:[{data:Object.values(this.props.sigCount),backgroundColor:this.getColors(Object.keys(this.props.sigCount))}]}}},{key:"getColors",value:function(e){var t=[];return e.forEach((function(e){j[e]?t.push(j[e]):t.push("rgba("+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+")")})),t}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(this.getState())}},{key:"render",value:function(){return n.a.createElement(v.Doughnut,{data:this.state,key:this.props,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),C={"0+":"#f9ddab","0-":"#FCF0DB","2+":"#f9a706","2-":"#FAB938","1+":"#ff6704","1-":"#FF8637","3+":"#e7062e","3-":"#F9274C","5+":"#a2217e","5-":"#CC2A9F","4+":"#511296","4-":"#6A17C4","6+":"#020759","6-":"#030B8B","8+":"#114fc6","8-":"#1E65EC","7+":"#038c5e","7-":"#04BE80","9+":"#7fc24f","9-":"#9BCF75","11+":"#1b998b","11-":"#23C4B2","10+":"#9fa713","10-":"#CBD518"},O={"0+":"C major","0-":"C minor","1+":"C\u266f/D\u266d major","1-":"C\u266f/D\u266d minor","2+":"D major","2-":"D minor","3+":"D\u266f/E\u266d major","3-":"D\u266f/E\u266d minor","4+":"E major","4-":"E minor","5+":"F major","5-":"F minor","6+":"F\u266f/G\u266d major","6-":"F\u266f/G\u266d minor","7+":"G major","7-":"G minor","8+":"G\u266f/A\u266d major","8-":"G\u266f/A\u266d minor","9+":"A major","9-":"A minor","10+":"A\u266f/B\u266d major","10-":"A\u266f/B\u266d minor","11+":"B major","11-":"B minor"},S=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={labels:Object.keys(s.props.data).map((function(e){return O[e]})),datasets:[{data:Object.values(s.props.data),backgroundColor:s.getColors(Object.keys(s.props.data))}]},s.getState=s.getState.bind(Object(c.a)(s)),s.getColors=s.getColors.bind(Object(c.a)(s)),s.getModeColors=s.getModeColors.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:Object.keys(this.props.data).map((function(e){return O[e]})),datasets:[{data:Object.values(this.props.data),backgroundColor:this.getColors(Object.keys(this.props.data))}]}}},{key:"getColors",value:function(e){var t=[];return e.forEach((function(e){t.push(C[e])})),t}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(this.getState())}},{key:"getModeColors",value:function(e){var t=[];return e.forEach((function(e){C[e]?t.push(C[e]):t.push("rgba("+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+")")})),t}},{key:"render",value:function(){return n.a.createElement(v.Doughnut,{data:this.state,key:this.props,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),N=a(57),M={acousticness:{suggestedMin:0,suggestedMax:1},danceability:{suggestedMin:0,suggestedMax:1},energy:{suggestedMin:0,suggestedMax:1},instrumentalness:{suggestedMin:0,suggestedMax:1},liveness:{suggestedMin:0,suggestedMax:1},loudness:{suggestedMin:-60,suggestedMax:0},speechiness:{suggestedMin:0,suggestedMax:1},tempo:{},valence:{suggestedMin:0,suggestedMax:1}},_=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={datasets:[{data:s.props.customX.map((function(e,t){return{x:e||0,y:s.props.customY[t]||0}}))}]},s}return Object(l.a)(a,[{key:"getState",value:function(){var e=this;return{label:"Custom Graph",datasets:[{data:this.props.customX.map((function(t,a){return{x:t||0,y:e.props.customY[a]||0}}))}]}}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(this.getState())}},{key:"render",value:function(){var e=this;return n.a.createElement(v.Scatter,{data:this.state,options:{scales:{xAxes:[{ticks:Object(N.a)({fontColor:"#ece6e1"},M[this.props.xLabel]),scaleLabel:{display:!0,labelString:this.props.xLabel||"",fontColor:"#ece6e1"}}],yAxes:[{ticks:{fontColor:"#ece6e1"},scaleLabel:{display:!0,labelString:this.props.yLabel||"",fontColor:"#ece6e1"}}]},legend:{display:!1},elements:{point:{backgroundColor:"#d66767",borderColor:"#ece6e1"},line:{showLine:!0}},tooltips:{callbacks:{label:function(t){return e.props.labels[t.index]}}}}})}}]),a}(s.Component),x=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={labels:Object.keys(s.props.genres),datasets:[{data:Object.values(s.props.genres),backgroundColor:s.getColors(Object.keys(s.props.genres))}]},s.getState=s.getState.bind(Object(c.a)(s)),s.getColors=s.getColors.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:Object.keys(this.props.genres),datasets:[{data:Object.values(this.props.genres),backgroundColor:this.getColors(Object.keys(this.props.genres))}]}}},{key:"componentDidUpdate",value:function(e){this.props!==e&&this.setState(this.getState())}},{key:"getColors",value:function(e){var t=[];return e.forEach((function(){t.push("rgba("+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+")")})),t}},{key:"render",value:function(){return console.log(Object.keys(this.props.genres)),n.a.createElement(v.Doughnut,{data:this.state,key:this.props,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),w=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={track_objects:[],track_features:[],stats:null,genres:[],startup:!0,customX:null,customY:null,collapseCustom:!0},s.storeTrackObjects=s.storeTrackObjects.bind(Object(c.a)(s)),s.storeTrackFeatures=s.storeTrackFeatures.bind(Object(c.a)(s)),s.storeStats=s.storeStats.bind(Object(c.a)(s)),s.storeGenres=s.storeGenres.bind(Object(c.a)(s)),s.getModeString=s.getModeString.bind(Object(c.a)(s)),s.getGenreString=s.getGenreString.bind(Object(c.a)(s)),s.getTimeSigString=s.getTimeSigString.bind(Object(c.a)(s)),s.getCustomTitle=s.getCustomTitle.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(e){var t,a,s;this.props.bleh!==e.bleh&&(t=this.props.token,a=this.props.bleh,s=this.storeTrackObjects,a?d.a.get("https://api.spotify.com/v1/playlists/"+a+"/tracks",{headers:{Authorization:"Bearer "+t}}).then((function(e){s(e.data)})).catch((function(e){console.error(e)})):d.a.get("https://api.spotify.com/v1/me/player/recently-played",{headers:{Authorization:"Bearer "+t}}).then((function(e){s(e.data)})).catch((function(e){console.error(e)})))}},{key:"storeTrackObjects",value:function(e){this.setState({track_objects:e}),this.storeGenres(),function(e,t,a){var s=function(e){var t="";return e.items.forEach((function(e){t+=e.track.id+","})),t}(t);d.a.get("https://api.spotify.com/v1/audio-features",{headers:{Authorization:"Bearer "+e},params:{ids:s}}).then((function(e){a(e.data)})).catch((function(e){console.error(e)}))}(this.props.token,this.state.track_objects,this.storeTrackFeatures)}},{key:"storeTrackFeatures",value:function(e){this.setState({track_features:e}),this.storeStats()}},{key:"storeStats",value:function(){this.setState({stats:b(this.state),startup:!1})}},{key:"storeGenres",value:function(){var e=this,t=[];this.state.track_objects.items.map((function(e){return e.track.artists[0]})).forEach((function(a){return s=e.props.token,n=a.href,o=function(e){return e&&t.push(e)},void d.a.get(n,{headers:{Authorization:"Bearer "+s}}).then((function(e){o.apply(void 0,Object(h.a)(e.data.genres))})).catch((function(e){console.error(e)}));var s,n,o})),this.setState({genres:t})}},{key:"getModeString",value:function(){var e="";return this.state.stats.major===this.state.stats.minor?e+="equally major and minor ":this.state.stats.major>this.state.stats.minor?e+="mostly major ":e+="mostly minor ",e}},{key:"getTimeSigString",value:function(){var e="[";return this.state.stats.timeSigs.forEach((function(t){e+=t.toString(),e+=", "})),e=e.slice(0,-2),e+="]"}},{key:"getKeyString",value:function(){var e="[";return Object.keys(this.state.stats.keyCount).forEach((function(t){e+=O[t].toString(),e+=", "})),e=e.slice(0,-2),e+="]"}},{key:"getGenreString",value:function(){var e="";return Object.keys(this.state.stats.genres).forEach((function(t){e+=t,e+=", "})),e.slice(0,-2)}},{key:"getCustomTitle",value:function(){var e=this.state,t=e.customX,a=e.customY;return t||a?"".concat(t?t[0].toUpperCase()+t.slice(1):"").concat(t&&a?" vs. ":"").concat(a?a[0].toUpperCase()+a.slice(1):""):"Custom Chart"}},{key:"render",value:function(){var e=this;return n.a.createElement("div",{id:"statsOutput"},this.state.stats?n.a.createElement("div",{id:"infoContainer"},n.a.createElement("div",{id:"header"},n.a.createElement("h3",null,this.props.name)),n.a.createElement("div",{id:"statsContainer"},n.a.createElement("div",{id:"graphContainer"},n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"chartLabel"},"This playlist is ",n.a.createElement("span",{className:"bold"},this.getModeString())," with ",n.a.createElement("span",{className:"bold"},this.state.stats.major," major song",1!==this.state.stats.major&&"s")," and ",n.a.createElement("span",{className:"bold"},this.state.track_objects.items.length-this.state.stats.major," minor song",this.state.track_objects.items.length-this.state.stats.major!==1&&"s"),"."),n.a.createElement(y,{id:this.props.bleh,major:this.state.stats.major,minor:this.state.stats.minor})),n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"chartLabel"},"This playlist has songs in the following ",n.a.createElement("span",{className:"under"},"time signatures"),": ",n.a.createElement("span",{className:"bold"},this.getTimeSigString()),"."),n.a.createElement(E,{id:this.props.bleh,sigCount:this.state.stats.sigCount})),n.a.createElement("div",{className:"graphBlock full"},n.a.createElement("p",{className:"chartLabel"},"This playlist has songs in the following ",n.a.createElement("span",{className:"under"},"keys"),": ",n.a.createElement("span",{className:"bold"},this.getKeyString())),n.a.createElement(S,{sigCount:this.state.stats.sigCount,id:this.props.bleh,data:this.state.stats.keyCount})),n.a.createElement("div",{className:"graphBlock full"},this.state.genres.length>0?n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{className:"chartLabel"},"This playlist has artists associated with the following ",n.a.createElement("span",{className:"under"},"genres"),": ",n.a.createElement("span",{className:"bold"},this.getGenreString())),n.a.createElement(x,{genres:this.state.stats.genres})):n.a.createElement("p",{className:"chartLabel"},"This playlist has no artists with associated genres :(")),n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"stat"},"The average song duration is ",n.a.createElement("span",{className:"bold"},this.state.stats.avgDurationMin," minutes and ",this.state.stats.avgDurationSec," seconds.")),n.a.createElement("p",{className:"stat"},"This playlist has an average ",n.a.createElement("span",{className:"under"},"popularity")," of ",n.a.createElement("span",{className:"bold"},this.state.stats.avgPopularity),", with the most popular song being ",n.a.createElement("span",{className:"bold"},'"',this.state.stats.mostPopular,'" by ',this.state.stats.mostPopularArtist)," and the least popular song being ",n.a.createElement("span",{className:"bold"},'"',this.state.stats.leastPopular,'" by ',this.state.stats.leastPopularArtist),"."),n.a.createElement("p",{hidden:!0,className:"explanation"},'"The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."'),n.a.createElement("p",{className:"stat"},"This playlist has an average ",n.a.createElement("span",{className:"under"},"valence")," of ",n.a.createElement("span",{className:"bold"},this.state.stats.avgValence),"."),n.a.createElement("p",{hidden:!0,className:"explanation"},' Valence is "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."')),n.a.createElement("div",{className:"graphBlock full"},n.a.createElement("p",{className:"chartLabel"},this.getCustomTitle()),n.a.createElement("div",{style:{margin:"0 auto",width:"20rem",marginBottom:"0.5rem"}},n.a.createElement("select",{value:this.state.customX,style:{width:"10rem"},onChange:function(t){return e.setState({customX:t.target.value})}},n.a.createElement("option",{value:""},"none"),n.a.createElement("option",{value:"acousticness"},"acousticness"),n.a.createElement("option",{value:"danceability"},"danceability"),n.a.createElement("option",{value:"energy"},"energy"),n.a.createElement("option",{value:"instrumentalness"},"instrumentalness"),n.a.createElement("option",{value:"liveness"},"liveness"),n.a.createElement("option",{value:"loudness"},"loudness"),n.a.createElement("option",{value:"speechiness"},"speechiness"),n.a.createElement("option",{value:"tempo"},"tempo"),n.a.createElement("option",{value:"valence"},"valence")),n.a.createElement("select",{value:this.state.customY,style:{width:"10rem"},onChange:function(t){return e.setState({customY:t.target.value})}},n.a.createElement("option",{value:""},"none"),n.a.createElement("option",{value:"acousticness"},"acousticness"),n.a.createElement("option",{value:"danceability"},"danceability"),n.a.createElement("option",{value:"energy"},"energy"),n.a.createElement("option",{value:"instrumentalness"},"instrumentalness"),n.a.createElement("option",{value:"liveness"},"liveness"),n.a.createElement("option",{value:"loudness"},"loudness"),n.a.createElement("option",{value:"speechiness"},"speechiness"),n.a.createElement("option",{value:"tempo"},"tempo"),n.a.createElement("option",{value:"valence"},"valence"))),n.a.createElement(_,{id:this.props.bleh,customX:this.state.track_features.audio_features.map((function(t){return t&&t[e.state.customX]})),customY:this.state.track_features.audio_features.map((function(t){return t&&t[e.state.customY]})),labels:this.state.track_objects.items.map((function(e){return"".concat(e.track.name," - ").concat(e.track.artists[0].name)})),xLabel:this.state.customX,yLabel:this.state.customY}))))):n.a.createElement("h3",{id:"select"},this.state.startup?"< select a playlist to begin":"".concat(this.props.name," is empty :(")))}}]),a}(s.Component),B=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(i.a)(this,a),(s=t.call(this,e)).state={selected:null,token:s.props.token,no_data:!1},s.handleClick=s.handleClick.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"handleClick",value:function(e,t){this.setState({selected:e,name:t})}},{key:"render",value:function(){var e=this,t=this.props,a=t.previous,s=t.onPrevious,o=t.next,r=t.onNext,i=t.pageNum;return n.a.createElement("div",{id:"hasToken"},n.a.createElement("div",{className:"sidebar"},n.a.createElement("h2",null,"playlistats"),n.a.createElement("ul",null,n.a.createElement("li",{onClick:function(){return e.handleClick(0,"Recently Played")},key:0},"Recently Played"),Array.from(this.props.playlists).map((function(t){return n.a.createElement("li",{onClick:function(){return e.handleClick(t.id,t.name)},className:"playlist_item",key:t.id},t.name)}))),n.a.createElement("div",{id:"footer"},n.a.createElement("p",{id:"pageCount"},"page ",i),n.a.createElement("div",{id:"pagination"},n.a.createElement("a",{className:"pagBtn".concat(a?" active":""),onClick:s},"<"," previous"),n.a.createElement("a",{className:"pagBtn".concat(o?" active":""),onClick:r},"next ",">")))),n.a.createElement(w,{token:this.state.token,name:this.state.name,bleh:this.state.selected}))}}]),a}(s.Component),D=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{});window.location.hash="";var A=D,T=(a(180),50),F=["user-read-recently-played","playlist-read-collaborative","playlist-read-private"],P=function(e){Object(u.a)(a,e);var t=Object(p.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).state={token:null,playlists:[],previous:null,next:null,no_data:!1,pageNum:0},e.setPlaylists=e.setPlaylists.bind(Object(c.a)(e)),e.onPrevious=e.onPrevious.bind(Object(c.a)(e)),e.onNext=e.onNext.bind(Object(c.a)(e)),e}return Object(l.a)(a,[{key:"setPlaylists",value:function(e,t,a){this.setState({playlists:e,previous:t,next:a})}},{key:"componentDidMount",value:function(){var e=A.access_token;e&&(this.setState({token:e}),g(e,this.setPlaylists,T*this.state.pageNum))}},{key:"onNext",value:function(){var e=this;this.setState((function(t){return g(A.access_token,e.setPlaylists,e.state.next),{pageNum:t.pageNum+1}}))}},{key:"onPrevious",value:function(){var e=this;this.setState((function(t){return g(A.access_token,e.setPlaylists,e.state.previous),{pageNum:t.pageNum-1}}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},this.state.token?n.a.createElement("div",{id:"loginDisplay"},n.a.createElement(B,{token:this.state.token,playlists:this.state.playlists,next:this.state.next,previous:this.state.previous,onNext:this.onNext,onPrevious:this.onPrevious,pageNum:this.state.pageNum+1})):n.a.createElement("div",{id:"landing"},n.a.createElement("h1",null,"playlistats"),n.a.createElement("p",null,"generate spotify playlist statistics (and some more features eventually maybe)"),n.a.createElement("a",{className:"btn btn--loginApp-link",href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("308136625304484d92879d69e98ccd89","&redirect_uri=").concat("http://leesgrey.github.io/playlistats","&scope=").concat(F.join("%20"),"&response_type=token&show_dialog=true")},"log into spotify"))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},58:function(e,t,a){e.exports=a(181)},63:function(e,t,a){}},[[58,1,2]]]);
//# sourceMappingURL=main.b16dbb4b.chunk.js.map