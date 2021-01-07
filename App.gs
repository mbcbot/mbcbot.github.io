/**
* Max course: 9 (Upto C8)
* Required Global Varaibles are as follows :-
*
* var cors = []; -Course ID
* var subs = []; -Course Name
* var slab = []; -Attendence Subs
* var atc = []; -Attendence td loc
*
**/

function doGet(e){
//check parameter value, else redirect to homepage
//Useful if a user decides to bookmark the script.google* page instead of mbcbot.github.io

    if(e.parameter.pwd != "hi"){
        return HtmlService.createHtmlOutput("<script>window.top.location.href='https://mbcbot.github.io';</script>");
    }else{
        var user=Session.getActiveUser().getEmail().split("@")[0];
        var ads="";
        var cse=false;
        var payload = {
          rno: user,
          rq_type: "use_rno",
        };
        var options = {
          method: "POST",
          payload: payload,
          followRedirects: false,
        };
        var login = UrlFetchApp.fetch("http://mbccet.com/get_acess.php",options);
        var login_cookie = login.getHeaders()["Set-Cookie"];
        var headers2 = {
          Cookie: login_cookie,
        };
        var options2 = {
          method: "GET",
          headers: headers2,
          followRedirects: false,
        };
        var html = UrlFetchApp.fetch("http://mbccet.com/student_details.php",options2).getContentText();
        var $ = Cheerio.load(html);
        //Branch specific Conditions
        if($(".klub_data_h2").eq(5).text().trim() == "S3"){
            if($(".klub_data_h2").eq(6).text().trim() == "Computer Science and Engineering"){
                var cors = ["41255180187","160844147684","122943921473","118918094013","122935468620","118874816703","149814004736","192034952663"];
                var subs = ["DS","LSD","OOP","DE","DMS","SE","DS LAB","OOP LAB"];

                var slab = ["DS","LSD","OOP","DE","DMS","SE"];
                var atc = [7,8,9,10,11,12];
            }else{
                //Redirect if Branch is not added
                return HtmlService.createHtmlOutput("<script>window.top.location.href='https://mbcbot.github.io/not_added.html';</script>");
            }
        }else if($(".klub_data_h2").eq(5).text().trim() == "S5"){
            if($(".klub_data_h2").eq(6).text().trim() == "Computer Science and Engineering"){
                var cors = ["41255180176","118918094129","121756212937","118913018989","118817943141","118922873170","118821334592","189814440678"];
                var subs = ["TOC","SS","MPMC","DC","GTC","DP","SC","SSL"];

                var slab = ["TOC","SS","MPMC","DC","GTC","DP","SC"];
                var atc = [6,7,8,9,10,12,13];
                cse=true;
            }else if($(".klub_data_h2").eq(6).text().trim() == "Electronics and Communication Engineering"){

                var cors = ["138293080812","121722082819","122598225866","121726652384","148543937679","127318885175","121733864717","138574518286"];
                var subs = ["DSP","AET","MPMC","PEI","PEILAB","DP","BE","POM"];

                var slab = ["DSP","AET","MPMC","PEI","DP","BE","POM"];
                var atc = [6,7,8,9,12,13,15];
            }else if($(".klub_data_h2").eq(6).text().trim() == "Mechanical Engineering"){

                var cors = ["143198581503","118790758651","129890357101","138104410571","118916069778","119275507102","118789298021"];
                var subs = ["EDCA","POM","MOM","MTDM","CPNM","DP","NDT"];

                var slab = ["EDCA","POM","MOM","MTDM","CPNM","DP","NDT"];
                var atc = [6,7,8,9,10,11,12];
            }else if($(".klub_data_h2").eq(6).text().trim() == "Civil Engineering"){

                var cors = ["140960583532","118928315327","119096809707","140975136184","118967371440","232142231329","122454642407","119094477378","204034851871"];
                var subs = ["DCS","SA-2","GE-2","GEO","WRE","GE LAB","DP","ACT","MT LAB"];

                var slab = ["DCS","SA-2","GE-2","GEO","WRE","DP","ACT"];
                var atc = [6,7,8,9,10,12,13];
            }else{
                //Redirect if Branch is not added
                return HtmlService.createHtmlOutput("<script>window.top.location.href='https://mbcbot.github.io/not_added.html';</script>");
            }
        }else if($(".klub_data_h2").eq(5).text().trim() == "S7"){
            if($(".klub_data_h2").eq(6).text().trim() == "Computer Science and Engineering"){
                var cors = ["41249747812","122931832371","121574261047","118918147460","118901069939","121983939925","118889199990","187736411161"];
                var subs = ["CG","PP","CSA","DC","CNS","SPP","ML","CDLAB"];

                var slab = ["CG","PP","CSA","DC","CNS","SPP","ML"];
                var atc = [7,8,9,10,11,12,13];
            }else{
                //Redirect if Branch is not added
                return HtmlService.createHtmlOutput("<script>window.top.location.href='https://mbcbot.github.io/not_added.html';</script>");
            }
        }else{
            //Redirect if Sem is not Added
            return HtmlService.createHtmlOutput("<script>window.top.location.href='https://mbcbot.github.io/not_added.html';</script>");
        }
        // Attendence Scrapping code block
        for(var p=0;p<atc.length;p++){
            if($('tr').eq(atc[p]).find('td:nth-child(7)').text() < 80){
                ads+="<td style='background:#f1f1f1'>"+$('tr').eq(atc[p]).find('td:nth-child(7)').text()+"</td>";
            }else{
                ads+="<td>"+$('tr').eq(atc[p]).find('td:nth-child(7)').text()+"</td>";
            }
        }
        var vals = [0,0,0,0,0,0,0,0,0];
        //Decided to use text concatenation instead of Array.push() and hence the <variable>=""
        var C0="";
        var C1="";
        var C2="";
        var C3="";
        var C4="";
        var C5="";
        var C6="";
        var C7="";
        var C8="";
        var atv="";
        var ctv="";
        var resp1;
        var resp2;
        if(!cse){
            for(var i=0;i<cors.length;i++){
                if(Classroom.Courses.CourseWork.StudentSubmissions.list(cors[i], "-").studentSubmissions){
                    resp1 = Classroom.Courses.CourseWork.StudentSubmissions.list(cors[i], "-").studentSubmissions;
                    resp2 = Classroom.Courses.CourseWork.list(cors[i]).courseWork;
                    for (var j=0;j<resp1.length;j++){
                        if (resp1[j].state == "CREATED" || resp1[j].state == "RECLAIMED_BY_STUDENT" || resp1[j].state == "NEW"){
                            vals[i]++;
                            for (var k=0;k<resp2.length;k++){
                                if (resp1[j].courseWorkId == resp2[k].id){
                                    if (resp1[j].courseWorkType == "ASSIGNMENT"){
                                        //Submission Type: Assignment format
                                        switch(i){
                                            case 0: C0+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 1: C1+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 2: C2+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 3: C3+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 4: C4+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 5: C5+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 6: C6+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 7: C7+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                            case 8: C8+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>"+resp2[k].title+"</a></td></tr>";break;
                                        }
                                    }else{
                                        //Multiple choice or short answer type or Quiz formats
                                        switch(i){
                                            case 0: C0+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 1: C1+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 2: C2+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 3: C3+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 4: C4+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 5: C5+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 6: C6+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 7: C7+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 8: C8+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                        }
                                    }
                                }
                            }
                        }
                    }
               }
            }
        }else{
        //Get Submitted students list, S5 CSE Specific code block
            for(var i=0;i<cors.length;i++){
                if(Classroom.Courses.CourseWork.StudentSubmissions.list(cors[i], "-").studentSubmissions){
                    resp1 = Classroom.Courses.CourseWork.StudentSubmissions.list(cors[i], "-").studentSubmissions;
                    resp2 = Classroom.Courses.CourseWork.list(cors[i]).courseWork;
                    for (var j=0;j<resp1.length;j++){
                        if(resp1[j].state == "CREATED" || resp1[j].state == "RECLAIMED_BY_STUDENT" || resp1[j].state == "NEW"){
                            vals[i]++;
                            for(var k=0;k<resp2.length;k++){
                                if(resp1[j].courseWorkId == resp2[k].id){
                                    if (resp1[j].courseWorkType == "ASSIGNMENT"){
                                        if(resp2[k].assignment){
                                            switch(i){
                                                case 0: C0+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 1: C1+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 2: C2+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 3: C3+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 4: C4+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 5: C5+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 6: C6+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 7: C7+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                                case 8: C8+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv="+resp2[k].assignment.studentWorkFolder.id+"&cls="+resp1[j].alternateLink+"'>"+resp2[k].title+"</a></td></tr>";break;
                                            }
                                        }else{
                                            //No one has submitted. yet
                                            switch(i){
                                                case 0: C0+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 1: C1+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 2: C2+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 3: C3+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 4: C4+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 5: C5+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 6: C6+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 7: C7+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                                case 8: C8+="<tr><td><a title='"+resp2[k].title+"' target='_blank' href='https://script.google.com/a/macros/mbcpeermade.com/s/AKfycbwiGFkq8OatIzkruKzAdzNmBS3yWjujS-WUBPqs33K91WyNS50/exec?sub="+subs[i]+"&iv=404&cls="+resp1[j].alternateLink+"'><span>New</span>"+resp2[k].title+"</a></td></tr>";break;
                                            }
                                        }
                                    }else{
                                        //Multiple choice or short answer type or Quiz formats
                                        switch(i){
                                            case 0: C0+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 1: C1+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 2: C2+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 3: C3+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 4: C4+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 5: C5+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 6: C6+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 7: C7+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                            case 8: C8+="<tr><td><a target='_blank' href='"+resp1[j].alternateLink+"?authuser=1'>Question</a></td></tr>";break;
                                        }
                                    }
                                }
                            }
                        }      
                    }
                }
            }
        }
        //Check Work completion status
        if(C0 == ""){C0="<b>Completed</b>";}
        if(C1 == ""){C1="<b>Completed</b>";}
        if(C2 == ""){C2="<b>Completed</b>";}
        if(C3 == ""){C3="<b>Completed</b>";}
        if(C4 == ""){C4="<b>Completed</b>";}
        if(C5 == ""){C5="<b>Completed</b>";}
        if(C6 == ""){C6="<b>Completed</b>";}
        if(C7 == ""){C7="<b>Completed</b>";}
        if(C8 == ""){C8="<b>Completed</b>";}
        //UI Rendering
        for (var q=0;q<slab.length;q++){
          atv+="<td>"+slab[q]+"</td>";
        }
        for (var s=0;s<subs.length;s++) {
          ctv+="<tr><td class='mt'>"+subs[s]+"</td><td>[ "+vals[s]+" ]</td><td><table><tbody>"+eval('C'+s)+"</tbody></table></td></tr>";
        }
      var output = HtmlService.createHtmlOutput("<style>html,body{color:#666 !important;margin:0}tr{border-top:2px solid #e4e4e4 !important;line-height:75px;border-left:1px solid #e4e4e4} tr:first-child{border-top:none !important} a{color:#858585;text-overflow:ellipsis;white-space:nowrap;margin:0 auto;width:250px;display:block;overflow:hidden;}table{text-align:center;width:100%;border-collapse:collapse;margin:0 auto}.mt{font-size:22px}b{font-weight:normal;color:#4caf50}span{background:#6c7ae0;font-size:12px;border-radius:20px;padding:9px 12px 9px 12px;color:#fff;margin-right:10px;}</style><table style='table-layout:fixed;' border = '0'><tr style='background:#6c7ae0;color:#fff;box-shadow:0px 5px 6px #e4e4e4'>"+atv+"</tr><tr>"+ads+"</tr></table><table style='border-top:2px solid #e4e4e4;border-bottom:2px solid #e4e4e4' border = '0'><tr><td>Course</td><td>Assignments</td><td>Quick links</td></tr>"+ctv+"</table>");
      output.setTitle("Mbc bot : "+user);
        return output;
    }
}
