/* The following function toggles the appearance of the menu items. */
<!--
//*************************************************
//* Check Setting and apply appropriate stylesheet
//*************************************************
function applyStyleSheet(docObj)
{
docObj.write("<div id=ClientCheck style='position:absolute;x:0;y:0;height:1px;'><table><tr><td style='fontsize:8pt'>XXXXXXXXXXXXXXXXXXXXXXX</td><td>");
docObj.write("<td id=ClientCheck2 >yyyyyy</td></tr></table></div>");
X=docObj.getElementById("ClientCheck2").offsetLeft
if (X < 300)
{
	docObj.write("<link href='styles/global.css' REL='stylesheet' TYPE='text/css'>");
}else
{
	docObj.write("<link href='styles/globallarge.css' REL='stylesheet' TYPE='text/css'>");
}
docObj.getElementById("ClientCheck").style.display="none"
}

// ************************************************************************************************
// VarWin indicates which asp page to open; flag determines how to pass parameters on the new page
// ************************************************************************************************

function window_Open(VarWin,flag)
{

	str=document.location.pathname
	xPage=str.substring(str.lastIndexOf("/")+1,str.length);
	if  (VarWin==1)
	{
		testUrl="NewCarrierList.asp?xpage=" + xPage;
		windef="Height=380,width=280,Left=50,Top=50,dependent=yes,resizable=No";
	}
	else if (VarWin==2)
	{
		testUrl="NewAirportList.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=580,width=780,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==3)
	{
		testUrl="ForeignAirportCountry.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=580,width=780,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==4)
	{
		testUrl="CarrierList.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=480,width=580,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==5)
	{
		testUrl="ot_reporting.asp";
		windef="Height=580,width=840,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==6)   // added 09/29/08 ==> Passenger Carriers 
	{
		testUrl="CarrierList_Passengers.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=480,width=600,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==7)   // added 09/29/08 ==> All-Cargo Carriers
	{
		testUrl="CarrierList_AllCargo.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=380,width=600,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	else if (VarWin==8)   // added 11/29/08 ==> Foreign Carriers
	{
		testUrl="Freight_CarrierList_Foreign.asp?xpage=" + xPage + "&flag=" + flag;
		windef="Height=700,width=600,Left=0,Top=0,dependent=yes,resizable=Yes, scrollbars=yes";
	}
	objWindow = window.open("","Subwindow", windef);
	objWindow.location.href=testUrl;
	objWindow.focus();
}

//*****************************************************************************
function tryNew(dtype,sName)
{
	if ((dtype == 5)||(dtype == 3))
	{
		if (sName == "Airport")
		{
			document.getElementById("Carrier").value = "All";
		} else {
			document.getElementById("Airport").value = "All";
		}
	}
	
}
//*************************************************
function sendAlert(msg) 
{
msg="TranStats Alert: \n\n" + msg;
alert(msg);
}

//*************************************************
function toggleMenu(mItem,mName,v) {
	var mClass,i,wStatus;
	mClass=mItem.className;
	tName=mItem.tagName;
	if((tName=='A') || (tName=='TD'))
	{
		i=mClass.indexOf("Active");
		if (i==-1)
		{
			mClass=mClass + "Active";
			wStatus="Click here to go to the " + mName;
		}else{
			mClass=mClass.slice(0,-6);
			wStatus="";
		}
	mItem.className = mClass;
	window.status=wStatus;
	}
	if ((v=="show")||(v=="hide"))
	{ 
		x=mItem.offsetLeft;
		y=mItem.offsetTop;
		showHideSubmenu(x,y,v);
	}
}
function showHideSubmenu(x,y,v,evt) 
{ 
	    v=(v=='show')?'visible':(v='hide')?'hidden':v; 
	
		if(document.getElementById) 
		{
			var obj = document.getElementById("products");
			obj.style.top = y + 150;
			obj.style.left = x + 150;
			obj.style.visibility=v;
		}
}
//********************************************************************************
/* The following function connects the Quick Link list to their referenced sites */
function goThere(obj)
{
    var selIndex = obj.selectedIndex;
	var loc = obj.options[selIndex].value;
   // var loc=obj.options[list.selectedIndex].value;
  // var newwind = window.open(loc,"SubWindow", "left=0,top=0,toolbar,resizable, scrollbars");
   var newwind = window.open(loc,"SubWindow");
}

//***********************************************************************************
/* The following function displays contex-sensitive help topics */

function displayHelp(height,width,Link) {
	var w=width+"px";
	var h=height+"px";
	
	if (Link)
	{
		urlPage=Link;
		helpURI="./showHelp2.asp#_" + urlPage;
	}
	else
	{
		var helpURI, urlPath, urlPage,m,n;
		var objHelpWindow;
		urlPath = location.pathname.toUpperCase();
		m = urlPath.lastIndexOf('/');
		n = urlPath.indexOf('.ASP');
		if (urlPath.indexOf('.ASP')== -1 ){
			urlPage = "HOMEPAGE";
		} else {
			urlPage = urlPath.substring(m+1,n);
		}
		helpURI="./showHelp.asp#_" + urlPage;
	}
	if (urlPage=="MAPPINGCENTER") {
		helpURI="http://websas.bts.gov/website/help/maphelp/index.htm";
		objHelpWindow=window.open(helpURI,"Help");
	} else {
		windef="HEIGHT=" + h +",WIDTH=" + w + ",Left=0, Top=0, dependent=yes,resizable=yes"
		objHelpWindow = window.open("","Help",windef);
		objHelpWindow.location.href=helpURI;
		objHelpWindow.focus();  
	}
}


//********************************************************

function displaychart(width,height,txtscript,afile)
{
	var useObjectTag = false
	var img_width = width
	var img_height = height
	var pcscript = txtscript
	var filename = afile
	var varfile 
	
	if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.indexOf("Win") != -1 && parseInt(navigator.appVersion) >= 4)
	{
		useObjectTag = true
	}
	
	if (useObjectTag)
	{
		document.write('<object')
		document.write(' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"')
		document.write(' width="'+img_width+'"')
		document.write(' height="'+img_height+'"')
		document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,0,0">')
		document.write(' <param name="MOVIE" value=')
	}
	else
	{
		document.write('<embed')
		document.write(' width="'+img_width+'"')
		document.write(' height="'+img_height+'"')
		document.write(' type= "application/x-shockwave-flash"pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"')
		document.write(' src=')
	}

	document.write("http://"+location.host+"/scripts/popchart.dll/?@_WIDTH"+img_width+"@_HEIGHT"+img_height)
	varfile='@_FILEapfiles/' + filename
	document.write(varfile)
	//document.write('@_FILEapfiles/Homepage_img1.bin')
	
	document.write('@_PCSCRIPT'+urlEncode(pcscript)+'@_FLASH"')
	
	if (useObjectTag)
	{
		document.write('></object>')
	}
	else
	{
		document.write('></embed>')
	}
}

//***************************************************************************
/* The following function encodes a URL string for charts */

function urlEncode(str)
{
	var ms = "%25#23 20?3F<3C>3E{7B}7D[5B]5D|7C^5E~7E`60"
	var msi = 0
	var i,c,rs,ts
	while (msi < ms.length)
	{
		c = ms.charAt(msi)
		rs = ms.substring(++msi, msi +2)
		msi += 2
		i = 0
		while (true)
		{
			i = str.indexOf(c, i)
			if (i == -1) break
			ts = str.substring(0, i)
			str = ts+"%"+rs+str.substring(++i, str.length)
		}
	}
	return str
}

//************************************************************************
/* The following function opens a new window with full features */

function newWindow(win_link)
{
   var newwind = window.open(win_link,"SubWindow");
}

//************************************************************************
/* The following function pops up category code values */

function showHideDesc(objID,v,evt) 
{ 
	    v=(v=='show')?'visible':(v='hide')?'hidden':v; 
	
		if(document.getElementById) 
		{
			var obj = document.getElementById(objID);
			if (document.all)
			{
			obj.style.top = event.clientY+document.body.scrollTop;
			obj.style.left = event.clientX+document.body.scrollLeft+10;
			}else{
			obj.style.top =evt.pageY + 10 ;
			obj.style.left =evt.pageX + 10 ;
			}
			obj.style.visibility=v;
		}
}

//********************************************************************************

function getSelectedItem(selectBox) 
{	var selIndex = selectBox.selectedIndex;
	var selText = selectBox.options[selIndex].text;
	var selTitle = selectBox.options[selIndex].title;
	var selLength = selectBox.options.length;
	var selBoxName = selectBox.name;
	var workObj = new Object();
	if (selBoxName=="Vari")
	{	with (document.form1.Stat) 
		{	 
		 	if (selTitle.length > 4)
			{
			options.length=0;
			options[0] = new Option("N/A");
			} 
			else if (selText=="*Records")
			{
				options.length = 0;
				options[0] = new Option("Count");
			}			
			else if ((selTitle=="CONT" ) && ((options.length != 5) || (options[options.length-1].selected==true)))
			{
								
				options.length=0;
				options[0] = new Option("Sum");
				options[1] = new Option("Avg");
				options[2] = new Option("Max");
				options[3] = new Option("Min");
				options[4] = new Option("Count");
			
			}
			else if ((selTitle=="RESP") && ((options.length != 3) || (options[options.length-1].selected==true)))
			{
			options.length=0;
			options[0] = new Option("Sum");
			options[1] = new Option("Proportion");
			options[2] = new Option("Count");
			} 
			else if (selTitle=="X")
			{
			options.length = 0;
			options[0] = new Option("Count");
			}
			
		}
		if (document.form1.Cat)
		{
			with (document.form1.Cat) 
			{
				if (selTitle=="RESP")
				{	
					for (var i=(options.length-1);i>=0;i--)
					{
						if (selText.indexOf(options[i].text)>-1)
						{
							options[i]=null;
						}
					}
				}
	
			}
		}
	}
	else if (selBoxName=="Stat")
	{
		if (selIndex==selectBox.options.length-1)
		{
			with (document.form1.Vari)
			{
			options[options.length-1].selected=true;
			}
			selectBox.options.length = 1;
			selectBox.options[0] = new Option("Count");
		}
	}
	
}

//*****************************************************************************
function Try1(form)
{
	var VarIndex = form.Vari.selectedIndex;
	var CatIndex = form.Cat.selectedIndex;
	var x = form.Vari[VarIndex].title;
	var y = form.Cat[CatIndex].title;
	form.data_type.value=x;
	form.lookup_table.value=y;
	form.beenhere.value=1;
	form.submit();
}
//*****************************************************************************
function TryMap(form)
{
	var VarIndex = form.Vari.selectedIndex;
	var x = form.Vari[VarIndex].title;
	form.data_type.value=x;
	form.beenhere.value=1;
	form.submit();
}
-->
