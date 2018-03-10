// ==UserScript==
// @name         ESL-TESL-Deck-Submission
// @namespace    http://31.214.149.170/decks.php
// @version      0.1
// @include    	https://play.eslgaming.com/*
// @description  :D
// @author       XD0M3
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    class InformationSupport {

        static getSupportId(){
            var support = $('.TitleM').text();
            var id = support.split("Support Ticket #")[1];
            return id;
        }
        //[2].children["0"].children[1]
        static getAnswers(){
            var answers = $(".esl-content").find("table");
            var ik = answers[2].children["0"].childElementCount;
            var an = [];
            for(var ion = 1; ion < ik; ion++){

                //[2].children["0"].children[1].children["0"]
                var fromWho = answers[2].children["0"].children[ion].children["0"].innerText;
                var who = "";
                var ac = false;
                var time = "";
                var admin = false;
                //Who?
                if(fromWho.indexOf("AC")!== -1){
                    who = fromWho.split("AC#");
                    ac = true;
                } else {
                    who = fromWho.split("#");
                }
                who = who[0];
                who = who.trim();
                //time?
                time = fromWho.split("|");
                time = time[1];
                time = time.trim();
                //Nachricht
                var nachricht = answers[2].children["0"].children[ion].children["1"].innerHTML;
                //Screen
                var screens = answers[2].children["0"].children[ion].children["2"].innerHTML;
                screens = screens.split(' target="_blank">');
                screens = screens[0];
                screens = screens.split('<a href="');
                screens = screens[1];
                //Admin?
                var ad = answers[2].children["0"].children[ion].children["3"].innerHTML;
                if(ad.indexOf('sent.gif') !== -1){
                    admin = true;
                }
                //speichern
                var zwi = [];
                zwi["who"] = who;
                zwi["ac"] = ac;
                zwi["time"]=time;
                zwi["nachricht"] = nachricht;
                zwi["scre"]=screens;
                zwi["admin"]=admin;
                an[ion-1]=zwi;
            }
            return an;
        }

        static getStatus(){
            var creatorBracket = $('form[name="parentForm"]').find('table');
            var sta = creatorBracket["0"].children["0"].children[1].children[3].children[1].innerHTML;
            return sta;
        }

        static getLeague(){
            var leage = [];
            var creatorBracket = $('form[name="parentForm"]').find('table');
            if(creatorBracket["0"].children["0"].children[3].childNodes[1].innerText == "League"){
                var l = creatorBracket["0"].children["0"].children[3].children[1].innerHTML;
                ///leagueoflegends/eu-nordic-east/lol/open/eune-5on5-champions-club-109/  |  <img src="https://cdn-eslgaming.akamaized.net/play/eslgfx/nodelogo/play_small.gif" width="16" height="12" border="0">&nbsp;LoL EU Nordic &amp; East 5on5 Champions Club #109</a>
                var text = l.split('<a href="');
                text = text[1];
                text = text.split('" target="_parent"><img src="https://cdn-eslgaming.akamaized.net/play/eslgfx/nodelogo/play_small.gif" width="16" height="12" border="0">');
                leage[0] = text[0];
                leage[1] = text[1].replace('&nbsp;','').replace('</a>','').replace('&amp;','');
                return leage;
            } else {
                var oxs = [];
                oxs[1] = "None";
                return oxs;
            }
        }

        static getSquad(){
            var gh = [];
            var creatorBracket = $('form[name="parentForm"]').find('table');
            if(creatorBracket["0"].children["0"].children[3].childNodes[1].innerText == "League"){
                var squad = creatorBracket["0"].children["0"].children[4].children[1].innerHTML;
                squad = squad.split("squad=");
                squad = squad[1];
                squad = squad.split('" target="_parent">');
                gh[0] = squad[0];
                squad = squad[1];
                squad = squad.split("</a>");
                squad = squad[0];
                gh[1] = squad;
            } else {
                var squad = creatorBracket["0"].children["0"].childNodes[6].children[1].innerHTML;
                squad = squad.split("squad=");
                squad = squad[1];
                squad = squad.split('" target="_parent">');
                gh[0] = squad[0];
                squad = squad[1];
                squad = squad.split("</a>");
                squad = squad[0];
                gh[1] = squad;
            }
            return gh;
        }

        static getDates(){
            var creatorBracket = $('form[name="parentForm"]').find('table');
            var dateBrackets = creatorBracket[0].children[0].children[1];
            var when = dateBrackets.children[0].innerText;
            var change = dateBrackets.children[1].innerText;
            when = when.split("created");
            when = when[1];
            change = change.split("changed");
            change = change[1];
            var back = [];
            back[0]=when;
            back[1]=change;
            return back;
        }

        static getAdmin(){
            var creatorBracket = $('form[name="parentForm"]').find('table');
            var way = creatorBracket[0].children[0].children[1].children[2].innerText;
            way = way.split("Admin");
            way = way[1];
            way = way.split("(unlock)");
            way = way[0];
            way = way.trim();
            var lel = [];
            lel[0] = way;
            var ol = $("a[href*='yer']");
            for(var i = 0; i < ol.length;i++){
                var io = ol[i].innerText;
                if(io == way){
                    var e = ol[i].href;
                    e = e.split("/player/");
                    e = e[1];
                    e = e.split("/");
                    e = e[0];
                    lel[1] = e;
                }

            }
            return lel;
        }

        static getTtitle(){
          var creatorBracket = $('form[name="parentForm"]').find('table');
          return creatorBracket["0"].children["0"].childNodes["0"].children["0"].childNodes["0"].textContent;
        }

        static getTicketCreator(){
            var creatorBracket = $('form[name="parentForm"]').find('table');
            var strings = creatorBracket[0].children[0].children[2].innerText;
            strings = strings.split("Requester	");
            strings[1] = strings[1].split("	All");
            strings[0]=strings[1][0];
            strings[0] = strings[0].split(" (");
            strings[0] = strings[0][0];

            var s = $("a[href*='yer']");
            for(var i = 0; i < s.length;i++){
                var io = s[i].innerText;
                if(io == strings[0]){
                     var e = s[i].href;
                    e = e.split("/player/");
                    e = e[1];
                    e = e.split("/");
                    e = e[0];
                    strings[1] = e;
                }

            }
            return strings;
        }

    }

    class Page {

        static isTesl(){
            return window.location.href.indexOf("/go4tesl-global/") > -1;
        }

        static isTicket(){
            return window.location.href.indexOf("/support/") > -1;
        }
        static isConstant(){
            return window.location.href.indexOf("/admin_contestants/") > -1;
        }

    }

    if(Page.isTesl()){
      if(Page.isConstant()){
        var league = $('.title').text();
        league = league.split(" ");
        league = league[2];
        league = league.replace("#", "");
        $('#mainform').after('<button onclick="removeTheDumb(' + league + ')">Deck Submissions</button>');
        var s = document.createElement('script');
        s.innerHTML = 'function removeTheDumb(test){var c=$("#mainform").find("table");var c=c["0"].children["0"].children;var constants=[];for(var l=0;l<c.length;l++){var bc=c[l].bgColor;if(bc=="#E3E0DD"||bc=="#F5F4F3"){constants.push(c[l])}}con=constants;var xmlhttp=new XMLHttpRequest();xmlhttp.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var myObj=JSON.parse(this.responseText);console.log(myObj); console.log(con);for(var j=0;j<con.length-1;j++){con[j.toString()].cells[5].childNodes["0"].checked=true}for(var j=0;j<con.length-1;j++){var id=con[j.toString()].cells["2"].innerText;for(var z=0;z<myObj.length;z++){console.log("ID: "+myObj[z.toString()].user_id+" 2nd ID: "+id);if(myObj[z.toString()].user_id==id){con[j.toString()].cells[5].childNodes["0"].checked=false}}}}};xmlhttp.open("GET","https://xd0m3.eu/esl/decks.php?cup="+test,true);xmlhttp.send()}';
        document.body.appendChild(s);
        /*for(var j = 0; j < con.length-1; j++){
          con["0"].cells[5].childNodes["0"].checked = true;
        }
        for(var j = 0; j < con.length-1; j++){
          var id = con["0"].cells["2"].innerText;
          for(var z = 0; z < myObj.length;z++){
            if(myObj[z].user_id != id)
          }
        }*/
      }
    }
    if(Page.isTicket()){
      console.log(window.location.href.indexOf("/go4tesl-global/"));
      if(Page.isTesl()){
        var creator = InformationSupport.getTicketCreator();
        var creator_id = creator[1];
        console.log(creator);
        var x = creator[0];
        var SupportId = InformationSupport.getSupportId();
        var League = InformationSupport.getLeague();
        var league = League[1];
        league = league.split(" ");
        league = league[2];
        league = league.replace("#","");
        console.log(x + "|"+creator_id+"|"+SupportId+"|"+league);
        $('select[name="what"]').after("<a id='sub'>Deck submit</a>");
        var link = 'https://xd0m3.eu/esl/add.php?name=' + x + "&cid=" + creator_id + "&sid=" + SupportId + "&league=" + league;
        $('#sub').attr("href", link);
      }

    }



})();
