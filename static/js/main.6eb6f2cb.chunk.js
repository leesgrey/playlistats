(this.webpackJsonpplaylistats=this.webpackJsonpplaylistats||[]).push([[0],{180:function(t,e,a){},181:function(t,e,a){"use strict";a.r(e);var s=a(0),n=a.n(s),o=a(56),r=a.n(o),i=(a(63),a(2)),l=a(3),c=a(1),u=a(5),p=a(4),m=a(13),h=a.n(m);function d(t,e,a){h.a.get(a||"https://api.spotify.com/v1/me/playlists?limit=".concat(T),{headers:{Authorization:"Bearer "+t}}).then((function(t){e(t.data.items,t.data.previous,t.data.next)})).catch((function(t){console.error(t)}))}var g=a(14);function b(t){if(!t.track_objects.items.length)return null;var e,a,s,n,o=0,r=0,i=0,l=-1,c=101,u=0,p=0,m=[],h=[];return t.track_features.audio_features.forEach((function(t){m.push(t.time_signature),p+=t.duration_ms,u+=t.valence,t.mode?(h.push(t.key.toString()+"+"),o++):(h.push(t.key.toString()+"-"),r++)})),t.track_objects.items.forEach((function(t){l<t.track.popularity&&(l=t.track.popularity,e=t.track.name,a=t.track.artists[0].name),c>t.track.popularity&&(c=t.track.popularity,s=t.track.name,n=t.track.artists[0].name),i+=t.track.popularity})),{major:o,minor:r,avgPopularity:Math.floor(i/t.track_features.audio_features.length),mostPopular:e,mostPopularArtist:a,leastPopular:s,leastPopularArtist:n,avgDurationMin:Math.round(p/t.track_features.audio_features.length/6e4),avgDurationSec:Math.round(p/t.track_features.audio_features.length/6e4%1*60),avgValence:(u/t.track_features.audio_features.length).toFixed(3),timeSigs:Object(g.a)(new Set(m)),sigCount:f(m),uniqueKeys:Object(g.a)(new Set(h.sort((function(t,e){return parseInt(t.slice(0,-1))-parseInt(e.slice(0,-1))})))),keyCount:v(h)}}function v(t){var e=Object(g.a)(new Set(t)),a={};return e.forEach((function(e){a[e]=t.filter((function(t){return t===e})).length})),a}function f(t){var e=Object(g.a)(new Set(t)),a={};return e.forEach((function(e){a[e]=t.filter((function(t){return t===e})).length})),a}var y=a(9),k=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={labels:["major","minor"],datasets:[{data:[s.props.major,s.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]},s.getState=s.getState.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:["major","minor"],datasets:[{data:[this.props.major,this.props.minor],backgroundColor:["#FF6384","#36A2EB"]}]}}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setState(this.getState())}},{key:"render",value:function(){return n.a.createElement(y.Doughnut,{data:this.state,key:this.props.minor,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),E=["#405BD5","#6F40D5","#BA40D5","#D540A5","#D5405B","#D56F40"],j={4:E[0],3:E[1],1:E[2],2:E[3],5:E[4],6:E[5]},C=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={labels:Object.keys(s.props.sigCount),datasets:[{data:Object.values(s.props.sigCount),backgroundColor:s.getColors(Object.keys(s.props.sigCount))}]},s.getState=s.getState.bind(Object(c.a)(s)),s.getColors=s.getColors.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:Object.keys(this.props.sigCount),datasets:[{data:Object.values(this.props.sigCount),backgroundColor:this.getColors(Object.keys(this.props.sigCount))}]}}},{key:"getColors",value:function(t){var e=[];return t.forEach((function(t){j[t]?e.push(j[t]):e.push("rgba("+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+")")})),e}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setState(this.getState())}},{key:"render",value:function(){return n.a.createElement(y.Doughnut,{data:this.state,key:this.props,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),S={"0+":"#f9ddab","0-":"#FCF0DB","2+":"#f9a706","2-":"#FAB938","1+":"#ff6704","1-":"#FF8637","3+":"#e7062e","3-":"#F9274C","5+":"#a2217e","5-":"#CC2A9F","4+":"#511296","4-":"#6A17C4","6+":"#020759","6-":"#030B8B","8+":"#114fc6","8-":"#1E65EC","7+":"#038c5e","7-":"#04BE80","9+":"#7fc24f","9-":"#9BCF75","11+":"#1b998b","11-":"#23C4B2","10+":"#9fa713","10-":"#CBD518"},O={"0+":"C major","0-":"C minor","1+":"C\u266f/D\u266d major","1-":"C\u266f/D\u266d minor","2+":"D major","2-":"D minor","3+":"D\u266f/E\u266d major","3-":"D\u266f/E\u266d minor","4+":"E major","4-":"E minor","5+":"F major","5-":"F minor","6+":"F\u266f/G\u266d major","6-":"F\u266f/G\u266d minor","7+":"G major","7-":"G minor","8+":"G\u266f/A\u266d major","8-":"G\u266f/A\u266d minor","9+":"A major","9-":"A minor","10+":"A\u266f/B\u266d major","10-":"A\u266f/B\u266d minor","11+":"B major","11-":"B minor"},N=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={labels:Object.keys(s.props.data).map((function(t){return O[t]})),datasets:[{data:Object.values(s.props.data),backgroundColor:s.getColors(Object.keys(s.props.data))}]},s.getState=s.getState.bind(Object(c.a)(s)),s.getColors=s.getColors.bind(Object(c.a)(s)),s.getModeColors=s.getModeColors.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"getState",value:function(){return{labels:Object.keys(this.props.data).map((function(t){return O[t]})),datasets:[{data:Object.values(this.props.data),backgroundColor:this.getColors(Object.keys(this.props.data))}]}}},{key:"getColors",value:function(t){var e=[];return t.forEach((function(t){e.push(S[t])})),e}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setState(this.getState())}},{key:"getModeColors",value:function(t){var e=[];return t.forEach((function(t){S[t]?e.push(S[t]):e.push("rgba("+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+", "+Math.floor(255*Math.random()).toString()+")")})),e}},{key:"render",value:function(){return n.a.createElement(y.Doughnut,{data:this.state,key:this.props,options:{legend:{position:"right",labels:{fontColor:"#ece6e1"}}}})}}]),a}(s.Component),M=a(57),_={acousticness:{suggestedMin:0,suggestedMax:1},danceability:{suggestedMin:0,suggestedMax:1},energy:{suggestedMin:0,suggestedMax:1},instrumentalness:{suggestedMin:0,suggestedMax:1},liveness:{suggestedMin:0,suggestedMax:1},loudness:{suggestedMin:-60,suggestedMax:0},speechiness:{suggestedMin:0,suggestedMax:1},tempo:{},valence:{suggestedMin:0,suggestedMax:1}},x=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={datasets:[{data:s.props.customX.map((function(t,e){return{x:t||0,y:s.props.customY[e]||0}}))}]},s}return Object(l.a)(a,[{key:"getState",value:function(){var t=this;return{label:"Custom Graph",datasets:[{data:this.props.customX.map((function(e,a){return{x:e||0,y:t.props.customY[a]||0}}))}]}}},{key:"componentDidUpdate",value:function(t){this.props!==t&&this.setState(this.getState())}},{key:"render",value:function(){var t=this;return n.a.createElement(y.Scatter,{data:this.state,options:{scales:{xAxes:[{ticks:Object(M.a)({fontColor:"#ece6e1"},_[this.props.xLabel]),scaleLabel:{display:!0,labelString:this.props.xLabel||"",fontColor:"#ece6e1"}}],yAxes:[{ticks:{fontColor:"#ece6e1"},scaleLabel:{display:!0,labelString:this.props.yLabel||"",fontColor:"#ece6e1"}}]},legend:{display:!1},elements:{point:{backgroundColor:"#d66767",borderColor:"#ece6e1"},line:{showLine:!0}},tooltips:{callbacks:{label:function(e){return t.props.labels[e.index]}}}}})}}]),a}(s.Component),w=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={track_objects:[],track_features:[],stats:null,startup:!0,customX:null,customY:null,collapseCustom:!0},s.storeTrackObjects=s.storeTrackObjects.bind(Object(c.a)(s)),s.storeTrackFeatures=s.storeTrackFeatures.bind(Object(c.a)(s)),s.storeStats=s.storeStats.bind(Object(c.a)(s)),s.getModeString=s.getModeString.bind(Object(c.a)(s)),s.getTimeSigString=s.getTimeSigString.bind(Object(c.a)(s)),s.getCustomTitle=s.getCustomTitle.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"componentDidUpdate",value:function(t){var e,a,s;this.props.bleh!==t.bleh&&(e=this.props.token,a=this.props.bleh,s=this.storeTrackObjects,a?h.a.get("https://api.spotify.com/v1/playlists/"+a+"/tracks",{headers:{Authorization:"Bearer "+e}}).then((function(t){s(t.data)})).catch((function(t){console.error(t)})):h.a.get("https://api.spotify.com/v1/me/player/recently-played",{headers:{Authorization:"Bearer "+e}}).then((function(t){s(t.data)})).catch((function(t){console.error(t)})))}},{key:"storeTrackObjects",value:function(t){this.setState({track_objects:t}),function(t,e,a){var s=function(t){var e="";return t.items.forEach((function(t){e+=t.track.id+","})),e}(e);h.a.get("https://api.spotify.com/v1/audio-features",{headers:{Authorization:"Bearer "+t},params:{ids:s}}).then((function(t){a(t.data)})).catch((function(t){console.error(t)}))}(this.props.token,this.state.track_objects,this.storeTrackFeatures)}},{key:"storeTrackFeatures",value:function(t){this.setState({track_features:t}),this.storeStats()}},{key:"storeStats",value:function(){this.setState({stats:b(this.state),startup:!1})}},{key:"getModeString",value:function(){var t="";return this.state.stats.major===this.state.stats.minor?t+="equally major and minor ":this.state.stats.major>this.state.stats.minor?t+="mostly major ":t+="mostly minor ",t}},{key:"getTimeSigString",value:function(){var t="[";return this.state.stats.timeSigs.forEach((function(e){t+=e.toString(),t+=", "})),t=t.slice(0,-2),t+="]"}},{key:"getKeyString",value:function(){var t="[";return Object.keys(this.state.stats.keyCount).forEach((function(e){t+=O[e].toString(),t+=", "})),t=t.slice(0,-2),t+="]"}},{key:"getCustomTitle",value:function(){var t=this.state,e=t.customX,a=t.customY;return e||a?"".concat(e?e[0].toUpperCase()+e.slice(1):"").concat(e&&a?" vs. ":"").concat(a?a[0].toUpperCase()+a.slice(1):""):"Custom Chart"}},{key:"render",value:function(){var t=this;return n.a.createElement("div",{id:"statsOutput"},this.state.stats?n.a.createElement("div",{id:"infoContainer"},n.a.createElement("h3",null,this.props.name),n.a.createElement("div",{id:"statsContainer"},n.a.createElement("div",{id:"graphContainer"},n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"chartLabel"},"This playlist is ",n.a.createElement("span",{className:"bold"},this.getModeString())," with ",n.a.createElement("span",{className:"bold"},this.state.stats.major," major song",1!==this.state.stats.major&&"s")," and ",n.a.createElement("span",{className:"bold"},this.state.track_objects.items.length-this.state.stats.major," minor song",this.state.track_objects.items.length-this.state.stats.major!==1&&"s"),"."),n.a.createElement(k,{id:this.props.bleh,major:this.state.stats.major,minor:this.state.stats.minor})),n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"chartLabel"},"This playlist has songs in the following ",n.a.createElement("span",{className:"under"},"time signatures"),": ",n.a.createElement("span",{className:"bold"},this.getTimeSigString()),"."),n.a.createElement(C,{id:this.props.bleh,sigCount:this.state.stats.sigCount})),n.a.createElement("div",{className:"graphBlock full"},n.a.createElement("p",{className:"chartLabel"},"This playlist is has songs in the following ",n.a.createElement("span",{className:"under"},"keys"),": ",n.a.createElement("span",{className:"bold"},this.getKeyString())),n.a.createElement(N,{sigCount:this.state.stats.sigCount,id:this.props.bleh,data:this.state.stats.keyCount})),n.a.createElement("div",{className:"graphBlock"},n.a.createElement("p",{className:"stat"},"The average song duration is ",n.a.createElement("span",{className:"bold"},this.state.stats.avgDurationMin," minutes and ",this.state.stats.avgDurationSec," seconds.")),n.a.createElement("p",{className:"stat"},"This playlist has an average ",n.a.createElement("span",{className:"under"},"popularity")," of ",n.a.createElement("span",{className:"bold"},this.state.stats.avgPopularity),", with the most popular song being ",n.a.createElement("span",{className:"bold"},'"',this.state.stats.mostPopular,'" by ',this.state.stats.mostPopularArtist)," and the least popular song being ",n.a.createElement("span",{className:"bold"},'"',this.state.stats.leastPopular,'" by ',this.state.stats.leastPopularArtist),"."),n.a.createElement("p",{hidden:!0,className:"explanation"},'"The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are."'),n.a.createElement("p",{className:"stat"},"This playlist has an average ",n.a.createElement("span",{className:"under"},"valence")," of ",n.a.createElement("span",{className:"bold"},this.state.stats.avgValence),"."),n.a.createElement("p",{hidden:!0,className:"explanation"},' Valence is "a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry)."')),n.a.createElement("div",{className:"graphBlock full"},n.a.createElement("p",{className:"chartLabel"},this.getCustomTitle()),n.a.createElement("div",{style:{margin:"0 auto",width:"20rem",marginBottom:"0.5rem"}},n.a.createElement("select",{value:this.state.customX,style:{width:"10rem"},onChange:function(e){return t.setState({customX:e.target.value})}},n.a.createElement("option",{value:""},"none"),n.a.createElement("option",{value:"acousticness"},"acousticness"),n.a.createElement("option",{value:"danceability"},"danceability"),n.a.createElement("option",{value:"energy"},"energy"),n.a.createElement("option",{value:"instrumentalness"},"instrumentalness"),n.a.createElement("option",{value:"liveness"},"liveness"),n.a.createElement("option",{value:"loudness"},"loudness"),n.a.createElement("option",{value:"speechiness"},"speechiness"),n.a.createElement("option",{value:"tempo"},"tempo"),n.a.createElement("option",{value:"valence"},"valence")),n.a.createElement("select",{value:this.state.customY,style:{width:"10rem"},onChange:function(e){return t.setState({customY:e.target.value})}},n.a.createElement("option",{value:""},"none"),n.a.createElement("option",{value:"acousticness"},"acousticness"),n.a.createElement("option",{value:"danceability"},"danceability"),n.a.createElement("option",{value:"energy"},"energy"),n.a.createElement("option",{value:"instrumentalness"},"instrumentalness"),n.a.createElement("option",{value:"liveness"},"liveness"),n.a.createElement("option",{value:"loudness"},"loudness"),n.a.createElement("option",{value:"speechiness"},"speechiness"),n.a.createElement("option",{value:"tempo"},"tempo"),n.a.createElement("option",{value:"valence"},"valence"))),n.a.createElement(x,{id:this.props.bleh,customX:this.state.track_features.audio_features.map((function(e){return e&&e[t.state.customX]})),customY:this.state.track_features.audio_features.map((function(e){return e&&e[t.state.customY]})),labels:this.state.track_objects.items.map((function(t){return"".concat(t.track.name," - ").concat(t.track.artists[0].name)})),xLabel:this.state.customX,yLabel:this.state.customY}))))):n.a.createElement("h3",{id:"select"},this.state.startup?"< select a playlist to begin":"".concat(this.props.name," is empty :(")))}}]),a}(s.Component),B=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(t){var s;return Object(i.a)(this,a),(s=e.call(this,t)).state={selected:null,token:s.props.token,no_data:!1},s.handleClick=s.handleClick.bind(Object(c.a)(s)),s}return Object(l.a)(a,[{key:"handleClick",value:function(t,e){this.setState({selected:t,name:e})}},{key:"render",value:function(){var t=this,e=this.props,a=e.previous,s=e.onPrevious,o=e.next,r=e.onNext,i=e.pageNum;return n.a.createElement("div",{id:"hasToken"},n.a.createElement("div",{className:"sidebar"},n.a.createElement("h2",null,"playlistats"),n.a.createElement("ul",null,n.a.createElement("li",{onClick:function(){return t.handleClick(0,"Recently Played")},className:"playlist_item",key:0},"Recently Played"),Array.from(this.props.playlists).map((function(e){return n.a.createElement("li",{onClick:function(){return t.handleClick(e.id,e.name)},className:"playlist_item",key:e.id},e.name)}))),n.a.createElement("div",{id:"footer"},n.a.createElement("p",{id:"pageCount"},"page ",i),n.a.createElement("div",{id:"pagination"},n.a.createElement("a",{className:"pagBtn".concat(a?" active":""),onClick:s},"<"," previous"),n.a.createElement("a",{className:"pagBtn".concat(o?" active":""),onClick:r},"next ",">")))),n.a.createElement(w,{token:this.state.token,name:this.state.name,bleh:this.state.selected}))}}]),a}(s.Component),D=window.location.hash.substring(1).split("&").reduce((function(t,e){if(e){var a=e.split("=");t[a[0]]=decodeURIComponent(a[1])}return t}),{});window.location.hash="";var A=D,T=(a(180),50),P=["ugc-image-upload","user-read-recently-played","playlist-read-collaborative","playlist-read-private"],F=function(t){Object(u.a)(a,t);var e=Object(p.a)(a);function a(){var t;return Object(i.a)(this,a),(t=e.call(this)).state={token:null,playlists:[],previous:null,next:null,no_data:!1,pageNum:0},t.setPlaylists=t.setPlaylists.bind(Object(c.a)(t)),t.onPrevious=t.onPrevious.bind(Object(c.a)(t)),t.onNext=t.onNext.bind(Object(c.a)(t)),t}return Object(l.a)(a,[{key:"setPlaylists",value:function(t,e,a){this.setState({playlists:t,previous:e,next:a})}},{key:"componentDidMount",value:function(){var t=A.access_token;t&&(this.setState({token:t}),d(t,this.setPlaylists,T*this.state.pageNum))}},{key:"onNext",value:function(){var t=this;this.setState((function(e){return d(A.access_token,t.setPlaylists,t.state.next),{pageNum:e.pageNum+1}}))}},{key:"onPrevious",value:function(){var t=this;this.setState((function(e){return d(A.access_token,t.setPlaylists,t.state.previous),{pageNum:e.pageNum-1}}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},this.state.token?n.a.createElement("div",{id:"loginDisplay"},n.a.createElement(B,{token:this.state.token,playlists:this.state.playlists,next:this.state.next,previous:this.state.previous,onNext:this.onNext,onPrevious:this.onPrevious,pageNum:this.state.pageNum+1})):n.a.createElement("div",{id:"landing"},n.a.createElement("h1",null,"playlistats"),n.a.createElement("p",null,"generate spotify playlist statistics (and some more features eventually maybe)"),n.a.createElement("a",{className:"btn btn--loginApp-link",href:"".concat("https://accounts.spotify.com/authorize","?client_id=").concat("308136625304484d92879d69e98ccd89","&redirect_uri=").concat("http://leesgrey.github.io/playlistats","&scope=").concat(P.join("%20"),"&response_type=token&show_dialog=true")},"log into spotify"))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},58:function(t,e,a){t.exports=a(181)},63:function(t,e,a){}},[[58,1,2]]]);
//# sourceMappingURL=main.6eb6f2cb.chunk.js.map